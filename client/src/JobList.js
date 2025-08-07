import React, { useState } from 'react';

const badgeClass = (status) => {
  const base = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium";
  switch (status) {
    case 'Interview': return `${base} bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200`;
    case 'Assessment': return `${base} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200`;
    case 'Offer': return `${base} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200`;
    case 'Rejected': return `${base} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200`;
    default: return `${base} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200`;
  }
};

const isDueSoon = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0,0,0,0);
  const target = new Date(dueDate);
  const diff = (target - today) / (1000*60*60*24);
  return diff <= 3 && diff >= 0;
};

const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dueDate);
  return target < today;
};


const JobList = ({ jobs, onDelete, onEdit }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    company: '', position: '', status: 'Applied',
    location: '', dateApplied: '', assessmentDueDate: ''
  });

  if (jobs.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-400 italic">No jobs added yet.</p>;
  }

  const startEditing = (index) => {
    setEditingIndex(index);
    setFormData(jobs[index]);
  };
  const cancelEditing = () => {
    setEditingIndex(null);
    setFormData({ company:'', position:'', status:'Applied', location:'', dateApplied:'', assessmentDueDate:'' });
  };
  const toggleCompleted = (idx) => {
    const current = jobs[idx];
    if (!current) return; // guard against weird indexes

    onEdit(idx, {
        ...current,
        assessmentCompleted: !Boolean(current.assessmentCompleted),
    });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const saveEdit = () => { onEdit(editingIndex, formData); cancelEditing(); };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-sm text-gray-600 dark:text-gray-300">
            <th className="px-3 py-2">Company</th>
            <th className="px-3 py-2">Position</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Location</th>
            <th className="px-3 py-2">Date Applied</th>
            <th className="px-3 py-2">Assessment</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            editingIndex === index ? (
              <tr key={index} className="bg-white dark:bg-gray-800 shadow rounded">
                <td className="px-3 py-2">
                  <input name="company" value={formData.company} onChange={handleChange}
                    className="w-full px-2 py-1 border rounded bg-pink-50 border-pink-300" />
                </td>
                <td className="px-3 py-2">
                  <input name="position" value={formData.position} onChange={handleChange}
                    className="w-full px-2 py-1 border rounded bg-pink-50 border-pink-300" />
                </td>
                <td className="px-3 py-2">
                  <select name="status" value={formData.status} onChange={handleChange}
                    className="w-full px-2 py-1 border rounded bg-pink-50 border-pink-300">
                    <option>Applied</option><option>Interview</option>
                    <option>Assessment</option><option>Offer</option><option>Rejected</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input name="location" value={formData.location} onChange={handleChange}
                    className="w-full px-2 py-1 border rounded bg-pink-50 border-pink-300" />
                </td>
                <td className="px-3 py-2">
                  <div>
                    <label className="block text-xs mb-1">Date Applied</label>
                    <input type="date" name="dateApplied" value={formData.dateApplied} onChange={handleChange}
                      className="w-full px-2 py-1 border rounded bg-pink-50 border-pink-300" />
                  </div>
                </td>
                <td className="px-3 py-2">
                  {formData.status === 'Assessment' && (
                    <div>
                      <label className="block text-xs mb-1">Assessment Due</label>
                      <input type="date" name="assessmentDueDate" value={formData.assessmentDueDate || ''} onChange={handleChange}
                        className="w-full px-2 py-1 border rounded bg-pink-50 border-pink-300" />
                    </div>
                  )}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
                    <button onClick={cancelEditing} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">Cancel</button>
                    <div className="flex gap-2">

                        <button
                            onClick={() => startEditing(index)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                            Edit
                        </button>
                        
                        <button
                            onClick={() => onDelete(index)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>

                  </div>
                </td>
              </tr>
            ) : (
              <tr key={index} className="bg-white dark:bg-gray-800 shadow rounded">
                <td className="px-3 py-2">{job.company}</td>
                <td className="px-3 py-2">{job.position}</td>
                <td className="px-3 py-2"><span className={badgeClass(job.status)}>{job.status}</span></td>
                <td className="px-3 py-2">{job.location || '—'}</td>
                <td className="px-3 py-2">{job.dateApplied || '—'}</td>
                <td className="px-3 py-2">
                    {job.assessmentDueDate ? (
                        <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span>{job.assessmentDueDate}</span>

                            {isDueSoon(job.assessmentDueDate, job.assessmentCompleted) && (
                            <span className="inline-block bg-yellow-400 text-yellow-900 text-[10px] px-2 py-0.5 rounded-full">
                                🔔 Due soon
                            </span>
                            )}

                            {isOverdue(job.assessmentDueDate, job.assessmentCompleted) && (
                            <span className="inline-block bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                                🚨 Overdue
                            </span>
                            )}
                        </div>

                        {/* Completed checkbox – only show when status is Assessment */}
                        {job.status === 'Assessment' && (
                            <label className="flex items-center gap-1 text-xs cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={!!job.assessmentCompleted}
                                onChange={() => toggleCompleted(index)}
                                className="h-4 w-4 rounded border-gray-300"
                                aria-label="Mark assessment as completed"
                            />
                            Assessment Completed
                            </label>
                            
                        )}
                        </div>
                    ) : '—'}
                </td>

                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button onClick={() => startEditing(index)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                    <button onClick={() => onDelete(index)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                  </div>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
