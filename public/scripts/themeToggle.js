(() => {
  console.log('ThemeToggle script loaded');

  const toggle = document.getElementById('theme-toggle');
  if (!toggle) {
    console.error('Theme toggle button not found');
    return;
  }

  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const html = document.documentElement;

  function updateIcons(isDark) {
    console.log('Updating icons, dark mode:', isDark);
    if (isDark) {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }

  function initTheme() {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);

    console.log('Initializing theme:', { storedTheme, prefersDark, isDark });

    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    updateIcons(isDark);
  }

  toggle.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    console.log('Toggle clicked, dark mode now:', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateIcons(isDark);
  });

  initTheme();
})();
