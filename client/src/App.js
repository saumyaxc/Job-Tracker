// src/App.js

import React from 'react';
import Navbar from './Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-all">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-pink-700 dark:text-pink-300">
            🎯 Job Tracker
          </h1>

          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-200">
              📁 Import Excel File
            </label>
            <input
              type="file"
              accept=".xlsx, .xls"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm bg-pink-50 text-gray-800"
            />
          </div>

          <div className="text-center text-gray-600 dark:text-gray-400 italic">
            No job applications yet. Upload a file to get started!
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
