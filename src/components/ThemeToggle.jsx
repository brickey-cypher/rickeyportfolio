import { useSignalEffect, useSignal } from '@preact/signals-react';
import { theme, toggleTheme } from '../stores/theme';

export default function ThemeToggle() {
  // Create a local signal to cause re-render when theme changes
  const localTheme = useSignal(theme.value);

  // Sync local signal with global theme signal
  useSignalEffect(() => {
    localTheme.value = theme.value;
  });

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

