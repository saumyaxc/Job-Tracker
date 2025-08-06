import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load mode on first render
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedMode === 'true' || (!savedMode && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  return (
    <header className="bg-pink-200 text-pink-800 dark:bg-gray-800 dark:text-white shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🌸 Job Tracker</h1>

        {/* Toggle Switch */}
        <div className="flex items-center space-x-2">
          <span className="text-sm">☀️</span>
          <button
            onClick={toggleDarkMode}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-600' : 'bg-pink-400'
            }`}
          >
            <span
              className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                isDarkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-sm">🌙</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
