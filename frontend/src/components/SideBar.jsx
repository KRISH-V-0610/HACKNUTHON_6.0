import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUsers, FiSettings, FiHelpCircle,
  FiX,FiHome
} from 'react-icons/fi';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div 
      className={`bg-teal-700 text-white fixed h-screen transition-all duration-300 ease-in-out z-20 ${
        isOpen ? 'w-64 translate-x-0' : '-translate-x-full'
      }`}
      style={{ top: '64px', height: 'calc(100vh - 64px)' }}
    >
      <div className="flex flex-col h-full p-4">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 text-white hover:bg-teal-600 rounded-lg"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center mb-10 px-2">
          <div className="bg-white text-teal-600 rounded-lg p-2 mr-3">
            <FiUsers size={24} />
          </div>
          <h1 className="text-xl font-bold">MediCare</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-1">
            {[
               { icon: <FiHome size={20} />, text: 'Dashboard', path: '/dashboard' },
              { icon: <FiUsers size={20} />, text: 'Patients', path: '/patients' },
              { icon: <FiSettings size={20} />, text: 'Add Patient', path: '/addPatient' },
              { icon: <FiSettings size={20} />, text: 'Settings', path: '/settings' },
              { icon: <FiHelpCircle size={20} />, text: 'Help Center', path: '/help' },
            ].map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path}
                  className="flex items-center p-3 rounded-lg hover:bg-teal-600 transition-colors"
                  // onClick={toggleSidebar} 
                  // Close sidebar when navigating
                >
                  <span className="mr-3 text-teal-100">{item.icon}</span>
                  <span className="text-white">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile */}
        <Link 
          to="/profile"
          className="flex items-center mt-auto p-3 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white mr-3 flex items-center justify-center">
            <span className="text-teal-700 font-medium">A</span>
          </div>
          <div>
            <p className="font-medium">Dr. Andreas</p>
            <p className="text-xs text-teal-100">Cardiologist</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;