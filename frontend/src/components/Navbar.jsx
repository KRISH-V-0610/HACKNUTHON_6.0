import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiSettings, FiMenu } from 'react-icons/fi';
import { FaBriefcaseMedical } from "react-icons/fa";
import {axiosInstance} from '../lib/axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'; // Using js-cookie for reliable cookie handling

const Navbar = ({ toggleSidebar }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get token using js-cookie
        const token = Cookies.get('token');
        // console.log('All cookies:', document.cookie); // Log all cookies
        // console.log('Token from Cookies.get:', token);
        // console.log('Cookie attributes:', {
        //   domain: window.location.hostname,
        //   path: '/',
        //   secure: window.location.protocol === 'https:'
        // });        
        // console.log('Token from
        // cookies:', token); // Debugging
        
        if (!token) {
          console.warn('No token found in cookies');
          navigate('/login');
          return;
        }

        const response = await axiosInstance.get(`/auth/user/current-user`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true, // Important for cookies
          validateStatus: (status) => status < 500
        });

        // console.log('User data response:', response); // Debugging

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        if (!response.data) {
          throw new Error('No user data received');
        }

        setUserData(response.data.data);
        // console.log('Ye final hai', userData); // Debugging
      } catch (error) {
        console.error('Error fetching user data:', error);
        
        // Clear cookies properly
        Cookies.remove('token', { path: '/', domain: window.location.hostname });
        
        if (error.message === 'Unauthorized' || error.response?.status === 401) {
          toast.error('Session expired. Please login again.');
        } else {
          toast.error('Failed to load user data');
        }
        
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    // Clear cookies properly
    Cookies.remove('token', { 
      path: '/', 
      domain: window.location.hostname 
    });
    
    // Additional API call to invalidate token on server if needed
    axios.post('/api/auth/logout', {}, { withCredentials: true })
      .catch(err => console.error('Logout API error:', err));
    
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (loading) {
    return (
      <header className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 shadow-lg fixed top-0 left-0 right-0 h-16 z-30 text-white">
        <div className="flex items-center justify-between h-full px-6">
          <div className="animate-pulse bg-white/20 rounded-lg w-32 h-6"></div>
          <div className="animate-pulse rounded-full w-9 h-9 bg-white/20"></div>
        </div>
      </header>
    );
  }


return (
  <header className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 shadow-lg fixed top-0 left-0 right-0 h-16 z-30 text-white">
    <div className="flex items-center justify-between h-full px-6">
      {/* Left Side - Logo and Branding */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-white hover:bg-white/10 rounded-full transition-all transform hover:scale-110"
          aria-label="Toggle sidebar"
        >
          <FiMenu className="w-5 h-5" />
        </button>
        
        <Link to="/dashboard" className="flex items-center group">
          <div className="relative w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-white/20 group-hover:rotate-6">
            <div className="absolute inset-0 border-2 border-white/30 rounded-xl group-hover:border-white/50 transition-all"></div>
            <span className="text-white text-xl font-bold"><FaBriefcaseMedical/></span>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight leading-tight">
              <span className="text-white">Shushrut</span>
              <span className="text-emerald-200">AI</span>
            </h1>
            <span className="text-xs text-teal-100 opacity-80 tracking-wider">Medical Intelligence</span>
          </div>
        </Link>
      </div>

      {/* Right Side - Profile */}
      <div className="flex items-center">
        <div className="relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center focus:outline-none group"
            aria-label="User profile"
          >
            <div className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20 group-hover:border-white/40 transition-all transform group-hover:scale-105">
              {userData?.username ? (
                <span className="text-white font-medium">
                  {userData.username.charAt(0).toUpperCase()}
                </span>
              ) : (
                <span className="text-white font-medium">U</span>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-teal-700"></div>
            </div>
          </button>
          
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-40 border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-gray-100">
                <p className="text-sm font-medium text-teal-800 truncate">
                  {userData?.username || 'User'}
                </p>
                <p className="text-xs text-teal-600 truncate">
                  {userData?.email || ''}
                </p>
              </div>
              <Link 
                to="/profile" 
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                onClick={() => setProfileOpen(false)}
              >
                <FiUser className="mr-3 text-teal-600" size={16} />
                <span>My Profile</span>
              </Link>
              <Link 
                to="/settings" 
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                onClick={() => setProfileOpen(false)}
              >
                <FiSettings className="mr-3 text-teal-600" size={16} />
                <span>Account Settings</span>
              </Link>
              <div className="border-t border-gray-100"></div>
              <button
                className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                onClick={handleLogout}
              >
                <FiLogOut className="mr-3 text-red-500" size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>
);
};

export default Navbar;






