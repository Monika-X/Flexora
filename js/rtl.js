// rtl.js
document.addEventListener('DOMContentLoaded', () => {
  const currentDir = localStorage.getItem('flexora-dir') || 'ltr';
  document.documentElement.setAttribute('dir', currentDir);

  const updateToggleText = (dir) => {
    const textSpan = document.getElementById('rtlToggleText');
    if (textSpan) {
      textSpan.innerText = dir === 'rtl' ? 'RTL' : 'LTR';
    }
  };

  // Wait a bit for navbar to inject, then set initial text
  setTimeout(() => {
    updateToggleText(currentDir);
  }, 100);

  // Expose toggle function globally
  window.toggleRTL = function() {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const newDir = isRtl ? 'ltr' : 'rtl';
    
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('flexora-dir', newDir);
    updateToggleText(newDir);
  };
});
