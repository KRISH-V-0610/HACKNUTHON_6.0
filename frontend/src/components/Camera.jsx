import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { FaCamera, FaSpinner, FaPaperPlane, FaTimes, FaRedo } from "react-icons/fa";
import { motion } from "framer-motion";

const Camera = ({ id }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);

  const openCamera = () => {
    setCameraActive(true);
    setCapturedImage(null);
  };

  const closeCamera = () => {
    setCameraActive(false);
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setCameraActive(false);
  };

  const uploadImage = async () => {
    if (!capturedImage) return;
    
    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      const file = dataURLtoFile(capturedImage);
      formData.append("skinImage", file);

      await axiosInstance.post(`/patient/${id}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      });
      
      toast.success("Image uploaded successfully!");
      window.location.reload();

    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed! Try again.");
    } finally {
      setUploading(false);
      setProgress(0);
      setCapturedImage(null);
    }
  };

  const dataURLtoFile = (dataurl) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], "image.png", { type: mime });
  };

  const cancelUpload = () => {
    setCapturedImage(null);
    setCameraActive(false);
  };

  return (
    <div className="w-full">
      {/* Initial State - Open Camera Button */}
      {!cameraActive && !capturedImage && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={openCamera}
          className=" bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all flex items-center justify-center gap-3 shadow-md"
        >
          <FaCamera className="text-lg" />
          <span className="font-medium">Open Camera</span>
        </motion.button>
      )}

      {/* Camera View */}
      {cameraActive && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-white rounded-xl shadow-lg p-6"
        >
          <div className="relative rounded-xl overflow-hidden mb-6 border-2 border-teal-100">
            <Webcam 
              ref={webcamRef} 
              screenshotFormat="image/png" 
              className="w-full"
              videoConstraints={{ facingMode: 'user' }}
              audio={false}
              mirrored={true}
            />
            <button
              onClick={closeCamera}
              className="absolute top-3 right-3 bg-white/90 hover:bg-white text-teal-800 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={capture}
            className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all flex items-center justify-center gap-3 shadow-md"
          >
            <FaCamera className="text-lg" />
            <span className="font-medium">Capture Photo</span>
          </motion.button>
        </motion.div>
      )}

      {/* Preview Mode */}
      {capturedImage && !cameraActive && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="relative rounded-xl overflow-hidden mb-6 border-2 border-teal-100">
            <img
              src={capturedImage}
              alt="Preview"
              className="w-full"
            />
            <button
              onClick={cancelUpload}
              className="absolute top-3 right-3 bg-white/90 hover:bg-white text-teal-800 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setCapturedImage(null); setCameraActive(true); }}
              className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-3 shadow-md"
            >
              <FaRedo className="text-lg" />
              <span className="font-medium">Retake</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={uploadImage}
              disabled={uploading}
              className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-3 shadow-md transition-all ${
                uploading
                  ? 'bg-teal-500 text-white cursor-wait'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {uploading ? (
                <>
                  <FaSpinner className="animate-spin text-lg" />
                  <span className="font-medium">{progress}%</span>
                </>
              ) : (
                <>
                  <FaPaperPlane className="text-lg" />
                  <span className="font-medium">Upload</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Camera;