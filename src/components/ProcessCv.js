// src/components/ProcessCv.js
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CONFIG } from './config';
const baseURL = CONFIG.BASE_URL;

function ProcessCv() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResumeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}/process_resume`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setResumeData(data.extracted_info);
        toast.success("Resume processed successfully!");
      } catch (error) {
        toast.error(`Error processing resume: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!resumeData) {
    return <div>No resume data available.</div>;
  }

  return (
    <div className="mt-8 border border-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Processed Resume</h2>
      <div>
        <h3 className="text-xl font-semibold">Name</h3>
        <p>{resumeData.Name}</p>
        <h3 className="text-xl font-semibold mt-4">Profile</h3>
        <p>{resumeData.Profile}</p>
        <h3 className="text-xl font-semibold mt-4">Contact Information</h3>
        <p>{resumeData['Contact Information']}</p>
        <h3 className="text-xl font-semibold mt-4">Education</h3>
        <p>{resumeData.Education}</p>
        <h3 className="text-xl font-semibold mt-4">Work Experience</h3>
        <p>{resumeData['Work Experience']}</p>
        <h3 className="text-xl font-semibold mt-4">Projects</h3>
        <p>{resumeData.Projects}</p>
        <h3 className="text-xl font-semibold mt-4">Skills</h3>
        <p>{resumeData.Skills}</p>
        <h3 className="text-xl font-semibold mt-4">Certifications</h3>
        <p>{resumeData.Certifications}</p>
      </div>
    </div>
  );
}

export default ProcessCv;
