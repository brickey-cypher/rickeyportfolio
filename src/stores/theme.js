import { signal } from '@preact/signals';

// Start with a safe default (light mode)
export const theme = signal(false);

// Initialize theme on client mount
export function initTheme() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;

  // Check stored preference first
  const stored = localStorage.getItem('theme');

  if (stored === 'dark' || stored === 'light') {
    theme.value = stored === 'dark';
  } else {
    // Otherwise check system preference
    theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Set the class accordingly
  document.documentElement.classList.toggle('dark', theme.value);
}

// Toggle function
export function toggleTheme() {
  theme.value = !theme.value;

  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme.value);
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', theme.value ? 'dark' : 'light');
  }
}


