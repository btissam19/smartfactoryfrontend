// src/components/InterviewQuestions.js
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactMarkdown from 'react-markdown';
import { CONFIG } from './config';
const baseURL = CONFIG.BASE_URL;

function InterviewQuestions() {
  const [interviewQuestions, setInterviewQuestions] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInterviewQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}/generate_interview_questions`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Interview Questions:', data.questions); // Log data
        setInterviewQuestions(data.questions);
        toast.success("Interview questions fetched successfully!");
      } catch (error) {
        toast.error(`Error fetching interview questions: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewQuestions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!interviewQuestions) {
    return <div>No interview questions available.</div>;
  }

  return (
    <div className="mt-8 border border-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Interview Questions</h2>
      <ReactMarkdown>
        {interviewQuestions}
      </ReactMarkdown>
    </div>
  );
}

export default InterviewQuestions;
