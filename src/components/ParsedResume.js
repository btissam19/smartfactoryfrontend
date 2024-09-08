// src/components/ParsedResume.js
import React from 'react';

function ParsedResume({ data }) {
  const renderData = (obj) => {
    return Object.entries(obj).map(([key, value]) => (
      <div key={key} className="mb-2">
        <strong>{key}: </strong>
        {typeof value === 'object' ? renderData(value) : value}
      </div>
    ));
  };

  return (
    <div className="mt-8 border border-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Parsed Resume Data</h2>
      {renderData(data)}
    </div>
  );
}

export default ParsedResume;

/* Add any custom styles here */