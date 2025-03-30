import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import { useLocation } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Dashboard = ({ sidebarOpen, setSidebarOpen }) => {
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const location = useLocation();
  const Data = location.state;
  const pdfRef = useRef();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  let reportString = Data.reportData.report;

  // Process report content
  const parts = reportString.split(/Skin Disease Diagnosis Report.*?/s);
  const finalReport = parts.length > 2 ? parts[2] : parts[1] || '';
  const cleanedReport = finalReport.replace(/.*?(\*Step 1:)/s, '### $1');

  // Parse verification data
  const [status, confidence, skinType, remarks] = Data.reportData.verify.split(',').map(s => s.trim());
  const cleanConfidence = confidence.endsWith('%') ? confidence.slice(0, -1) : confidence;

  // Parse prediction data
  const [disease, predConfidence, predRemarks] = Data.reportData.prediction.split(',').map(s => s.trim());
  const cleanPredConfidence = predConfidence.endsWith('%') ? predConfidence.slice(0, -1) : predConfidence;

  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    const input = pdfRef.current;
    
    // Hide non-printable elements
    const elementsToHide = document.querySelectorAll('.no-print');
    elementsToHide.forEach(el => el.style.visibility = 'hidden');
    
    try {
      // Create clone for PDF processing
      const clone = input.cloneNode(true);
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.width = input.offsetWidth + 'px';
      document.body.appendChild(clone);

      // Function to completely remove any problematic color formats
      const sanitizeColors = (element) => {
        // Handle inline styles
        const style = element.style;
        if (style) {
          const styleProperties = ['color', 'backgroundColor', 'borderColor', 'fill', 'stroke'];
          styleProperties.forEach(prop => {
            if (style[prop] && /(oklch|var|hsl|lab)\(/.test(style[prop])) {
              // Replace with safe fallbacks
              if (prop === 'backgroundColor') style[prop] = '#ffffff';
              else if (prop === 'color') style[prop] = '#000000';
              else if (prop === 'borderColor') style[prop] = '#e5e7eb';
              else if (prop === 'fill') style[prop] = '#0d9488';
              else if (prop === 'stroke') style[prop] = '#0d9488';
            }
          });
        }

        // Handle SVG attributes
        if (element.hasAttribute('fill')) {
          element.setAttribute('fill', '#0d9488');
        }
        if (element.hasAttribute('stroke')) {
          element.setAttribute('stroke', '#0d9488');
        }
      };

      // Process all elements in the clone
      const allElements = clone.querySelectorAll('*');
      allElements.forEach(el => {
        sanitizeColors(el);
      });

      // Also process the clone itself
      sanitizeColors(clone);

      // Remove any style tags that might contain modern color functions
      clone.querySelectorAll('style').forEach(styleTag => {
        if (/(oklch|var|hsl|lab)\(/.test(styleTag.textContent)) {
          styleTag.remove();
        }
      });

      // Generate canvas with safest possible settings
      const canvas = await html2canvas(clone, {
        scale: 1,
        logging: true,
        useCORS: true,
        backgroundColor: '#ffffff',
        ignoreElements: (element) => element.classList.contains('no-print'),
        allowTaint: true,
        foreignObjectRendering: false
      });

      // Remove clone
      document.body.removeChild(clone);

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const padding = 10;
      
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth - padding * 2;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      // Add first page
      pdf.addImage(imgData, 'PNG', padding, 0, imgWidth, imgHeight);
      
      // Add additional pages if needed
      let heightLeft = imgHeight - pageHeight;
      let position = 0;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', padding, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save PDF
      pdf.save(`Skin_Diagnosis_Report_${Data.patientData.caseId}.pdf`);

    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error generating PDF. Please check console for details.");
    } finally {
      // Restore UI
      elementsToHide.forEach(el => el.style.visibility = 'visible');
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="bg-[#f3f4f6] min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Download Button with Loader */}
        <div className="fixed bottom-8 right-8 z-50 no-print">
          <button 
            onClick={downloadPDF}
            disabled={isGeneratingPDF}
            className={`bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition-all ${
              isGeneratingPDF ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isGeneratingPDF ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Report
              </>
            )}
          </button>
        </div>

        {/* Report Content */}
        <div ref={pdfRef} className="min-h-screen bg-white py-8 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-8">

            {/* Header */}
            <header className="text-center bg-[#0d9488] py-6 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-white">Skin Disease Diagnosis Report</h1>
              <p className="text-[#ccfbf1] mt-2">powered by Shushrut AI</p>
              <div className="w-24 h-1 bg-[#5eead4] mx-auto mt-4 rounded-full"></div>
            </header>

            {/* Image Preview */}
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-[#0d9488] mt-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Image Section */}
                <div className="md:w-2/5 flex flex-col items-center">
                  <div className="relative w-full max-w-xs">
                    <img
                      src={Data.reportData.image_url}
                      alt="Skin condition"
                      className="rounded-lg w-full h-64 object-cover border-2 border-[#ccfbf1] shadow-sm"
                    />
                    <div className="absolute -bottom-4 left-0 right-0 flex justify-center">
                      <span className="bg-[#0d9488] text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                        Medical Image
                      </span>
                    </div>
                  </div>
                </div>

                {/* Patient Details Section */}
                <div className="md:w-3/5">
                  <div className="bg-[#f0fdf4] p-4 rounded-lg border border-[#ccfbf1]">
                    <h3 className="text-2xl font-bold text-[#115e59] mb-2 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Patient Profile
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-white p-3 rounded-md border border-[#e5e7eb] shadow-xs">
                        <p className="text-xs font-semibold text-[#0d9488] uppercase tracking-wider">Name</p>
                        <p className="text-lg font-medium text-[#1f2937] mt-1">{Data.patientData.name}</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-md border border-[#e5e7eb] shadow-xs">
                        <p className="text-xs font-semibold text-[#0d9488] uppercase tracking-wider">Age</p>
                        <p className="text-lg font-medium text-[#1f2937] mt-1">
                          {Data.patientData.age} years
                        </p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-md border border-[#e5e7eb] shadow-xs">
                        <p className="text-xs font-semibold text-[#0d9488] uppercase tracking-wider">Gender</p>
                        <p className="text-lg font-medium text-[#1f2937] mt-1 capitalize">
                          {Data.patientData.gender}
                        </p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-md border border-[#e5e7eb] shadow-xs">
                        <p className="text-xs font-semibold text-[#0d9488] uppercase tracking-wider">Case ID</p>
                        <p className="text-lg font-medium text-[#1f2937] mt-1 font-mono">
                          {Data.patientData.caseId}
                        </p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-md border border-[#e5e7eb] shadow-xs">
                        <p className="text-xs font-semibold text-[#0d9488] uppercase tracking-wider">Date Registered</p>
                        <p className="text-lg font-medium text-[#1f2937] mt-1">
                          {new Date(Data.patientData.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-md border border-[#e5e7eb] shadow-xs">
                        <p className="text-xs font-semibold text-[#0d9488] uppercase tracking-wider">Status</p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#ccfbf1] text-[#115e59] mt-1">
                          <svg className="w-3 h-3 mr-1 text-[#14b8a6]" fill="currentColor" viewBox="0 0 8 8">
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                          Active Case
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Verification Card */}
              <div className="bg-white p-5 rounded-lg shadow-sm border-2 border-[#0d9488]">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold bg-[#ccfbf1] p-2 rounded-lg text-[#115e59] mb-3">Verification:</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#6b7280] font-bold">Status:</span>
                        <span className={`font-medium ${status === 'Unhealthy' ? 'text-[#dc2626]' : 'text-[#0d9488]'}`}>
                          {status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#6b7280] font-bold">Confidence:</span>
                        <div className="relative size-24">
                          <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#E5E7EB"
                              strokeWidth="3"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={status === 'Unhealthy' ? '#EF4444' : '#0D9488'}
                              strokeWidth="3"
                              strokeDasharray={`${cleanConfidence}, 100`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-[#115e59]">{cleanConfidence}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6b7280] font-bold">Skin Type:</span>
                        <span className="font-medium text-[#115e59]">{skinType}</span>
                      </div>
                      <p className="text-[#0f766e] font-semibold text-sm mt-3 bg-[#f4f4f5] p-2 rounded-lg">{remarks}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prediction Card */}
              <div className="bg-white p-5 rounded-lg shadow-sm border-2 border-[#0d9488]">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold p-2 rounded-lg text-[#115e59] mb-3 bg-[#ccfbf1]">AI Prediction:</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#6b7280] font-bold">Condition:</span>
                        <span className="font-medium text-[#115e59]">{disease}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#6b7280] font-bold">Confidence:</span>
                        <div className="relative size-24">
                          <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#E5E7EB"
                              strokeWidth="3"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={status === 'Unhealthy' ? '#EF4444' : '#0D9488'}
                              strokeWidth="3"
                              strokeDasharray={`${cleanPredConfidence}, 100`}
                            />  
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-[#115e59]">{cleanPredConfidence}%</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#0f766e] font-semibold text-sm mt-3 bg-[#f4f4f5] p-2 rounded-lg">{predRemarks}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Report Content */}
            <div className="bg-white border-2 border-[#0d9488] p-6 rounded-lg shadow-sm">
              <div className="mb-6 p-4 rounded-lg bg-[#f0fdf4] border-l-4 border-[#14b8a6] shadow-sm">
                <h1 className="text-3xl font-bold text-[#115e59]">
                  Detailed Analysis :
                </h1>
                <div className="w-full h-0.5 bg-[#14b8a6] mt-2"></div>
              </div>

              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-[#1f2937] mt-2 mb-4 pb-2 border-b border-[#e5e7eb]" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-lg font-medium text-[#1f2937] mt-5 mb-2" {...props} />,
                  p: ({ node, ...props }) => <p className="text-[#374151] my-3 leading-relaxed" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-3 space-y-1" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-3 space-y-1" {...props} />,
                  li: ({ node, ...props }) => <li className="my-1.5" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-semibold text-[#111827]" {...props} />,
                  em: ({ node, ...props }) => <em className="italic" {...props} />,
                  a: ({ node, ...props }) => <a className="text-[#2563eb] hover:underline" {...props} />
                }}
              >
                {cleanedReport}
              </ReactMarkdown>
            </div>

            {/* Footer */}
            <footer className="text-center text-sm text-[#6b7280] py-4">
              <p>Report generated on {new Date().toLocaleDateString()}</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;