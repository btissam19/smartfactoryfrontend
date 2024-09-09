import React, { useState } from 'react';
import Header from './components/Header';
import ResumeUpload from './components/ResumeUpload';
import LatestJobs from './components/LatestJobs';
import InterviewQuestions from './components/InterviewQuestions';
import ParsedResume from './components/ParsedResume';
import Chat from './components/Chat';
import CoverLetterGenerator from './components/CoverLetterGenerator';
import ResumeAdvice from './components/ResumeAdvice';
import JobTips from './components/JobTips';
import ResumeMatch from './components/ResumeMatch';
import LatestNews from './components/LatestNews';
import ProcessCv from './components/ProcessCv';

function App() {
  const [parsedData, setParsedData] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);

  const handleParsedData = (data) => {
    setParsedData(data);
    setActiveComponent('parsedResume');
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'processCv':
        return <ProcessCv/>;
      case 'latestJobs':
        return <LatestJobs />;
      case 'interviewQuestions':
        return <InterviewQuestions />;
      case 'coverLetter':
        return <CoverLetterGenerator />;
      case 'resumeAdvice':
        return <ResumeAdvice />;
      case 'jobTips':
        return <JobTips />;
      case 'resumeMatch':
        return <ResumeMatch />;
      case 'latestNews':
        return <LatestNews />;
      case 'parsedResume':
        return parsedData && <ParsedResume data={parsedData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ResumeUpload onParsedData={handleParsedData} />
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button onClick={() => setActiveComponent('processCv')} className="bg-pink-300 px-4 py-2 rounded-md text-sm font-semibold">Process CV</button>
          <button onClick={() => setActiveComponent('latestJobs')} className="bg-blue-500 px-4 py-2 rounded-md text-sm font-semibold">Jobs Opportunities</button>
          <button onClick={() => setActiveComponent('interviewQuestions')} className="bg-green-500 px-4 py-2 rounded-md text-sm font-semibold">Interview Questions</button>
          <button onClick={() => setActiveComponent('coverLetter')} className="bg-purple-500 px-4 py-2 rounded-md text-sm font-semibold">Generate Cover Letter</button>
          <button onClick={() => setActiveComponent('resumeAdvice')} className="bg-red-500 px-4 py-2 rounded-md text-sm font-semibold">Resume Advice</button>
          <button onClick={() => setActiveComponent('jobTips')} className="bg-indigo-500 px-4 py-2 rounded-md text-sm font-semibold">Job Tips</button>
          <button onClick={() => setActiveComponent('resumeMatch')} className="bg-pink-500 px-4 py-2 rounded-md text-sm font-semibold">Resume Match</button>
          <button onClick={() => setActiveComponent('latestNews')} className="bg-teal-500 px-4 py-2 rounded-md text-sm font-semibold">Latest News in IT</button>
        </div>
        <div className="mt-8">
          {renderActiveComponent()}
        </div>
      </main>
      <Chat />
    </div>
  );
}

export default App;