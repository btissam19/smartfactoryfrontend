// src/components/Header.js
import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Recruitment with  Resume Parsing</h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">Unlock the potential of every application with our advanced resume parser, designed to enhance the speed and accuracy of your hiring decisions.</p>
        <p className="mt-6 text-lg leading-8 text-gray-300">you have to upload your resume just one time and unlock all app functionality .</p>
      </div>
    </header>
  );
}

export default Header;
