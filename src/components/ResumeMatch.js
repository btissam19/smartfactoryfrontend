// src/components/JobMatchResults.js
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactMarkdown from 'react-markdown';
import { CONFIG } from './config';
const baseURL = CONFIG.BASE_URL;
function JobMatchResults() {
  const [jobDescription, setJobDescription] = useState('');
  const [matchResults, setMatchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMatchResults = async () => {
    setLoading(true);
    setMatchResults(null); // Clear previous results
    try {
      const response = await fetch(`${baseURL}/compare_resume`, {
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
      if (data['comparison_results']) {
        // Extract JSON content from Markdown code block
        const jsonMatchResults = data['comparison_results'].match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatchResults && jsonMatchResults[1]) {
          const parsedResults = JSON.parse(jsonMatchResults[1]);
          setMatchResults(parsedResults);
          toast.success('Match results retrieved successfully!');
        } else {
          toast.error('Invalid match results format.');
        }
      } else {
        toast.error('No match results returned from the server.');
      }
    } catch (error) {
      toast.error('Error retrieving match results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Job Descreption</h2>
      <textarea
        rows="5"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter job description here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        style={{ color: 'black' }}
      ></textarea>
      <button
        onClick={getMatchResults}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Retrieving...' : 'Get Match Results'}
      </button>
      <div className="mt-4">
        {matchResults && (
          <div className="bg-black text-white p-4 rounded mt-4">
            <h3 className="text-xl font-bold mb-2">Match Results</h3>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">JD Match</h4>
              <p>{matchResults["JD Match"]}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Missing Keywords</h4>
              {Array.isArray(matchResults["MissingKeywords"]) ? (
                <ul>
                  {matchResults["MissingKeywords"].map((keyword, index) => (
                    <li key={index}>- {keyword}</li>
                  ))}
                </ul>
              ) : (
                <p>No missing keywords available.</p>
              )}
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Profile Summary</h4>
              <ReactMarkdown className="whitespace-pre-wrap">
                {matchResults["Profile Summary"]}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default JobMatchResults;
