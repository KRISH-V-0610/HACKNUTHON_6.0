import { useState } from 'react';
import { motion } from 'framer-motion';
import {axiosInstance} from '../lib/axios.js'; // Adjust the import based on your project structure
import { FaUserMd, FaEnvelope, FaLock, FaUserPlus, FaClinicMedical } from 'react-icons/fa';
import { MdOutlineMedicalServices } from 'react-icons/md';
import { Link } from 'react-router-dom';
import bg from './bg.jpeg'
const Signup = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axiosInstance.post('/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Handle successful registration
      console.log('Registration successful:', response.data);
      alert('Registration successful');
      setSuccess(true);
      
      // Optionally: Store the token in localStorage or context
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      
      // Optionally redirect to login or dashboard
      window.location.href = '/patients';

    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message || 'Registration failed');
      } else if (err.request) {
        setError('No response from server. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex flex-col lg:flex-row">
        <div
             className="relative lg:w-1/2 h-64 lg:h-auto overflow-hidden"
             style={{
               background: `linear-gradient(to bottom, rgba(15, 118, 110, 0.8), rgba(6, 95, 70, 0.8)), url(${bg})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat'
             }}
           >
             {/* Content goes here if needed */}
           </div>

      {/* Signup Form Side */}
      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <MdOutlineMedicalServices className="text-4xl text-teal-600" />
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              Dermatologist Registration
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-gray-600"
            >
              Join our network of healthcare professionals
            </motion.p>
          </div>

          {error && (
            <motion.div 
              className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div 
              className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Registration successful! You can now login.
            </motion.div>
          )}

          <motion.form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-teal-600">
                  <FaUserMd />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none transition"
                  placeholder="Dr. Madhukant Patel"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-teal-600">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none transition"
                  placeholder="doctor@clinic.com"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-teal-600">
                  <FaLock />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none transition"
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
              </div>
            </motion.div>

           

        

            <motion.button
              type="submit"
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.01,
                boxShadow: "0px 4px 10px rgba(13, 148, 136, 0.3)"
              }}
              whileTap={{ scale: 0.99 }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  <FaUserPlus className="mr-2" />
                  Create Account
                </>
              )}
            </motion.button>

            <motion.div
              className="text-center pt-4 border-t border-gray-100 mt-6"
              variants={itemVariants}
            >
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-teal-600 font-semibold hover:underline">
                  Login here
                </Link>
              </p>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;