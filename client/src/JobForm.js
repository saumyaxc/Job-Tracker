// src/JobForm.js

import React, { useState } from 'react';

const JobForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
      e.preventDefault(); 
      if (formData.company && formData.position) {
        onAdd(formData); 
        setFormData({ company: '', position: '', status: 'Applied' }); 
        console.log('Submitting job:', formData);
      }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">Company</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md bg-pink-50 border-pink-300"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md bg-pink-50 border-pink-300"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md bg-pink-50 border-pink-300"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
      >
        Add Job
      </button>
    </form>
  );
};

export default JobForm;
