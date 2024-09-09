import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CONFIG } from './config';
const baseURL = CONFIG.BASE_URL;

function ResumeUpload({ onParsedData }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a resume to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${baseURL}/upload_and_process/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("resume uploaded successfully!");
      onParsedData(data);
    } catch (error) {
      toast.error(`Error uploading resume: ${error.message}`);
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="file"
          name="pdf_doc"
          accept=".pdf"
          onChange={handleFileChange}
          className="drop-shadow-md bg-white/10 font-semibold leading-6 text-gray-900 border border-blue-300 py-2 px-4 rounded-2xl block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-400 hover:file:bg-blue-100"
        />
        <button
          type="submit"
          className="bg-blue-500 px-8 rounded-2xl py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          upload CV
        </button>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </form>
  );
}

export default ResumeUpload;
