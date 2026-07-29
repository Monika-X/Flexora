// script.js - Main entry point
document.addEventListener('DOMContentLoaded', () => {
  // Ensure font awesome is loaded for icons
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fa);
  }

  // Password Toggle Logic
  window.togglePassword = function(iconElement) {
    const container = iconElement.parentElement;
    const input = container.querySelector('input');
    if (input) {
      if (input.type === 'password') {
        input.type = 'text';
        iconElement.classList.remove('fa-eye');
        iconElement.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        iconElement.classList.remove('fa-eye-slash');
        iconElement.classList.add('fa-eye');
      }
    }
  };

  // Blog Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogPosts = document.querySelectorAll('.blog-post');
  
  if (filterBtns.length > 0 && blogPosts.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class on buttons
        filterBtns.forEach(b => {
          b.classList.remove('btn-primary', 'active');
          b.classList.add('btn-secondary');
        });
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary', 'active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Filter posts
        blogPosts.forEach(post => {
          // If 'all' is selected or the post's category matches the filter, show it
          if (filter === 'all' || post.getAttribute('data-category').toLowerCase() === filter.toLowerCase()) {
            post.style.display = ''; // Reset display to default (grid/flex depending on css)
          } else {
            post.style.display = 'none';
          }
        });
      });
    });
  }
  // Login Form Logic
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      if (email === 'flexora@admin.com' && password === 'AdminPass123!') {
        window.location.href = 'admin-dashboard.html';
      } else {
        // Any other non-empty credentials act as a regular user for demonstration
        if (email && password) {
          window.location.href = 'user-dashboard.html';
        }
      }
    });
  }
});
