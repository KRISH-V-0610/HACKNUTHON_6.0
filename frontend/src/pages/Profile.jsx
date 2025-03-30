import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Profile = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <main 
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Doctor Profile</h1>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-teal-100 mx-auto mb-4 flex items-center justify-center">
              <span className="text-teal-600 text-2xl font-bold">A</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Dr. Andreas</h2>
            <p className="text-gray-600 mb-4">Cardiologist</p>
            <p className="text-gray-500">Profile page is under development</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;