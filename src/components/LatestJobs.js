// src/components/LatestJobs.js
import React from 'react';

const latestJobs = [
  { title: "Software Engineer", company: "Tech Inc.", location: "San Francisco, CA" },
  { title: "Data Analyst", company: "Data Corp", location: "New York, NY" },
  { title: "UX Designer", company: "Design Studio", location: "Austin, TX" }
];

function LatestJobs() {
  return (
    <div className="mt-8 border border-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Latest Job Openings</h2>
      {latestJobs.map((job, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p>{job.company} - {job.location}</p>
        </div>
      ))}
    </div>
  );
}

export default LatestJobs;