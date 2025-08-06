// src/App.js

import React, { useState } from 'react';
import Navbar from './Navbar';
import JobForm from './JobForm';
import JobList from './JobList';

function App() {
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    setJobs((prevJobs) => [...prevJobs, job]);
    console.log('Adding job to list:', job);
  };

  const deleteJob = (indexToRemove) => {
    setJobs((prevJobs) => prevJobs.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-all">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-pink-700 dark:text-pink-300">
            🎯 Job Tracker
          </h1>

          {/* Add Job Form */}
          <JobForm onAdd={addJob} />
          <JobList jobs={jobs} onDelete={deleteJob} />
        </div>
      </div>
    </>
  );
}

export default App;
