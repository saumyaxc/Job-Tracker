import React, { useState } from 'react';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';

const JobForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied',
    location: '',
    dateApplied: '',
    assessmentDue: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const dueDate = new Date(formData.assessmentDueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time component for accurate comparison

    if (formData.assessmentDueDate && dueDate < today) {
        alert("⚠️ Assessment due date cannot be in the past!");
        return;
    }

    if (formData.company && formData.position) {
        onAdd(formData);
        setFormData({
            company: '',
            position: '',
            status: 'Applied',
            location: '',
            dateApplied: new Date().toISOString().split('T')[0],
            assessmentDueDate: ''
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
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
        <div className="relative">
        <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full appearance-none px-3 pr-10 py-2 border rounded-md bg-pink-50 border-pink-300"
        >
            <option>Applied</option>
            <option>Interview</option>
            <option>Assessment</option>
            <option>Offer</option>
            <option>Rejected</option>
        </select>
  <ChevronDownIcon
    className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 pointer-events-none"
  />
</div>

      </div>

      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">Location (optional)</label>
        <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-pink-50 border-pink-300"
        />
        </div>

        <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">Date Applied</label>
        <input
            type="date"
            name="dateApplied"
            value={formData.dateApplied}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-pink-50 border-pink-300"
            required
        />
        </div>

        {/* Show Assessment Due Date ONLY if status === 'Assessment' */}
        {formData.status === 'Assessment' && (
        <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200">Assessment Due Date</label>
            <input
            type="date"
            name="assessmentDueDate"
            value={formData.assessmentDue}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-pink-50 border-pink-300"
            />
        </div>
        )}

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
