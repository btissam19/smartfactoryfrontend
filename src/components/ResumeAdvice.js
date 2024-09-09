import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CONFIG } from './config';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const baseURL = CONFIG.BASE_URL;

function ResumeAdvice() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await fetch(`${baseURL}/generate_advices`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAdvice(data.advice_results); // Set the advice results from response
        toast.success('Advice successfully loaded!'); // Show success toast
      } catch (error) {
        setError(error.message);
        toast.error(`Error: ${error.message}`); // Show error toast
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, []);

  if (loading) return <p>Loading advice...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Resume Advice</h2>
      <ReactMarkdown className="text-white">{advice}</ReactMarkdown>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default ResumeAdvice;
