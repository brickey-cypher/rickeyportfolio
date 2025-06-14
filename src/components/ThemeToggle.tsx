import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
  }, []);

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-lg hover:scale-110 transition-transform z-50"
    >
      {isDark ? (
        // Moon icon SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 0111.21 3c.2 0 .4 0 .59.03a7 7 0 107.18 9.73z" />
        </svg>
      ) : (
        // Sun icon SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.95 16.95l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.95 7.05l1.42-1.42" />
        </svg>
      )}
    </button>
  );
}
