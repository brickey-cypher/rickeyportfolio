import { signal } from '@preact/signals';

// Detect system preference
const prefersDark = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-color-scheme: dark)').matches
  : false;

// Get stored preference
const stored = typeof localStorage !== 'undefined'
  ? localStorage.getItem('theme')
  : null;

// Signal: true = dark mode, false = light mode
export const theme = signal(stored ? stored === 'dark' : prefersDark);

// **Remove this block to prevent initial class toggle here**
// if (typeof document !== 'undefined') {
//   document.documentElement.classList.toggle('dark', theme.value);
// }

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

