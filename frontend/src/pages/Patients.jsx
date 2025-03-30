import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import { axiosInstance } from '../lib/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaTh, FaList, FaUserInjured, FaHeartbeat, FaIdCard, FaVenusMars, FaCalendarAlt, FaSearch, FaUserSlash, FaPlus } from 'react-icons/fa';
import { GiStethoscope } from 'react-icons/gi';
import { MdOutlineSick } from 'react-icons/md';

const Patients = ({ sidebarOpen, setSidebarOpen }) => {
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();
  
  // State management
  const [viewMode, setViewMode] = useState('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });

  // Fetch patients data
  const fetchPatients = async (page = 1, search = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get('/patient/getAllPatients', {
        params: { page, limit: pagination.limit, search },
        withCredentials: true
      });

      setPatients(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch patients');
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPatients(); }, []);

  // Filter patients based on search
  const filteredPatients = patients.filter(patient =>
    patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.caseId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Avatar component with fallback to initials
  const PatientAvatar = ({ name, image, size = 16 }) => {
    if (image && typeof image === 'string' && image.trim() !== '') {
      return (
        <img 
          src={image} 
          alt={name} 
          className={`w-${size} h-${size} rounded-full border-4 border-teal-100 object-cover shadow-sm`}
        />
      );
    }
    
    return (
      <div className={`w-${size} h-${size} rounded-full bg-teal-500 flex items-center justify-center text-white ${size === 16 ? 'text-2xl' : 'text-xl'} font-bold`}>
        {name?.charAt(0).toUpperCase() || 'P'}
      </div>
    );
  };

  // Empty state component
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-md p-8 text-center max-w-2xl mx-auto"
    >
      <div className="relative w-32 h-32 mx-auto mb-6">
        <div className="absolute inset-0 bg-teal-100 rounded-full"></div>
        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
          <MdOutlineSick className="text-5xl text-teal-600" />
        </div>
      </div>
      <h3 className="text-2xl font-medium text-gray-900 mb-2">
        {searchQuery ? 'No matching patients found' : 'No patients in the system'}
      </h3>
      <p className="text-gray-600 mb-6">
        {searchQuery ? 'Try adjusting your search criteria' : 'Add new patients to get started'}
      </p>
      <div className="flex justify-center gap-4">
        <motion.button 
          className="px-6 py-2 bg-teal-600 text-white rounded-lg flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/addPatient')}
        >
          <FaPlus /> Add New Patient
        </motion.button>
        {searchQuery && (
          <motion.button 
            onClick={() => setSearchQuery('')}
            className="px-6 py-2 bg-white border border-teal-600 text-teal-600 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear Search
          </motion.button>
        )}
      </div>
    </motion.div>
  );

  // Patient card component
  const PatientCard = ({ patient }) => (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-teal-100"
      style={{
        width: '280px',
        minHeight: '380px',
        flexShrink: 0
      }}
      whileHover={{ y: -5 }}
    >
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 h-2 w-full"></div>
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <PatientAvatar name={patient.name} image={patient.profileImage} />
            <div className="absolute -bottom-1 -right-1 bg-teal-600 rounded-full p-1 border-2 border-white">
              <FaUserInjured className="text-white text-xs" />
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 truncate">{patient.name}</h3>
            <p className="text-gray-600 flex items-center gap-1 text-sm">
              <FaCalendarAlt className="text-teal-600" />
              {new Date().getFullYear() - new Date(patient.dob).getFullYear()} years
              <span className="mx-1">•</span>
              <FaVenusMars className={patient.gender === 'Male' ? 'text-blue-500' : 'text-pink-500'} />
              {patient.gender}
            </p>
          </div>
        </div>
        
        <div className="flex-grow space-y-3">
          <div className="flex items-center justify-between bg-teal-50 rounded-lg px-3 py-2">
            <span className="text-gray-600 flex items-center gap-2 text-sm">
              <FaHeartbeat className="text-red-500" />
              Blood Group:
            </span>
            <span className="font-medium bg-white px-2 py-1 rounded text-teal-700 shadow-sm text-sm">
              {patient.bloodGroup || 'N/A'}
            </span>
          </div>
          
          <div className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2">
            <span className="text-gray-600 flex items-center gap-2 text-sm">
              <FaIdCard className="text-blue-500" />
              Case ID:
            </span>
            <span className="font-mono text-sm bg-white px-2 py-1 rounded text-teal-700 shadow-sm">
              {patient.caseId || 'N/A'}
            </span>
          </div>
        </div>
        
        <motion.button 
          className="mt-4 w-full py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/patient/${patient._id}`)}
        >
          View Full Profile
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-6 bg-gradient-to-br from-teal-50 to-blue-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
            >
              <div className="flex items-center">
                <GiStethoscope className="text-teal-600 text-4xl mr-3" />
                <h1 className="text-3xl font-bold text-teal-800">Patient Records</h1>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                {/* Search */}
                <div className="relative w-full">
                  <FaSearch className="absolute left-3 top-3 text-teal-600" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* View Toggle */}
                <div className="relative h-10 w-full sm:w-32 bg-white rounded-lg shadow-sm border border-teal-300 overflow-hidden">
                  <div className="relative flex h-full">
                    <motion.div
                      className="absolute top-0 left-0 w-1/2 h-full bg-teal-600 z-0 rounded-md"
                      animate={{ x: viewMode === 'cards' ? 0 : '100%' }}
                    />
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`relative z-10 w-1/2 h-full flex items-center justify-center ${
                        viewMode === 'cards' ? 'text-white' : 'text-teal-600'
                      }`}
                    >
                      <FaTh />
                    </button>
                    <button
                      onClick={() => setViewMode('linear')}
                      className={`relative z-10 w-1/2 h-full flex items-center justify-center ${
                        viewMode === 'linear' ? 'text-white' : 'text-teal-600'
                      }`}
                    >
                      <FaList />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : (
              <>
                {viewMode === 'cards' ? (
                  <AnimatePresence>
                    {filteredPatients.length > 0 ? (
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="flex flex-wrap justify-center gap-6"
                      >
                        {filteredPatients.map(patient => (
                          <PatientCard key={patient._id} patient={patient} />
                        ))}
                      </motion.div>
                    ) : (
                      <EmptyState />
                    )}
                  </AnimatePresence>
                ) : (
                  <AnimatePresence>
                    {filteredPatients.length > 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-teal-100"
                      >
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Age</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Gender</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Blood Group</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Case ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {filteredPatients.map((patient, index) => (
                                <motion.tr 
                                  key={patient._id} 
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.05 }}
                                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-teal-50`}
                                >
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 h-10 w-10 relative">
                                        <PatientAvatar name={patient.name} image={patient.profileImage} size={10} />
                                        <div className="absolute -bottom-1 -right-1 bg-teal-600 rounded-full p-1 border-2 border-white">
                                          <FaUserInjured className="text-white text-xs" />
                                        </div>
                                      </div>
                                      <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 flex items-center gap-1">
                                      <FaCalendarAlt className="text-teal-600" /> 
                                      {new Date().getFullYear() - new Date(patient.dob).getFullYear()}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 flex items-center gap-1">
                                      <FaVenusMars className={patient.gender === 'Male' ? 'text-blue-500' : 'text-pink-500'} /> 
                                      {patient.gender}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center gap-1">
                                      <FaHeartbeat /> {patient.bloodGroup || 'N/A'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-mono text-teal-700 bg-teal-50 px-2 py-1 rounded">
                                      {patient.caseId || 'N/A'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <motion.button 
                                      className="text-teal-600 hover:text-teal-800"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => navigate(`/patient/${patient._id}`)}
                                    >
                                      View Details
                                    </motion.button>
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    ) : (
                      <EmptyState />
                    )}
                  </AnimatePresence>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Patients;