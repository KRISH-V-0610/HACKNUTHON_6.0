import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import Camera from '../components/Camera';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { motion } from 'framer-motion';
import { FaUserInjured, FaHeartbeat, FaIdCard, FaVenusMars, FaCalendarAlt, FaUpload, FaDiagnoses } from 'react-icons/fa';
import { GiStethoscope } from 'react-icons/gi';

const PatientDetails = ({ sidebarOpen, setSidebarOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [patientObjIdString, setPatientObjIdString] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch patient data
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/patient/${id}`);
        setPatient(response.data.data);
        setPatientObjIdString(response.data.data._id);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load patient');
        console.error('Error fetching patient:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Upload image
  const uploadImage = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('skinImage', selectedFile);

      const response = await axiosInstance.post(
        `/patient/${id}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setPatient(prev => ({
        ...prev,
        skinImages: [...prev.skinImages, response.data.data.patient.skinImages.slice(-1)[0]]
      }));
      setSelectedFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  // Predict disease - UPDATED VERSION
  const predictDisease = async (patientObjIdString) => {
    try {
      setPredictionLoading(true);
      // console.log(patientObjIdString);
      const swaggerData = {
        obj_id: patientObjIdString
      }
      const response = await axiosInstance.post(`http://localhost:6700/predict`, swaggerData);

      // Update patient's prediction data with the new prediction result
      console.log('Prediction response:', response.data);
      setPredictionData(response.data);

      // Redirect to dashboard after slight delay to show success
      setTimeout(() => {
        console.log(patient);
        navigate('/dashboard', { state: {reportData:response.data ,patientData:patient} });
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || 'Prediction failed');
      console.error('Prediction error:', err);
    } finally {
      setPredictionLoading(false);
    }
  };

  // Loading state for initial data fetch
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-teal-700">Loading patient data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md">
          <h3 className="text-2xl font-medium text-gray-900 mb-4">Error</h3>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => navigate('/patients')}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Patients
          </button>
        </div>
      </div>
    );
  }

  // No patient data state
  if (!patient) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md">
          <h3 className="text-2xl font-medium text-gray-900 mb-4">No Patient Data</h3>
          <button
            onClick={() => navigate('/patients')}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Patients
          </button>
        </div>
      </div>
    );
  }

  // Prediction loading overlay
  if (predictionLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Analyzing Skin Image</h3>
          <p className="text-gray-600">Please wait while we process your image...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="bg-gradient-to-br from-teal-50 to-blue-50 min-h-screen p-6">
          <div className="max-w-6xl mx-auto">
            {/* Patient Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center text-white text-4xl font-bold">
                    {patient?.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-teal-600 rounded-full p-2 border-2 border-white">
                    <FaUserInjured className="text-white text-lg" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-teal-800">{patient?.name || 'Unknown Patient'}</h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                    <div className="flex items-center text-gray-600">
                      <FaCalendarAlt className="text-teal-600 mr-2" />
                      {patient?.dob ? new Date().getFullYear() - new Date(patient.dob).getFullYear() : 'N/A'} years
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaVenusMars className={`${patient?.gender === 'Male' ? 'text-blue-500' :
                          patient?.gender === 'Female' ? 'text-pink-500' : 'text-purple-500'
                        } mr-2`} />
                      {patient?.gender || 'Unknown'}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaHeartbeat className="text-red-500 mr-2" />
                      {patient?.bloodGroup || 'N/A'}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaIdCard className="text-blue-500 mr-2" />
                      {patient?.caseId || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image Upload Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-teal-800 mb-4 flex items-center">
                <GiStethoscope className="mr-2" /> Upload New Skin Image
              </h2>
             
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-400'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <FaUpload className="mx-auto text-4xl text-teal-600 mb-4" />
                <p className="text-gray-600 mb-2">
                  {selectedFile ? selectedFile.name : 'Drag & drop skin image here or click to browse'}
                </p>
                <input
                  type="file"
                  id="skinImageUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                <label
                  htmlFor="skinImageUpload"
                  className="inline-block px-6 py-2 bg-teal-600 text-white rounded-lg cursor-pointer hover:bg-teal-700 transition-colors"
                >
                  Select Image
                </label>
                 
              <Camera id={id} />
              </div>

              {selectedFile && (
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-gray-700 truncate max-w-xs">{selectedFile.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={uploadImage}
                      disabled={uploading}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                    >
                      {uploading ? 'Uploading...' : (
                        <>
                          <FaUpload /> Upload
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Skin Images Gallery */}
            {patient?.skinImages?.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-teal-800 mb-4">Skin Image Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {patient.skinImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="relative group rounded-lg overflow-hidden"
                    >
                      <img
                        src={image.url}
                        alt={`Skin image ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => predictDisease(patientObjIdString)}
                          disabled={predictionLoading}
                          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                        >
                          <FaDiagnoses /> Predict
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-gray-500">No skin images uploaded yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDetails;