import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import PatientForm from '../components/PatientForm';

const AddPatient = ({ sidebarOpen, setSidebarOpen }) => {


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main 
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {/* Add Patient Main Content Here */}

        <PatientForm />

      </main>
    </div>
  );
};

export default AddPatient;