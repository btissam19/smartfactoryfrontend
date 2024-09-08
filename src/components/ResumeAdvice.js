import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function ResumeAdvice() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/generate_advices');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAdvice(data.advice_results); // Set the advice results from response
      } catch (error) {
        setError(error.message);
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
    </div>
  );
}

export default ResumeAdvice;
