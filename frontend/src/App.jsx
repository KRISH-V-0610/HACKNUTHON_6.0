import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddPatient from "./pages/AddPatient";
import PatientDetails from "./pages/PatientDetails";


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>

      <Routes>

        <Route path="/" element={
          <LandingPage
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        } />


        <Route path="/login" element={
          <Login
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        } />

        <Route path="/signup" element={
          <SignUp
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        } />

        <Route path="/dashboard" element={
          <Dashboard
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        } />

        <Route path="/patients" element={
          <Patients
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        } />
        <Route path="/addPatient" element={
          <AddPatient
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        } />


        <Route path="/patient/:id" element={
          <PatientDetails
            sidebarOpen={sidebarOpen}

            setSidebarOpen={setSidebarOpen}
          />
        } />

        <Route path="/profile" element={
          <Profile
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        } />





      </Routes>



    </>
  )
}

export default App
