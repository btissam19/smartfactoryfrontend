// src/components/InterviewQuestions.js
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InterviewQuestions() {
  const [interviewQuestions, setInterviewQuestions] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInterviewQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/generate_interview_questions');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Interview Questions:', data.extracted_info); // Log data
        setInterviewQuestions(data.extracted_info);
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

  if (!interviewQuestions || Object.keys(interviewQuestions).length === 0) {
    return <div>No interview questions available.</div>;
  }

  // Flatten all questions into a single array
  const flattenQuestions = () => {
    let questionsArray = [];
    Object.values(interviewQuestions).forEach(category => {
      if (Array.isArray(category)) {
        questionsArray = questionsArray.concat(category);
      } else if (typeof category === 'object') {
        Object.values(category).forEach(subcategory => {
          if (Array.isArray(subcategory)) {
            questionsArray = questionsArray.concat(subcategory);
          }
        });
      }
    });
    return questionsArray;
  };

  const questionsToDisplay = flattenQuestions();

  return (
    <div className="mt-8 border border-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Interview Questions</h2>
      <div>
        {questionsToDisplay.length > 0 ? (
          <ul>
            {questionsToDisplay.map((question, index) => (
              <li key={index} className="mb-2">
                <p>{question}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
}

export default InterviewQuestions;
