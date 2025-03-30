import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import {toast} from "react-hot-toast"
import {axiosInstance} from "../lib/axios";
import { FaCamera, FaSpinner, FaPaperPlane, FaTimes, FaArrowLeft } from "react-icons/fa";

const Camera = ({id}) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);

  const openCamera = () => {
    setCameraActive(true);
  };

  const closeCamera = () => {
    setCameraActive(false);
    setCapturedImage(null);
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
      
      toast.success("Image uploaded successfully!"); // Green toast      
      window.location.reload();

    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed! Try again."); // Red toast
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
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* Initial State - Open Camera Button */}
      {!cameraActive && !capturedImage && (
        <button
          onClick={openCamera}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <FaCamera />
          Open Camera
        </button>
      )}

      {/* Camera View */}
      {cameraActive && (
        <div className="mb-6">
          <div className="relative rounded-lg overflow-hidden mb-4">
            <Webcam 
              ref={webcamRef} 
              screenshotFormat="image/png" 
              className="w-full"
              videoConstraints={{ facingMode: 'user' }}
              audio={false}
            />
            <button
              onClick={closeCamera}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow"
            >
              <FaTimes />
            </button>
          </div>
          <button
            onClick={capture}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <FaCamera />
            Capture Photo
          </button>
        </div>
      )}

      {/* Preview Mode */}
      {capturedImage && !cameraActive && (
        <div className="mb-6">
          <div className="relative mb-4">
            <img
              src={capturedImage}
              alt="Preview"
              className="w-full rounded-lg border border-gray-200"
            />
            <button
              onClick={cancelUpload}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={cancelUpload}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2"
            >
              <FaArrowLeft />
              Cancel
            </button>
            <button
              onClick={uploadImage}
              disabled={uploading}
              className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-2 ${
                uploading
                  ? 'bg-blue-400 text-white cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {uploading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  {progress}%
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Upload
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;