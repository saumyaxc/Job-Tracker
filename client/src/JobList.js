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

  const isDueSoon = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const target = new Date(dueDate);
    const diffInTime = target.getTime() - today.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return diffInDays <= 3 && diffInDays >= 0;
  };


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
                        placeholder="Company"
                        className="w-full px-2 py-1 border rounded-md bg-pink-50 border-pink-300"
                    />
                    <input
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="Position"
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
                        <option>Assessment</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                    </select>

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location (optional)"
                        className="w-full px-2 py-1 border rounded-md bg-pink-50 border-pink-300"
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            Date Applied
                        </label>
                        <input
                            type="date"
                            name="dateApplied"
                            value={formData.dateApplied}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded-md bg-pink-50 border-pink-300"
                        />
                    </div>


                    {/* Show Assessment Due Date only if status is Assessment */}
                    {formData.status === 'Assessment' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            Assessment Due Date
                            </label>
                            <input
                            type="date"
                            name="assessmentDue"
                            value={formData.assessmentDue}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded-md bg-pink-50 border-pink-300"
                            />
                        </div>
                    )}


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
                    <p className="text-sm text-gray-500 dark:text-gray-300">Status: {job.status}</p>
                    {job.location && (
                        <p className="text-sm text-gray-500 dark:text-gray-300">Location: {job.location}</p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-300">Applied on: {job.dateApplied}</p>
                    {job.assessmentDue && (
                        <p className="text-sm text-red-500 dark:text-red-400">
                        Assessment due: {job.assessmentDue}
                        </p>
                    )}
                </div>

                {job.assessmentDueDate && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        📅 Assessment Due: {job.assessmentDueDate}
                        {isDueSoon(job.assessmentDueDate) && (
                        <span className="ml-2 inline-block bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full animate-pulse">
                            🔔 Due Soon!
                        </span>
                        )}
                    </p>
                )}



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
