import { useEffect, useState } from 'react';
import { theme, toggleTheme, initTheme } from '../stores/theme';
import { useSignalEffect, useSignal } from '@preact/signals-react';

export default function ThemeToggle() {
  const localTheme = useSignal(theme.value);

  // Run initTheme once on client mount
  useEffect(() => {
    initTheme();
  }, []);

  // Sync local signal with global theme signal
  useSignalEffect(() => {
    localTheme.value = theme.value;
  });

  // Mounted flag to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder button while waiting for hydration
    return (
      <button
        disabled
        className="relative z-30 w-14 h-8 rounded-full flex items-center px-1 bg-gray-300 dark:bg-gray-700"
        aria-label="Toggle Theme"
      >
        <div className="relative w-6 h-6 rounded-full shadow-md bg-gray-500" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative z-30 w-14 h-8 rounded-full flex items-center px-1 transition-colors duration-300
                 bg-gray-300 dark:bg-gray-700 focus:outline-none"
      aria-label="Toggle Theme"
      aria-pressed={localTheme.value}
    >
      <div
        className={`relative w-6 h-6 rounded-full shadow-md transform transition-transform duration-300
                    ${localTheme.value ? 'translate-x-6 bg-yellow-300' : 'translate-x-0 bg-blue-500'}`}
      >
        <span className="absolute left-1 top-1 text-xs">
          {localTheme.value ? '☀️' : '🌙'}
        </span>
      </div>
    </button>
  );
}




