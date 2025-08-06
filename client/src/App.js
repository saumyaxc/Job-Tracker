// src/App.js

import React, { useState, useEffect } from 'react';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import Navbar from './Navbar';
import JobForm from './JobForm';
import JobList from './JobList';

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [filterStatus, setFilterStatus] = useState('All');

  const addJob = (job) => {
    setJobs((prevJobs) => [...prevJobs, job]);
    console.log('Adding job to list:', job);
  };

  const deleteJob = (indexToRemove) => {
    setJobs((prevJobs) => prevJobs.filter((_, index) => index !== indexToRemove));
  };

  const editJob = (index, updatedJob) => {
    setJobs((prevJobs) => prevJobs.map((job, i) => (i === index ? updatedJob : job)));
  };

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-all">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-pink-700 dark:text-pink-300">
            🎯 Job Tracker
          </h1>

          <div className="text-right mb-4">
          <label className="mr-2 text-gray-700 dark:text-gray-200 font-medium">Filter by Status:</label>
          <div className="relative inline-block w-60">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full appearance-none bg-white dark:bg-gray-800 border border-pink-300 text-gray-800 dark:text-white py-2 px-3 pr-10 rounded-md"
            >
              <option value="All">All</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Assessment">Assessment</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            <ChevronDownIcon
              className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none"
            />
          </div>
          </div>


          {/* Add Job Form */}
          <JobForm onAdd={addJob} />
          <JobList
            jobs={
              filterStatus === 'All'
                ? jobs
                : jobs.filter((job) => job.status === filterStatus)
            }
            onDelete={deleteJob}
            onEdit={editJob}
          />
        </div>
      </div>
    </>
  );
}

export default App;
