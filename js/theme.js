// theme.js
document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = localStorage.getItem('flexora-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Expose toggle function globally
  window.toggleTheme = function() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('flexora-theme', newTheme);
    
    // Update button icons if they exist
    const themeIcons = document.querySelectorAll('.theme-icon');
    themeIcons.forEach(icon => {
      if (newTheme === 'light') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    });
  };
});
