

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
//       <h3 className="text-lg font-semibold text-teal-700 mb-4">Add New Patient</h3>
      
//       <form onSubmit={handleSubmit} className="space-y-3">
//         {/* Name Field */}
//         <div>
//           <label className="block text-xs font-medium text-gray-600 mb-1">Full Name *</label>
//           <input
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
//             placeholder="John Doe"
//           />
//           {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
//         </div>

//         {/* Date of Birth */}
//         <div>
//           <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth *</label>
//           <DatePicker
//             selected={formData.dob}
//             onChange={handleDateChange}
//             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
//             placeholderText="MM/DD/YYYY"
//             maxDate={new Date()}
//             dateFormat="MM/dd/yyyy"
//           />
//           {errors.dob && <p className="mt-1 text-xs text-red-600">{errors.dob}</p>}
//         </div>

//         <div className="grid grid-cols-2 gap-3">
//           {/* Blood Group */}
//           <div>
//             <label className="block text-xs font-medium text-gray-600 mb-1">Blood Group *</label>
//             <select
//               name="bloodGroup"
//               value={formData.bloodGroup}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2MTc0ODQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im03IDE1IDUgNSA1LTUiLz48L3N2Zz4=')] bg-no-repeat bg-[center_right_0.5rem]"
//             >
//               <option value="">Select</option>
//               <option value="A+">A+</option>
//               <option value="A-">A-</option>
//               <option value="B+">B+</option>
//               <option value="B-">B-</option>
//               <option value="AB+">AB+</option>
//               <option value="AB-">AB-</option>
//               <option value="O+">O+</option>
//               <option value="O-">O-</option>
//             </select>
//             {errors.bloodGroup && <p className="mt-1 text-xs text-red-600">{errors.bloodGroup}</p>}
//           </div>

//           {/* Gender */}
//           <div>
//             <label className="block text-xs font-medium text-gray-600 mb-1">Gender *</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2MTc0ODQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im03IDE1IDUgNSA1LTUiLz48L3N2Zz4=')] bg-no-repeat bg-[center_right_0.5rem]"
//             >
//               <option value="">Select</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
//           </div>
//         </div>

//         {/* Profile Image Upload */}
//         <div>
//           <label className="block text-xs font-medium text-gray-600 mb-1">Profile Photo</label>
//           <div className="flex items-center gap-2">
//             <label className="flex-1">
//               <div className={`px-3 py-2 text-xs border ${profileImage ? 'border-teal-200 bg-teal-50' : 'border-gray-300'} rounded-md cursor-pointer truncate`}>
//                 {profileImage ? profileImage.name : 'Choose file...'}
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleProfileImageChange}
//                 className="hidden"
//               />
//             </label>
//             {profileImage && (
//               <button
//                 type="button"
//                 onClick={() => setProfileImage(null)}
//                 className="text-xs text-red-500 hover:text-red-700"
//               >
//                 Remove
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="pt-2">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full py-2 text-sm font-medium text-white rounded-md ${isSubmitting ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700'}`}
//           >
//             {isSubmitting ? 'Creating...' : 'Create Patient'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PatientForm;



import { useState } from 'react';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {axiosInstance} from '../lib/axios';

const PatientForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    dob: null,
    bloodGroup: '',
    gender: '',
    age: 0
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
      dob: date,
      age: date.getFullYear() - new Date().getFullYear()
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
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100 transition-all duration-300 hover:shadow-xl">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-teal-700 mb-1">Add New Patient</h3>
        <p className="text-sm text-gray-500">Fill in the details to register a new patient</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
              errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-teal-300'
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <div className="mt-1 flex items-center gap-1 text-xs text-red-600 animate-fadeIn">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Date of Birth */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
          <DatePicker
            selected={formData.dob}
            onChange={handleDateChange}
            className={`w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
              errors.dob ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-teal-300'
            }`}
            placeholderText="Select date"
            maxDate={new Date()}
            dateFormat="MMMM d, yyyy"
            showYearDropdown
            dropdownMode="select"
            popperClassName="datepicker-popper"
            wrapperClassName="w-full"
          />
          {errors.dob && (
            <div className="mt-1 flex items-center gap-1 text-xs text-red-600 animate-fadeIn">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{errors.dob}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Blood Group */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Blood Group <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-sm border rounded-lg appearance-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                  errors.bloodGroup ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-teal-300'
                } bg-white bg-no-repeat bg-[center_right_1rem]`}
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
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {errors.bloodGroup && (
              <div className="mt-1 flex items-center gap-1 text-xs text-red-600 animate-fadeIn">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{errors.bloodGroup}</span>
              </div>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Gender <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-sm border rounded-lg appearance-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                  errors.gender ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-teal-300'
                } bg-white bg-no-repeat bg-[center_right_1rem]`}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {errors.gender && (
              <div className="mt-1 flex items-center gap-1 text-xs text-red-600 animate-fadeIn">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{errors.gender}</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Image Upload */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
          <div className="flex items-center gap-3">
            <label className="flex-1 cursor-pointer">
              <div className={`px-4 py-2 text-sm border rounded-lg transition-all duration-200 flex items-center justify-between ${
                profileImage ? 'border-teal-300 bg-teal-50 text-teal-800' : 'border-gray-300 hover:border-teal-300'
              }`}>
                <span className="truncate">
                  {profileImage ? profileImage.name : 'Choose file...'}
                </span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
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
                className="px-3 py-2 text-sm text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 text-sm font-medium text-white rounded-lg transition-all duration-300 ${
              isSubmitting 
                ? 'bg-teal-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Patient'
            )}
          </button>
        </div>
      </form>

      {/* Global styles */}
      <style jsx global>{`
        .datepicker-popper {
          z-index: 50 !important;
        }
        .react-datepicker {
          font-family: inherit;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        .react-datepicker__header {
          background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
          border-bottom: none;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          padding: 0.75rem;
        }
        .react-datepicker__current-month,
        .react-datepicker-time__header,
        .react-datepicker-year-header,
        .react-datepicker__day-name {
          color: white;
          font-weight: 500;
        }
        .react-datepicker__day {
          color: #1f2937;
          font-weight: 400;
          transition: all 0.2s ease;
        }
        .react-datepicker__day:hover {
          background-color: #ccfbf1;
          color: #0d9488;
          font-weight: 600;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--in-selecting-range,
        .react-datepicker__day--in-range {
          background-color: #0d9488;
          color: white;
          font-weight: 600;
        }
        .react-datepicker__navigation--previous,
        .react-datepicker__navigation--next {
          top: 0.75rem;
          border-color: white;
        }
        .react-datepicker__navigation--previous:hover,
        .react-datepicker__navigation--next:hover {
          border-color: white;
          opacity: 0.8;
        }
        select option {
          padding: 0.5rem;
          transition: all 0.2s ease;
        }
        select option:hover {
          background-color: #ccfbf1 !important;
          color: #0d9488;
          font-weight: 500;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PatientForm;
