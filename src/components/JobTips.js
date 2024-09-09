import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactMarkdown from 'react-markdown';
import { CONFIG } from './config';
const baseURL = CONFIG.BASE_URL;
function JobTips() {
  const [jobDescription, setJobDescription] = useState('');
  const [tips, setTips] = useState('');
  const [loading, setLoading] = useState(false);

  const getTips = async () => {
    setLoading(true);
    setTips(''); // Clear previous tips
    try {
      const response = await fetch(`${baseURL}/tips`, {
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
      if (data['tips']) {
        setTips(data['tips']);
        toast.success('Tips retrieved successfully!');
      } else {
        toast.error('No tips returned from the server.');
      }
    } catch (error) {
      toast.error('Error retrieving tips.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Job Tips</h2>
      <textarea
        rows="5"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter job description here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        style={{ color: 'black' }}
      ></textarea>
      <button
        onClick={getTips}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Retrieving...' : 'Get Tips'}
      </button>
      <div className="mt-4">
        {tips && (
          <div className="bg-black text-white p-4 rounded mt-4">
            <h3 className="text-xl font-bold mb-2">Actionable Tips</h3>
            <ReactMarkdown className="whitespace-pre-wrap">
              {tips}
            </ReactMarkdown>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default JobTips;
