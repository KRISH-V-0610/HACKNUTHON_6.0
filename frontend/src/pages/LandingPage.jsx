import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaUserMd, FaClinicMedical, FaChartLine, FaMobileAlt, FaMicroscope, FaHospital, FaFlask, FaDna, FaPlay, FaSun, FaMoon } from 'react-icons/fa';
import { IoSunny } from "react-icons/io5";
import { MdHealthAndSafety, MdBiotech, MdScience, MdMedicalServices } from 'react-icons/md';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const features = [
    {
      id: 'real-time',
      title: "Real-time AI Diagnosis",
      icon: <FaDna className="text-3xl" />,
      description: "Instant clinical-grade assessment of dermatological conditions with 95% accuracy"
    },
    {
      id: 'database',
      title: "Medical Image Database",
      icon: <FaHospital className="text-3xl" />,
      description: "Cross-referenced with 50,000+ dermatological cases from leading medical institutions"
    },
    {
      id: 'integration',
      title: "EHR Integration",
      icon: <FaClinicMedical className="text-3xl" />,
      description: "HIPAA-compliant integration with all major electronic health record systems"
    },
    {
      id: 'mobile',
      title: "Telemedicine Ready",
      icon: <FaMobileAlt className="text-3xl" />,
      description: "Full diagnostic capabilities on mobile for remote consultations"
    }
  ];

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-teal-50 to-teal-100'}`}>
      {/* Subtle background elements */}
      <motion.div
        className={`absolute top-20 left-10 w-40 h-40 rounded-full ${darkMode ? 'bg-teal-900/20' : 'bg-teal-200/30'} blur-lg`}
        animate={{
          x: [0, 20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute bottom-10 right-10 w-60 h-60 rounded-full ${darkMode ? 'bg-teal-800/20' : 'bg-teal-100/30'} blur-lg`}
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Header */}
      <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <MdMedicalServices className={`text-4xl ${darkMode ? 'text-teal-400' : 'text-teal-700'}`} />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              DermaScan<span className={darkMode ? 'text-teal-400' : 'text-teal-700'}>AI</span>
            </h1>
          </motion.div>

          <div className="flex items-center space-x-6">
            <motion.nav
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:block"
            >
              <ul className="flex space-x-8">
                {['Overview', 'Features', 'Technology', 'Research', 'Contact'].map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`font-medium ${darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-700'} cursor-pointer`}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <IoSunny /> : <FaMoon />}
            </motion.button>

            <Link to="/login" className="inline-block">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: darkMode ? "0px 5px 15px rgba(16, 185, 129, 0.3)" : "0px 5px 15px rgba(13, 148, 136, 0.3)",
                  x: 5
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 ${darkMode ? 'bg-teal-500 hover:bg-teal-600' : 'bg-teal-600 hover:bg-teal-700'} text-white rounded-lg font-medium flex items-center gap-1`}
              >
                Get Started <span className="ml-1">→</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 flex items-center min-h-[70vh]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} leading-tight mb-6`}>
                <span className={darkMode ? 'text-teal-400' : 'text-teal-700'}>AI-Powered Dermatology</span> for Precision Medicine
              </h1>
              <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-2xl`}>
                Clinical decision support system powered by deep learning to assist dermatologists in detecting and classifying skin conditions with 96.3% accuracy.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 ${darkMode ? 'bg-teal-500 hover:bg-teal-600' : 'bg-teal-600 hover:bg-teal-700'} text-white rounded-lg font-medium`}
                >
                  Request Clinical Demo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(13, 148, 136, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 border-2 ${darkMode ? 'border-teal-400 text-teal-400 hover:bg-teal-900/30' : 'border-teal-600 text-teal-600 hover:bg-teal-50'} rounded-lg font-medium`}
                >
                  Read White Paper
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`rounded-xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className={`aspect-video ${darkMode ? 'bg-teal-900' : 'bg-teal-100'} flex items-center justify-center`}>
                <button 
                  onClick={() => setShowVideoModal(true)}
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 hover:bg-white transition-all"
                >
                  <FaPlay className="text-teal-600 text-xl" />
                </button>
              </div>
              <div className="p-6">
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>See DermaScanAI in Action</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Watch our 2-minute demo video</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={ref} className={`relative z-10 py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/80' : 'bg-white/90'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className="text-center mb-16"
          >
            <motion.h2 variants={variants} className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Clinical-Grade AI Diagnostic Tools
            </motion.h2>
            <motion.p variants={variants} className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              FDA-cleared AI technology trusted by dermatologists worldwide
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={variants}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredFeature(feature.id)}
                onHoverEnd={() => setHoveredFeature(null)}
                className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-md border relative overflow-hidden`}
              >
                <motion.div
                  animate={{
                    scale: hoveredFeature === feature.id ? 1.2 : 1,
                    rotate: hoveredFeature === feature.id ? 10 : 0
                  }}
                  className={`${darkMode ? 'text-teal-400' : 'text-teal-600'} mb-4`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>{feature.title}</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{feature.description}</p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: hoveredFeature === feature.id ? '100%' : 0 }}
                  className={`absolute bottom-0 left-0 h-1 ${darkMode ? 'bg-teal-400' : 'bg-teal-600'}`}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-teal-50'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Medical AI Technology</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Peer-reviewed deep learning algorithms developed with leading dermatologists
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Image Acquisition",
                description: "Compatible with dermatoscopes and smartphone attachments",
                icon: <FaMicroscope className="text-2xl" />
              },
              {
                step: 2,
                title: "Neural Network Analysis",
                description: "Proprietary CNN architecture trained on 250,000+ clinical images",
                icon: <FaDna className="text-2xl" />
              },
              {
                step: 3,
                title: "Clinical Decision Support",
                description: "Evidence-based recommendations with confidence scoring",
                icon: <MdMedicalServices className="text-2xl" />
              }
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: item.step * 0.1 }}
                className={`relative z-10 ${darkMode ? 'bg-gray-700' : 'bg-white'} p-8 rounded-xl shadow-lg text-center`}
              >
                <div className={`w-16 h-16 ${darkMode ? 'bg-teal-900/50' : 'bg-teal-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                    className={`${darkMode ? 'text-teal-400' : 'text-teal-600'}`}
                  >
                    {item.icon}
                  </motion.div>
                </div>
                <div className={`absolute -top-4 -right-4 w-8 h-8 ${darkMode ? 'bg-teal-400' : 'bg-teal-600'} text-white rounded-full flex items-center justify-center font-bold`}>
                  {item.step}
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>{item.title}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-teal-800' : 'bg-teal-600'} text-white`}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Clinically Validated AI</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Published in the Journal of the American Academy of Dermatology with 98.7% specificity
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: darkMode ? "#0f766e" : "#0d9488" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-teal-600 rounded-lg font-medium"
              >
                View Clinical Studies
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-white rounded-lg font-medium"
              >
                Physician Resources
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-gray-400`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <MdMedicalServices className={`text-3xl ${darkMode ? 'text-teal-400' : 'text-teal-500'}`} />
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-100'}`}>
                DermaScan<span className={darkMode ? 'text-teal-400' : 'text-teal-500'}>AI</span>
              </h3>
            </div>
            <p className="mb-4">FDA-cleared AI diagnostic assistance for dermatologists.</p>
            <p>© 2023 DermaScanAI. All rights reserved.</p>
          </motion.div>

          {['Clinical Tools', 'Research', 'Hospital Systems', 'Compliance'].map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-100'} mb-4`}>{category}</h4>
              <ul className="space-y-2">
                {Array(4).fill(0).map((_, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5, color: darkMode ? "#ffffff" : "#f3f4f6" }}
                    className="cursor-pointer"
                  >
                    {category} Link {i + 1}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;