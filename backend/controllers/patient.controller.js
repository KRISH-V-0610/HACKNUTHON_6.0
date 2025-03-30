import Patient from '../models/patient.model.js';
import Predict from '../models/predict.model.js';
import {cloudinary,upload} from '../config/cloudinary.config.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';






export const addPatient = async (req, res) => {   
  try {
    const { name, dob, bloodGroup, gender } = req.body;
    
    // Validation
    if (!name || !dob || !bloodGroup || !gender) {
      if (req.file) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Create patient data
    const patientData = {
      name,
      dob: new Date(dob),
      bloodGroup,
      gender,
      createdBy: req.user._id, // Add who created this patient
      profileImage: req.file ? req.file.path : ''
    };

    // Create new patient
    const newPatient = await Patient.create(patientData);

    // Update the user's patients array
    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { patients: newPatient._id } }, // $addToSet prevents duplicates
      { new: true }
    );

    // Format response
    res.status(201).json({
      message: 'Patient created and added to your list successfully',
      patient: {
        id: newPatient._id,
        name: newPatient.name,
        caseId: newPatient.caseId,
        profileUrl: newPatient.profileImage
      }
    });

  } catch (error) {
    console.error('Error creating patient:', error);
    
    // Clean up uploaded file if error occurred
    if (req.file) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (err) {
        console.error('Error deleting uploaded file:', err);
      }
    }

    // Error handling
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    
    res.status(500).json({ 
      message: error.message || 'Server error while creating patient' 
    });
  }
};
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Delete image from Cloudinary if exists
    if (patient.profileUrl) {
      const publicId = patient.profileUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`medical-app/patients/${publicId}`);
    }

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ message: 'Server error while deleting patient' });
  }
};
export const getAllPatients = async (req, res) => {
  try {
    // Get the current user with their patients array populated
    const user = await User.findById(req.user._id).select('patients');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get pagination parameters from query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get sorting parameters
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

    // Build query to find patients that are in user's patients array
    let query = Patient.find({
      _id: { $in: user.patients }
    });

    // Apply search filter if provided
    if (req.query.search) {
      query = query.where({
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { caseId: { $regex: req.query.search, $options: 'i' } }
        ]
      });
    }

    // Execute query with pagination and sorting
    const patients = await query
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .select('-__v') // Exclude version key
      .lean(); // Convert to plain JS objects

    // Get total count for pagination
    const total = await Patient.countDocuments({
      _id: { $in: user.patients },
      ...(req.query.search && {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { caseId: { $regex: req.query.search, $options: 'i' } }
        ]
      })
    });

    res.json({
      success: true,
      data: patients,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });

  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching patients',
      error: error.message
    });
  }
};
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select("-__v");
    
    if (!patient) {
      return res.status(404).json({ 
        success: false, 
        message: "Patient not found" 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: patient 
    });
    
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching patient details",
      error: error.message,
    });
  }
};

export const updatePatient = async (req, res) => {

  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate the patient ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid patient ID format' 
      });
    }

    // Find and update the patient
    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true,
        runValidators: true
      }
    ).lean();

    if (!updatedPatient) {
      return res.status(404).json({ 
        success: false, 
        message: 'Patient not found' 
      });
    }

    // Prepare response data
    const responseData = {
      success: true,
      data: {
        ...updatedPatient,
        // age: calculateAge(updatedPatient.dob),
        // caseId: updatedPatient.caseId || generateCaseId(updatedPatient.name)
      }
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error updating patient:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors 
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }


};



export const postImageToPatient = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 1. Validate patient exists
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ 
        success: false,
        message: 'Patient not found' 
      });
    }
    
    // 2. Handle file upload using your existing Cloudinary config
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    console.log("Received File:", req.file);
console.log("Request Body:", req.body);
    
    // File is already uploaded via multer middleware at this point
    const imageUrl = req.file.path; // Cloudinary URL from multer-storage-cloudinary
    const publicId = req.file.filename; // Cloudinary public_id
    
    // 3. Create new image object
    const newImage = {
      url: imageUrl,
      publicId: publicId,
      uploadedAt: new Date()
    };
    
    // 4. Update Patient's skinImages array
    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { $push: { skinImages: newImage } },
      { new: true, runValidators: true }
    );
    
    // 5. Update Predict record
    const updatedPredict = await Predict.findOneAndUpdate(
      { patient: id },
      { 
        latestSkinImage: imageUrl,
        $setOnInsert: { patient: id } // Only set if creating new
      },
      { 
        upsert: true,
        new: true,
        runValidators: true 
      }
    );
    
    // 6. Return success response
    res.status(200).json({
      success: true,
      message: 'Skin image uploaded successfully',
      data: {
        imageUrl,
        patient: {
          _id: updatedPatient._id,
          skinImages: updatedPatient.skinImages
        },
        predict: {
          _id: updatedPredict._id,
          latestSkinImage: updatedPredict.latestSkinImage
        }
      }
    });
    
  } catch (error) {
    console.error('Error in postImageToPatient:', error);
    
    // Handle specific error cases
    let statusCode = 500;
    let errorMessage = 'Failed to upload skin image';
    
    if (error.name === 'CastError') {
      statusCode = 400;
      errorMessage = 'Invalid patient ID format';
    } else if (error.message.includes('file size')) {
      statusCode = 413;
      errorMessage = 'File size exceeds 10MB limit';
    } else if (error.message.includes('image files')) {
      statusCode = 415;
      errorMessage = 'Only JPG, JPEG, or PNG images are allowed';
    }

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

