import React, { useState } from 'react';

function LatestJobs() {
  // State to store job title, location, and the search results
  const [job, setJob] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);

  // Function to handle the API call
  const searchJobs = async () => {
    try {
      // Make a POST request to the backend
      const response = await fetch('http://127.0.0.1:8000/search_job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job, location }),
      });

      // Parse the JSON response
      const data = await response.json();

      // Update the jobs state with the results from the backend
      setJobs(data.google_jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    searchJobs();
  };

  return (
    <div className="mt-8 p-8 rounded-lg max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Latest Job Openings</h2>

      {/* Job search form */}
      <form onSubmit={handleSearch} className="flex items-center mb-4 space-x-4">
        <input
          type="text"
          placeholder="Enter job title"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          className="p-2 border-none rounded-md w-full text-black"
        />
        <input
          type="text"
          placeholder="Enter job location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border-none rounded-md w-full text-black"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search Jobs
        </button>
      </form>

      {/* Display the job results */}
      {jobs.length > 0 ? (
        <div className="mt-4">
          {jobs.map((jobItem, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-800 text-white rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{jobItem.title}</h3>
              <p className="text-gray-300 mb-1">{jobItem.company_name}</p>
              <p className="text-gray-300 mb-2">{jobItem.location}</p>
              <div className="flex flex-wrap mb-2">
                {jobItem.detected_extensions.map((ext, i) => (
                  <span key={i} className="bg-gray-600 text-gray-200 px-2 py-1 rounded mr-2">
                    {ext}
                  </span>
                ))}
              </div>
              <p className="text-gray-100 mb-4">{jobItem.description}</p>
              
              {/* Apply Options with Title */}
              <div className="mb-4">
                <p className="font-semibold mb-1">Apply from here:</p>
                <p className="text-blue-400">
                  {jobItem.apply_options.map((option, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && ' - '}
                      <a
                        href={option.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {option.title}
                      </a>
                    </React.Fragment>
                  ))}
                </p>
              </div>

              {index < jobs.length - 1 && <hr className="my-4 border-gray-600" />}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-400">No job results to display</p>
      )}
    </div>
  );
}

export default LatestJobs;
