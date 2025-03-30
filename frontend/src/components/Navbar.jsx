import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiSearch, FiBell, FiMessageSquare,
  FiUser, FiLogOut, FiSettings
} from 'react-icons/fi';
const Navbar = ({ toggleSidebar }) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 shadow-xl fixed top-0 left-0 right-0 h-16 z-30 text-white">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Side - Medical + Logo */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-all"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <Link to="/dashboard" className="flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-2">
              <span className="mb-[7px] text-3xl font-bold">+</span>
          
            </div>
            <h1 className="text-xl font-bold tracking-tight">MediCare+</h1>
          </Link>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80" />
            <input 
              type="text" 
              placeholder="Search patients, reports..." 
              className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>

        {/* Right Side - Icons and Profile */}
        <div className="flex items-center space-x-3">
          <button className="p-2 text-white hover:bg-white/10 rounded-full relative transition-all">
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
          </button>
          
          <button className="p-2 text-white hover:bg-white/10 rounded-full transition-all">
            <FiMessageSquare size={20} />
          </button>
          
          {/* Medical Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-1 focus:outline-none group"
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30 group-hover:border-white/50 transition-all">
                <span className="text-white font-bold">A</span>
              </div>
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl py-1 z-40 border border-gray-100">
                <div className="px-4 py-2 border-b border-gray-100 bg-teal-50">
                  <p className="text-sm font-medium text-teal-700">Dr. Andreas</p>
                  <p className="text-xs text-teal-500">Cardiologist</p>
                </div>
                <Link 
                  to="/profile" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                  onClick={() => setProfileOpen(false)}
                >
                  <FiUser className="mr-3 text-teal-500" /> My Profile
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                  onClick={() => setProfileOpen(false)}
                >
                  <FiSettings className="mr-3 text-teal-500" /> Account Settings
                </Link>
                <div className="border-t border-gray-100"></div>
                <a 
                  href="#" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                >
                  <FiLogOut className="mr-3 text-teal-500" /> Sign Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;