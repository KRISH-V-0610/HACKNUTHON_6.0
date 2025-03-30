import { useState } from 'react';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { axiosInstance } from '../lib/axios';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: null,
    bloodGroup: '',
    gender: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      dob: date
    }));
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateUserPatients = async (patientId) => {
    try {
      await axiosInstance.patch('/user/updatePatients', {
        patientId: patientId
      }, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Error updating user patients:', error);
      // This is non-critical, so we won't show an error to the user
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill all required fields', {
        style: {
          background: '#E53E3E',
          color: '#FFF',
          fontSize: '14px'
        }
      });
      return;
    }
  
    setIsSubmitting(true);
    try {
      const formDataObj = new FormData();
      
      // Convert Date object to ISO string
      if (formData.dob instanceof Date) {
        formDataObj.append('dob', formData.dob.toISOString());
      } else {
        throw new Error('Invalid date format');
      }
      
      formDataObj.append('name', formData.name);
      formDataObj.append('bloodGroup', formData.bloodGroup);
      formDataObj.append('gender', formData.gender);
      
      if (profileImage) {
        formDataObj.append('profileImage', profileImage);
      }
  
      const response = await axiosInstance.post('/patient/create', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      // Update user's patient array with the new patient ID
      if (response.data.patient && response.data.patient._id) {
        await updateUserPatients(response.data.patient._id);
      }
  
      toast.success(response.data.message || 'Patient created successfully!', {
        style: {
          background: '#319795',
          color: '#FFF',
          fontSize: '14px'
        }
      });
  
      // Reset form
      setFormData({
        name: '',
        dob: null,
        bloodGroup: '',
        gender: ''
      });
      setProfileImage(null);
      setErrors({});
  
    } catch (error) {
      console.error('Error creating patient:', error);
      
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Failed to create patient';
        
      toast.error(errorMessage, {
        style: {
          background: '#E53E3E',
          color: '#FFF',
          fontSize: '14px'
        }
      });
  
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-teal-700 mb-4">Add New Patient</h3>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name Field */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Full Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth *</label>
          <DatePicker
            selected={formData.dob}
            onChange={handleDateChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            placeholderText="MM/DD/YYYY"
            maxDate={new Date()}
            dateFormat="MM/dd/yyyy"
          />
          {errors.dob && <p className="mt-1 text-xs text-red-600">{errors.dob}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Blood Group */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Blood Group *</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2MTc0ODQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im03IDE1IDUgNSA1LTUiLz48L3N2Zz4=')] bg-no-repeat bg-[center_right_0.5rem]"
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodGroup && <p className="mt-1 text-xs text-red-600">{errors.bloodGroup}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2MTc0ODQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im03IDE1IDUgNSA1LTUiLz48L3N2Zz4=')] bg-no-repeat bg-[center_right_0.5rem]"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
          </div>
        </div>

        {/* Profile Image Upload */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Profile Photo</label>
          <div className="flex items-center gap-2">
            <label className="flex-1">
              <div className={`px-3 py-2 text-xs border ${profileImage ? 'border-teal-200 bg-teal-50' : 'border-gray-300'} rounded-md cursor-pointer truncate`}>
                {profileImage ? profileImage.name : 'Choose file...'}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </label>
            {profileImage && (
              <button
                type="button"
                onClick={() => setProfileImage(null)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 text-sm font-medium text-white rounded-md ${isSubmitting ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700'}`}
          >
            {isSubmitting ? 'Creating...' : 'Create Patient'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;