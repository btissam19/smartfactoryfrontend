import React, { useState } from 'react';
import { CONFIG } from './config';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const baseURL = CONFIG.BASE_URL;

function LatestJobs() {
  const [job, setJob] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);

  // Function to convert relative time to timestamp
  const parseRelativeTime = (relativeTime) => {
    if (typeof relativeTime !== 'string') return new Date().getTime(); // Return current time if invalid format

    const now = new Date();
    const match = relativeTime.match(/(\d+)\s*(day|days|hour|hours|minute|minutes|second|seconds)\s*ago/);
    if (!match) return now.getTime(); // Return current time if parsing fails

    const [_, amount, unit] = match;
    const value = parseInt(amount, 10);
    let time;
    console.log(_)

    switch (unit) {
      case 'day':
      case 'days':
        time = now.getTime() - value * 24 * 60 * 60 * 1000; // Days in milliseconds
        break;
      case 'hour':
      case 'hours':
        time = now.getTime() - value * 60 * 60 * 1000; // Hours in milliseconds
        break;
      case 'minute':
      case 'minutes':
        time = now.getTime() - value * 60 * 1000; // Minutes in milliseconds
        break;
      case 'second':
      case 'seconds':
        time = now.getTime() - value * 1000; // Seconds in milliseconds
        break;
      default:
        time = now.getTime(); // Default to current time
    }

    return time;
  };

  // Function to handle the API call
  const searchJobs = async () => {
    try {
      // Make a POST request to the backend
      const response = await fetch(`${baseURL}/search_job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job, location }),
      });

      // Parse the JSON response
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Error fetching jobs');
      }

      // Log the raw data to debug
      console.log('Raw job data:', data.google_jobs);

      // Filter and sort jobs by `posted_at`
      const filteredAndSortedJobs = (data.google_jobs || [])
        .filter(jobItem => jobItem.detected_extensions && jobItem.detected_extensions.posted_at)
        .sort((a, b) => {
          const timeA = parseRelativeTime(a.detected_extensions.posted_at);
          const timeB = parseRelativeTime(b.detected_extensions.posted_at);

          // Log parsed times to verify
          console.log('Time A:', timeA, 'Time B:', timeB);

          return timeB - timeA; // Sort in descending order
        });

      setJobs(filteredAndSortedJobs);
      toast.success('Jobs successfully fetched!'); // Show success toast
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error(`Error: ${error.message}`); // Show error toast
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
          className="px-10 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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

              {/* Display detected extensions if `posted_at` exists */}
              <div className="mb-2">
                {jobItem.detected_extensions.posted_at && (
                  <div className="mb-1 text-gray-300">
                    <strong>Posted at:</strong> {jobItem.detected_extensions.posted_at}
                  </div>
                )}
                {Object.entries(jobItem.detected_extensions).map(([key, value], i) => (
                  key !== 'posted_at' && (
                    <div key={i} className="mb-1 text-gray-300">
                      <strong>{key.replace('_', ' ')}:</strong> {value}
                    </div>
                  )
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

      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default LatestJobs;
