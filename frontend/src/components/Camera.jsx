import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { FaCamera, FaUpload, FaSpinner, FaPaperPlane, FaRedo } from "react-icons/fa";

const Camera = () => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setSelectedFile(null);
  };

  const handleFileSelect = (file) => {
    if (file.type.match("image.*")) {
      setSelectedFile(file);
      setCapturedImage(null);
    } else {
      alert("Please select an image file");
    }
  };

  const uploadImage = async () => {
    if (!capturedImage && !selectedFile) return;
    
    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      if (capturedImage) {
        const file = dataURLtoFile(capturedImage);
        formData.append("image", file);
      } else if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      });
      
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
      setProgress(0);
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

  const resetForm = () => {
    setCapturedImage(null);
    setSelectedFile(null);
    setActiveTab(null);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* Mode Selection */}
      {!capturedImage && !selectedFile && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex-1 py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'camera' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <FaCamera />
            <span>Take Photo</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'upload' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <FaUpload />
            <span>Upload Photo</span>
          </button>
        </div>
      )}

      {/* Camera View */}
      {activeTab === 'camera' && !capturedImage && (
        <div className="mb-6">
          <div className="relative rounded-lg overflow-hidden mb-4">
            <Webcam 
              ref={webcamRef} 
              screenshotFormat="image/png" 
              className="w-full"
              videoConstraints={{ facingMode: 'user' }}
              audio={false}
            />
          </div>
          <button
            onClick={capture}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <FaCamera />
            Capture Image
          </button>
        </div>
      )}

      {/* Upload View */}
      {activeTab === 'upload' && !selectedFile && (
        <div 
          className={`mb-6 p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
          }}
          onClick={() => fileInputRef.current.click()}
        >
          <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
          <p className="text-gray-600">
            {isDragging ? 'Drop image here' : 'Click or drag to upload'}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
          />
        </div>
      )}

      {/* Preview */}
      {(capturedImage || selectedFile) && (
        <div className="mb-6">
          <div className="relative">
            <img
              src={capturedImage || URL.createObjectURL(selectedFile)}
              alt="Preview"
              className="w-full rounded-lg border border-gray-200"
            />
            <button
              onClick={resetForm}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow"
            >
              <FaRedo />
            </button>
          </div>

          {/* Upload Button */}
          <button
            onClick={uploadImage}
            disabled={uploading}
            className={`w-full mt-4 px-4 py-3 rounded-lg flex items-center justify-center gap-2 ${
              uploading
                ? 'bg-blue-400 text-white cursor-wait'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {uploading ? (
              <>
                <FaSpinner className="animate-spin" />
                Uploading {progress}%
              </>
            ) : (
              <>
                <FaPaperPlane />
                Upload Image
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Camera;

