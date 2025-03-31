import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  FaUserMd, FaClinicMedical, FaChartLine, FaMobileAlt, 
  FaMicroscope, FaHospital, FaFlask, FaDna, FaPlay, 
  FaSun, FaMoon, FaArrowRight, FaRegLightbulb, FaShieldAlt
} from 'react-icons/fa';
import React from 'react';
import { IoMdMedical } from "react-icons/io";
import { IoSunny } from "react-icons/io5";  // Correct import path
import { 
  MdHealthAndSafety, MdBiotech, MdScience, 
  MdMedicalServices, MdOutlinePrecisionManufacturing 
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GiMedicines } from 'react-icons/gi';

// Particle component for background animation
const Particle = ({ darkMode }) => {
  const size = Math.random() * 10 + 5;
  const left = Math.random() * 100;
  const duration = Math.random() * 15 + 15;
  const delay = Math.random() * -20;
  const opacity = Math.random() * 0.6 + 0.2;

  return (
    <motion.div
      className={`absolute top-[-10px] rounded-full ${darkMode ? 'bg-teal-400/30' : 'bg-teal-600/30'}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        opacity: opacity
      }}
      animate={{
        y: [0, window.innerHeight + 10],
        x: [0, (Math.random() - 0.5) * 50],
        opacity: [opacity, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const LandingPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  // Check user's preferred color scheme
  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Animation controls for features section
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Features data
  const features = [
    {
      id: 'real-time',
      title: "Real-time AI Diagnosis",
      icon: <FaDna className="text-3xl" />,
      description: "Instant clinical-grade assessment of dermatological conditions with 95% accuracy",
      color: "text-purple-500"
    },
    {
      id: 'database',
      title: "Medical Image Database",
      icon: <FaHospital className="text-3xl" />,
      description: "Cross-referenced with 50,000+ dermatological cases from leading medical institutions",
      color: "text-blue-500"
    },
    {
      id: 'integration',
      title: "EHR Integration",
      icon: <FaClinicMedical className="text-3xl" />,
      description: "HIPAA-compliant integration with all major electronic health record systems",
      color: "text-teal-500"
    },
    {
      id: 'mobile',
      title: "Telemedicine Ready",
      icon: <FaMobileAlt className="text-3xl" />,
      description: "Full diagnostic capabilities on mobile for remote consultations",
      color: "text-green-500"
    }
  ];

  // Animation variants
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

  // Create particles for background
  const particles = Array.from({ length: 30 }).map((_, i) => (
    <Particle key={i} darkMode={darkMode} />
  ));

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-teal-50 to-blue-50'}`}>
      {/* Background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {particles}
      </div>

      {/* Subtle background elements */}
      <motion.div
        className={`absolute top-20 left-10 w-40 h-40 rounded-full ${darkMode ? 'bg-teal-900/20' : 'bg-teal-200/30'} blur-xl`}
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
        className={`absolute bottom-10 right-10 w-60 h-60 rounded-full ${darkMode ? 'bg-blue-900/20' : 'bg-blue-100/30'} blur-xl`}
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
      <header className="relative z-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <GiMedicines className={`text-4xl ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Shushrut<span className={darkMode ? 'text-teal-400' : 'text-teal-600'}>AI</span>
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
                {['Features', 'Technology', 'Research', 'Testimonials', 'Contact'].map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`font-medium ${darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'} cursor-pointer transition-colors`}
                  >
                    <a href={`#${item.toLowerCase()}`}>{item}</a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} transition-colors`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <IoSunny /> : <FaMoon />}
            </motion.button>

            <Link to="/login">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: darkMode ? "0 5px 15px rgba(16, 185, 129, 0.4)" : "0 5px 15px rgba(13, 148, 136, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 ${darkMode ? 'bg-teal-500 hover:bg-teal-600' : 'bg-teal-600 hover:bg-teal-700'} text-white rounded-lg font-medium flex items-center gap-2 transition-all`}
              >
                Get Started <FaArrowRight className="text-sm" />
              </motion.button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 flex items-center min-h-[80vh]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:pr-10"
            >
              <motion.h1 
                className={`text-4xl md:text-5xl lg:text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} leading-tight mb-6`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className={darkMode ? 'text-teal-400' : 'text-teal-600'}>AI-Powered Dermatology</span> for Precision Medicine
              </motion.h1>
              
              <motion.p 
                className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-2xl`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Clinical decision support system powered by deep learning to assist dermatologists in detecting and classifying skin conditions with 96.3% accuracy.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/predict">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full sm:w-auto px-8 py-3 ${darkMode ? 'bg-teal-500 hover:bg-teal-600' : 'bg-teal-600 hover:bg-teal-700'} text-white rounded-lg font-medium flex items-center justify-center gap-2`}
                  >
                    <FaUserMd /> Try Demo
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full sm:w-auto px-8 py-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'} rounded-lg font-medium flex items-center justify-center gap-2 border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
                >
                  <FaRegLightbulb /> Learn More
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`rounded-xl overflow-hidden shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all`}
            >
              <div className={`aspect-video ${darkMode ? 'bg-teal-900/50' : 'bg-teal-100'} flex items-center justify-center relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                    onClick={() => setShowVideoModal(true)}
                  >
                    <FaPlay className="text-teal-600 text-xl" />
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>See ShushrutAI in Action</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Watch our 2-minute demo video</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={ref} className={`relative z-10 py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/80' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className="text-center mb-16"
          >
            <motion.h2 variants={variants} className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
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
                className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'} p-8 rounded-xl shadow-lg border relative overflow-hidden transition-all duration-300 h-full`}
              >
                <motion.div
                  animate={{
                    scale: hoveredFeature === feature.id ? 1.2 : 1,
                    rotate: hoveredFeature === feature.id ? 10 : 0
                  }}
                  className={`${feature.color} mb-6 transition-colors`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>{feature.title}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{feature.description}</p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: hoveredFeature === feature.id ? '100%' : 0 }}
                  className={`absolute bottom-0 left-0 h-1 ${feature.color.replace('text', 'bg')} transition-all duration-300`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900' : 'bg-teal-50'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Advanced Medical AI Technology</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Peer-reviewed deep learning algorithms developed with leading dermatologists
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Image Acquisition",
                description: "Compatible with dermatoscopes and smartphone attachments for high-quality image capture",
                icon: <FaMicroscope className="text-2xl" />,
                color: "bg-purple-500"
              },
              {
                step: 2,
                title: "Neural Network Analysis",
                description: "Proprietary CNN architecture trained on 250,000+ clinical images with expert annotations",
                icon: <FaDna className="text-2xl" />,
                color: "bg-blue-500"
              },
              {
                step: 3,
                title: "Clinical Decision Support",
                description: "Evidence-based recommendations with confidence scoring and differential diagnoses",
                icon: <MdMedicalServices className="text-2xl" />,
                color: "bg-teal-500"
              }
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.step * 0.1 }}
                className={`relative z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full`}
              >
                <div className={`w-16 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                    className={`${item.color.replace('bg', 'text')}`}
                  >
                    {item.icon}
                  </motion.div>
                </div>
                <div className={`absolute -top-4 -right-4 w-10 h-10 ${item.color} text-white rounded-full flex items-center justify-center font-bold shadow-md`}>
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
      <section id="research" className={`py-24 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-teal-800' : 'bg-teal-600'} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Clinically Validated AI</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Published in the Journal of the American Academy of Dermatology with 98.7% specificity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                value: "96.3%",
                label: "Overall Accuracy",
                description: "Across 50+ skin conditions"
              },
              {
                value: "98.7%",
                label: "Specificity",
                description: "For malignant melanoma detection"
              },
              {
                value: "95.1%",
                label: "Sensitivity",
                description: "For early-stage detection"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-xl ${darkMode ? 'bg-teal-900/30' : 'bg-teal-700/30'} backdrop-blur-sm border ${darkMode ? 'border-teal-700' : 'border-teal-500/30'}`}
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-xl font-medium mb-2">{stat.label}</div>
                <div className="opacity-80">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
     

     

      {/* Footer */}
      <footer id="contact" className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-gray-400`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <GiMedicines className={`text-3xl ${darkMode ? 'text-teal-400' : 'text-teal-500'}`} />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-100'}`}>
                  Shushrut<span className={darkMode ? 'text-teal-400' : 'text-teal-500'}>AI</span>
                </h3>
              </div>
              <p className="mb-6">FDA-cleared AI diagnostic assistance for dermatologists.</p>
              <p>© {new Date().getFullYear()} ShushrutAI. All rights reserved.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-100'} mb-6`}>Product</h4>
              <ul className="space-y-3">
                {['Features', 'Technology', 'Pricing', 'Integrations', 'Roadmap'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-teal-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-100'} mb-6`}>Resources</h4>
              <ul className="space-y-3">
                {['Documentation', 'Research Papers', 'Case Studies', 'Blog', 'Webinars'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-teal-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-100'} mb-6`}>Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <IoMdMedical className="text-xl mr-3 mt-1 text-teal-400" />
                  <span>123 Medical Drive, San Francisco, CA 94158</span>
                </li>
                <li className="flex items-center">
                 
                  <span>+1 (800) 123-4567</span>
                </li>
                <li className="flex items-center">
                  
                  <span>support@shushrut.ai</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-700'} mt-12 pt-8 text-center`}>
            <p className="text-sm">
              ShushrutAI is intended for use by healthcare professionals only. Not for diagnostic use.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;