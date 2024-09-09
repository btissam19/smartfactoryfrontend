// src/components/CoverLetterGenerator.js
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactMarkdown from 'react-markdown';
import { CONFIG } from './config';
const baseURL = CONFIG.BASE_URL;

function CoverLetterGenerator() {
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCoverLetter = async () => {
    setLoading(true);
    setCoverLetter(''); // Clear previous cover letter
    try {
      const response = await fetch(`${baseURL}/cover_letter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_description: jobDescription }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data['cover letter']) {
        setCoverLetter(data['cover letter']);
        toast.success('Cover letter generated successfully!');
      } else {
        toast.error('No cover letter returned from the server.');
      }
    } catch (error) {
      toast.error('Error generating cover letter.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Generate Cover Letter</h2>
      <textarea
        rows="5"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter job description here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        style={{ color: 'black' }}
      ></textarea>
      <button
        onClick={generateCoverLetter}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Cover Letter'}
      </button>
      <div className="mt-4">
        {coverLetter && (
          <div className="bg-black text-white p-4 rounded mt-4">
            <h3 className="text-xl font-bold mb-2">Generated Cover Letter</h3>
            <ReactMarkdown className="whitespace-pre-wrap">
              {coverLetter}
            </ReactMarkdown>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default CoverLetterGenerator;
