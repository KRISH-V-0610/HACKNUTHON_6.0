import React from 'react';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';

const Dashboard = ({ sidebarOpen, setSidebarOpen }) => {

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const reportData = {
    "image_url": "https://res.cloudinary.com/dkuitm79x/image/upload/v1743335597/medical-app/patients/m30seqw5dhiqxvnoajqf.jpg",
  
    "verify": "Unhealthy,80,Oily,The skin has visible acne scars and a raised lesion, indicating an unhealthy condition. The enlarged pores suggest an oily skin type.",
    "prediction": "Atopic Dermatitis,99.67%, Atopic dermatitis is a chronic inflammatory skin condition. Symptoms may include itching, redness, and a rash. Further evaluation is recommended.\n",
    "report": "Okay, I will generate a skin disease diagnosis report based on the information provided.\n\n# *Skin Disease Diagnosis Report* 🏥\n\n## *Step 1: Image Technical Assessment\n\n### **1.1 Imaging & Quality Review\n- **Imaging Modality Identification:* Clinical\n- *Anatomical Region & Patient Positioning:* Facial area, specifically the cheek.\n- *Image Quality Evaluation:* The image has fair clarity and contrast. There are no apparent significant artifacts.\n- *Technical Adequacy for Diagnostic Purposes:* Yes, the image is adequate for initial assessment, but a dermatoscopic image would be more helpful for detailed analysis.\n\n### *1.2 Professional Dermatological Analysis\n- **Systematic Anatomical Review:* Examination of the facial skin, focusing on the cheek area.\n- *Primary Findings:\n    - A single, raised lesion is noted. Size is difficult to estimate without a scale.\n    - The lesion appears to be round/oval in shape with a smooth texture.\n    - Color is similar to the surrounding skin, possibly slightly lighter.\n    - Some textural changes in the surrounding skin, possibly consistent with dryness or mild inflammation.\n- **Secondary Observations (if applicable):* There are some small pit-like marks in the skin that could be scars or dilated pores.\n- *Anatomical Variants or Incidental Findings:* None apparent.\n- *Severity Assessment:* Mild.\n\n---\n\n## *Step 2: Context-Specific Diagnosis & Clinical Interpretation\n- **Primary Diagnosis:* Based on the AI prediction and image analysis, Atopic Dermatitis is a strong possibility. The raised lesion is not typical for atopic dermatitis.\n- *Secondary Condition (if suspected):* Given the raised lesion, other possibilities include a benign skin growth (e.g., a small cyst or fibroma).\n\n---\n\n## *Step 3: Recommended Next Steps\n- **Home Remedies & Skincare:\n    - Moisturizing the affected area with a gentle, fragrance-free moisturizer.\n    - Avoiding potential triggers such as harsh soaps or irritants.\n    - Maintaining adequate hydration.\n- **Medications & Treatments:* Not recommended without a confirmed diagnosis.\n- *When to See a Doctor:* It is recommended to see a dermatologist for a proper evaluation of the lesion and the surrounding skin. Persistent symptoms, spreading, or any signs of inflammation should prompt a visit.\n- *Diagnostic Tests (if required):* A skin biopsy may be considered to determine the nature of the raised lesion. Patch testing might be useful to identify potential allergens if atopic dermatitis is suspected.\n\n---\n\n## *Step 4: Patient Education\n- Atopic dermatitis is a chronic skin condition that causes dry, itchy skin and a rash.\n- The raised lesion may or may not be related to atopic dermatitis and needs to be evaluated.\n- Avoiding irritants and keeping the skin moisturized can help manage symptoms.\n\n---\n\n## **Step 5: Ayurvedic or Home Solutions\n_(Applied only if the condition is non-cancerous or mild)_\n- **Dry & Irritated Skin:* Apply *Aloe Vera gel, **Coconut oil, or **Ghee* for deep moisturization.\n- *Inflammation & Redness:* Use a paste of *Sandalwood (Chandan)* and *Rose water* for cooling effects.\n\n[🔍 More Ayurvedic Solutions](https://www.example.com)\n\n---\n\n## *Step 6: Evidence-Based Context & References\n🔬 Using DuckDuckGo search:\n# **Skin Disease Diagnosis Report* 🏥\n\n## *Step 1: Image Technical Assessment\n\n### **1.1 Imaging & Quality Review\n- **Imaging Modality Identification:* Clinical Image\n- *Anatomical Region & Patient Positioning:* Cheek area, close-up view\n- *Image Quality Evaluation:* Acceptable contrast and clarity. No significant artifacts are apparent.\n- *Technical Adequacy for Diagnostic Purposes:* Yes, the image provides sufficient detail for initial assessment.\n\n### *1.2 Professional Dermatological Analysis\n- **Systematic Anatomical Review:* Examination focused on the cheek region.\n- *Primary Findings:* Presence of a raised lesion with surrounding skin changes. The lesion appears to be approximately 5mm in diameter. The surrounding skin exhibits textural changes and some visible pores.\n- *Secondary Observations (if applicable):* Some subtle discoloration or textural variation in the skin surrounding the primary lesion.\n- *Anatomical Variants or Incidental Findings:* None apparent.\n- *Severity Assessment:* Mild to Moderate\n\n---\n\n## *Step 2: Context-Specific Diagnosis & Clinical Interpretation\n- **Primary Diagnosis:* Based on the AI analysis, Atopic Dermatitis is the most likely diagnosis (99.67% confidence). Atopic dermatitis is a chronic inflammatory skin condition. Symptoms may include itching, redness, and a rash. The image shows a lesion and some surrounding skin changes, which could be consistent with this condition.\n- *Secondary Condition (if suspected):* Without further clinical information, it is difficult to rule out other possibilities such as a benign skin growth or other forms of dermatitis.\n\n---\n\n## *Step 3: Recommended Next Steps\n- **Home Remedies & Skincare:* Focus on gentle skincare. Use a mild, fragrance-free cleanser and a hypoallergenic moisturizer. Avoid scratching the area.\n- *Medications & Treatments:* Given the possibility of atopic dermatitis, topical corticosteroids or emollients might be considered. However, do not start any medication without consulting a dermatologist.\n- *When to See a Doctor:* Due to the AI's suggestion of Atopic Dermatitis, consultation with a dermatologist is recommended for confirmation and treatment. If the lesion changes in size, shape, or color, or if it becomes painful or itchy, seek prompt medical attention.\n- *Diagnostic Tests (if required):* A skin biopsy may be considered to confirm the diagnosis and rule out other conditions. Allergy testing might be useful in identifying potential triggers for atopic dermatitis.\n\n---\n\n## *Step 4: Patient Education\n- **Clear, Jargon-Free Explanation of Findings:* The AI suggests that the skin condition is likely Atopic Dermatitis, a chronic inflammatory skin condition that causes itching, redness, and rashes.\n- *Visual Analogies & Simple Diagrams (if helpful):* N/A\n- *Common Questions Addressed:* \"What causes atopic dermatitis?\" (Triggers can vary), \"How is it treated?\" (Typically involves topical medications and skincare).\n- *Lifestyle Implications (if any):* Identifying and avoiding triggers can help manage the condition.\n\n---\n\n## *Step 5: Ayurvedic or Home Solutions\n_(Applied only if the condition is non-cancerous or mild)_\n- **Dry & Irritated Skin:* Apply *Aloe Vera gel, **Coconut oil, or **Ghee* for deep moisturization.\n- *Inflammation & Redness:* Use a paste of *Sandalwood (Chandan)* and *Rose water* for cooling effects.\n\n[🔍 More Ayurvedic Solutions](https://www.example.com)\n\n---\n\n## *Step 6: Evidence-Based Context & References\n🔬 Using DuckDuckGo search:\n- Recent relevant medical literature regarding atopic dermatitis diagnosis and treatment guidelines.\n- Information about differential diagnosis of skin lesions on the cheek.\n- Technological advances in imaging/treatment for skin conditions.\n- 2-3 authoritative medical references (e.g., American Academy of Dermatology guidelines)\n\n---\n\n## **Final Summary & Conclusion\n📌 **Key Takeaways:\n- **Most Likely Diagnosis:* Atopic Dermatitis (based on AI analysis).\n- *Recommended Actions:* Consult a dermatologist for confirmation, discuss potential treatments, and explore trigger identification.\n\n*Note:* This report is *AI-generated* and should *not* replace professional medical consultation. Always consult a *dermatologist* for a confirmed diagnosis and personalized treatment.\n",
    "jarvis": "Based on the AI-generated prediction, *Atopic Dermatitis* is the most likely diagnosis with a 99.67% confidence level. Here’s a professional guideline for the doctor:\n\n1. *Confirm Atopic Dermatitis:* Recommend a comprehensive assessment including patient medical history and physical examination. Atopic dermatitis is a chronic condition characterized by itching, redness, and rash.\n\n2. *Discuss Treatment Options:* Initiate appropriate treatments such as topical corticosteroids or calcineurin inhibitors. For severe cases, consider systemic therapies like Dupilumab or JAK inhibitors.\n\n3. *Prescription Advice:* Suggest a treatment plan that includes skin moisturization, avoidance of triggers, and the necessary medications, if needed. Provide information on side effects and monitoring intervals.\n\n4. *Patient Follow-up:* Recommend regular follow-up visits for assessing treatment efficacy and managing any side effects. Consider allergy testing to identify potential triggers.\n\n5. *References and Further Reading:* Offer evidence-based sources like PubMed, JAMA Dermatology, and the American Academy of Dermatology for thorough guidance.\n\nWould you like more specific details or shall I provide a complete treatment plan?"
  }
 
  let reportString = reportData.report;

  // Split at "Skin Disease Diagnosis Report" and take the content after the second occurrence
  const parts = reportString.split(/Skin Disease Diagnosis Report.*?/s);
  const finalReport = parts.length > 2 ? parts[2] : parts[1] || '';

  // Ensure we start from "*Step 1:" and prepend "### "
  const cleanedReport = finalReport.replace(/.*?(\*Step 1:)/s, '### $1');

  console.log(cleanedReport);





  // Parse verification data
  const [status, confidence, skinType, remarks] = reportData.verify.split(',').map(s => s.trim());

  // Parse prediction data
  const [disease, predConfidence, predRemarks] = reportData.prediction.split(',').map(s => s.trim());


  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main 
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >


         {/* Add Dashboard Main Content Here */}

         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <header className="text-center bg-gradient-to-r from-teal-600 to-cyan-600 py-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-white">Skin Disease Diagnosis Report</h1>
          <p className="text-teal-100 mt-2">powered by Shushrut AI</p>
          <div className="w-24 h-1 bg-teal-300 mx-auto mt-4 rounded-full"></div>
        </header>

        {/* Image Preview */}
        <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-teal-600 mt-6">
          <div className="flex justify-center">
            <img
              src={reportData.image_url}
              alt="Skin condition"
              className="rounded-md max-h-64 object-contain"
            />
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Verification Card */}
          <div className="bg-white p-5 rounded-lg shadow-sm border-2 border-teal-600">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-lg font-bold bg-teal-100 p-2 rounded-lg text-teal-800 mb-3">Verification:</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">Status:</span>
                    <span className={`font-medium ${status === 'Unhealthy' ? 'text-red-600' : 'text-teal-600'}`}>
                      {status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-bold">Confidence:</span>
                    <div className="relative size-24">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={status === 'Unhealthy' ? '#EF4444' : '#0D9488'}
                          strokeWidth="3"
                          strokeDasharray={`${confidence}, 100`}
                          style={{ transition: 'stroke-dasharray 1s ease-out' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-teal-800">{confidence}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">Skin Type:</span>
                    <span className="font-medium text-teal-800">{skinType}</span>
                  </div>
                  <p className="text-teal-700 font-semibold text-sm mt-3 bg-zinc-100 p-2 rounded-lg">{remarks}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Prediction Card */}
          <div className="bg-white p-5 rounded-lg shadow-sm border-2 border-teal-600">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-lg font-bold p-2 rounded-lg text-teal-800 mb-3 bg-teal-100 ">AI Prediction:</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">Condition:</span>
                    <span className="font-medium text-teal-800">{disease}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-bold">Confidence:</span>




                  {/* first */}
                    <div className="relative size-24">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={status === 'Unhealthy' ? '#EF4444' : '#0D9488'}
                          strokeWidth="3"
                          strokeDasharray={`${predConfidence.slice(0,-1)}, 100`}
                          style={{ transition: 'stroke-dasharray 1s ease-out' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-teal-800">{predConfidence.slice(0,-1)}%</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-teal-700 font-semibold text-sm mt-3 bg-zinc-100 p-2 rounded-lg">{predRemarks}</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Main Report Content */}
        <div className="bg-white border-2 border-teal-600 p-6 rounded-lg shadow-sm">

          {/* Teal-themed heading */}
          <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-500 shadow-sm">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-800 to-cyan-800">
              Detailed Analysis :
            </h1>
            <div className="w-full h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 mt-2"></div>
          </div>

          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-4 pb-2 border-b border-gray-200" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-lg font-medium text-gray-800 mt-5 mb-2" {...props} />,
              p: ({ node, ...props }) => <p className="text-gray-700 my-3 leading-relaxed" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-3 space-y-1" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-3 space-y-1" {...props} />,
              li: ({ node, ...props }) => <li className="my-1.5" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
              em: ({ node, ...props }) => <em className="italic" {...props} />,
              a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />
            }}
          >
            {cleanedReport}
          </ReactMarkdown>
        </div>


        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 py-4">
          <p>Report generated on {new Date().toLocaleDateString()}</p>
        </footer>
      </div>
    </div>


       
      </main>
    </div>
  );
};

export default Dashboard;






