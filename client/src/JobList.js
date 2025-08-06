// src/JobList.js

import React, { useState } from 'react';

const JobList = ({ jobs, onDelete, onEdit }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied',
  });

  const startEditing = (index) => {
    setEditingIndex(index);
    setFormData(jobs[index]);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setFormData({ company: '', position: '', status: 'Applied' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    onEdit(editingIndex, formData);
    cancelEditing();
  }

  if (jobs.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-400 italic">No jobs added yet.</p>;
  }

  return (
    <ul className="space-y-4">
        {jobs.map((job, index) =>
            editingIndex === index ? (
                // Edit Mode
                <li
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow space-y-2"
                >
                <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border rounded-md bg-pink-50 border-pink-300"
                />
                <input
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border rounded-md bg-pink-50 border-pink-300"
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border rounded-md bg-pink-50 border-pink-300"
                >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                </select>

                <div className="flex gap-2">
                    <button
                    onClick={saveEdit}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    >
                    Save
                    </button>
                    <button
                    onClick={cancelEditing}
                    className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500"
                    >
                    Cancel
                    </button>
                </div>
                </li>
            ) : (
                // View Mode
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

                <div className="flex gap-2">
                    <button
                    onClick={() => startEditing(index)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                    ✏️ Edit
                    </button>
                    <button
                    onClick={() => onDelete(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                    >
                    🗑 Delete
                    </button>
                </div>
                </li>
            )
            )}


    </ul>
  );
};

export default JobList;
