// src/components/Header.js
import React from 'react';
import { FaRegFileAlt, FaQuestionCircle, FaUserAlt, FaBriefcase } from 'react-icons/fa';

function Header() {
  return (
    <header className="bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
          Streamlined Recruitment
        </h1>
        <p className="text-lg leading-8 text-gray-300 mb-4 flex items-start">
          <FaBriefcase className="text-white text-xl mr-3" />
          Enhance your recruitment process and streamline your job application experience with our advanced resume parsing and real-time information system.
        </p>
        <p className="text-lg leading-8 text-gray-300 mb-4 flex items-start">
          <FaUserAlt className="text-white text-xl mr-3" />
          Recruiters can quickly assess candidates' qualifications, while candidates can efficiently manage their applications with ease.
        </p>
        <p className="text-lg leading-8 text-gray-300 mb-4 flex items-start">
          <FaRegFileAlt className="text-white text-xl mr-3" />
           A single upload of your resume can unlocks all functionalities.
        </p>
        <p className="text-lg leading-8 text-gray-300 mb-4 flex items-start">
          <FaQuestionCircle className="text-white text-xl mr-3" />
           Our get awnser to your qustions chat feature provides real-time information. If the first answer doesn’t meet your needs, simply ask your question again to get the most accurate response.
        </p>
      </div>
    </header>
  );
}

export default Header;
