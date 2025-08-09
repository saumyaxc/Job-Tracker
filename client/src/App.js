// src/App.js

import React, { useState, useEffect } from 'react';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';

import Navbar from './Navbar';
import JobForm from './JobForm';
import JobList from './JobList';
import AddJobModal from './AddJobModal';
import StatsBar from './StatsBar';

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [filterStatus, setFilterStatus] = useState('All');

  const [showAdd, setShowAdd] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

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

  const matchesSearch = (job, q) => {
    if (!q?.trim()) return true;
    const s = q.trim().toLowerCase();
    return (
      job.company?.toLowerCase().includes(s) ||
      job.position?.toLowerCase().includes(s)
      // add location too if you want:
      // || job.location?.toLowerCase().includes(s)
    );
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (filterStatus === 'All' || job.status === filterStatus) &&
      matchesSearch(job, searchTerm)
  );

  const statusCounts = jobs.reduce(
    (acc, j) => {
      acc.total += 1;
      acc[j.status] = (acc[j.status] || 0) + 1;

      // due soon / overdue (only if Assessment and not completed)
      if (j.status === 'Assessment' && j.assessmentDueDate && !j.assessmentCompleted) {
        const today = new Date(); today.setHours(0,0,0,0);
        const d = new Date(j.assessmentDueDate);
        const diff = (d - today) / (1000*60*60*24);
        if (diff < 0) acc.overdue += 1;
        if (diff >= 0 && diff <= 3) acc.dueSoon += 1;
      }

      if (j.assessmentCompleted) acc.completedAssessments += 1;
      return acc;
    },
    {
      total: 0,
      Applied: 0,
      Interview: 0,
      Assessment: 0,
      Offer: 0,
      Rejected: 0,
      dueSoon: 0,
      overdue: 0,
      completedAssessments: 0,
    }
  );


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-all">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-8 text-gray-800 dark:text-gray-100">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-pink-700 dark:text-pink-300">
            🎯 Job Tracker
          </h1>

           <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            {/* Left: Add button */}
            <button
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
            >
              <PlusIcon className="w-5 h-5" />
              Add Job
            </button>

            {/* Right: Filter */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search company or position..."
                  className="w-64 pl-10 pr-3 py-2 rounded-md border border-pink-300 bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  aria-label="Search jobs"
                />
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="text-right">
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
                  className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Add Job Form */}
          <AddJobModal open={showAdd} onClose={() => setShowAdd(false)}>
            <JobForm onAdd={(job) => { addJob(job); setShowAdd(false); }} />
          </AddJobModal>

          <StatsBar stats={statusCounts} />

          <JobList
            jobs={filteredJobs}
            onDelete={deleteJob}
            onEdit={editJob}
            query={searchTerm}
          />

        </div>
      </div>
    </>
  );
}

export default App;
