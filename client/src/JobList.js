// src/JobList.js

import React from 'react';

const JobList = ({ jobs, onDelete }) => {
  if (jobs.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-400 italic">No jobs added yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {jobs.map((job, index) => (
        <li
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-md shadow flex justify-between items-center"
        >
            <div>
            <p className="font-semibold text-lg text-pink-700 dark:text-pink-300">
                {job.company} – {job.position}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">{job.status}</p>
            </div>

            <button
            onClick={() => onDelete(index)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
            >
            🗑 Delete
            </button>
        </li>
        ))}

    </ul>
  );
};

export default JobList;
