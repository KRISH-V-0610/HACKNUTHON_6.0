import mongoose from 'mongoose';

const generateCaseId = (patientName) => {
  const timestamp = Date.now().toString().slice(-6);
  const nameInitials = patientName.split(' ').map(n => n[0]).join('').toUpperCase();
  return `CASE-${nameInitials}-${timestamp}`;
};

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const patientSchema = new mongoose.Schema({
  
  caseId: {
    type: String,
    unique: true,
    default: function() {
      return generateCaseId(this.name);
    }
  },
  name: {
    type: String,
    required: true
  },  
  dob: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function(dob) {
        return dob <= new Date();
      },
      message: 'Date of birth cannot be in the future'
    }
  },
  age: {
    type: Number,
    default: function() {
      return calculateAge(this.dob);
    }
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  skinImages: [{
    url: String,
    publicId: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],

  aiModelOutput: {
      image_url: String,
      jarvis: String,
      prediction: String,
      report: String,
      verify: String,
  },
 
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;