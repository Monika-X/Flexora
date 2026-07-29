// navbar.js
const navbarHTML = `
  <nav class="navbar">
    <div class="container">
      <a href="/index.html" class="navbar-brand">FLEXORA</a>
      
      <ul class="navbar-nav" id="navbarNav">
        <li><a href="/index.html" class="nav-link">Home</a></li>
        <li><a href="/pages/home2.html" class="nav-link">home2</a></li>
        <li><a href="/pages/about.html" class="nav-link">About</a></li>
        <li><a href="/pages/services.html" class="nav-link">Services</a></li>
        <li><a href="/pages/gallery.html" class="nav-link">Gallery</a></li>
        <li><a href="/pages/blog.html" class="nav-link">Blog</a></li>
        <li><a href="/pages/contact.html" class="nav-link">Contact</a></li>
      </ul>

      <div class="nav-controls">
        <button class="control-btn" onclick="toggleTheme()" aria-label="Toggle Theme">
          <i class="theme-icon fas fa-sun"></i> <!-- Assuming FontAwesome will be added -->
        </button>
        <button class="control-btn" onclick="toggleRTL()" aria-label="Toggle RTL">
          <span id="rtlToggleText" style="font-size: 1rem; font-weight: bold; font-family: var(--font-body);">LTR</span>
        </button>
        <a href="/pages/signup.html" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.85rem; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Join Flexora</a>
        <div class="profile-dropdown" id="profileDropdown">
          <button class="control-btn" aria-label="User Profile" onclick="document.getElementById('profileDropdown').classList.toggle('active')">
            <i class="fas fa-user-circle"></i>
          </button>
          <div class="profile-dropdown-content">
            <a href="/pages/login.html"><i class="fas fa-sign-in-alt" style="width: 20px;"></i> Login / Sign Up</a>
            <a href="/pages/user-dashboard.html"><i class="fas fa-chart-line" style="width: 20px;"></i> User Dashboard</a>
            <a href="/pages/admin-dashboard.html"><i class="fas fa-cog" style="width: 20px;"></i> Admin Dashboard</a>
          </div>
        </div>
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle Menu">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
  </nav>
`;

const footerHTML = `
  <footer class="footer" style="border-top: 3px solid var(--color-primary);">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <a href="/index.html" class="navbar-brand" style="margin-bottom: 1.5rem; display: inline-block; font-size: 1.8rem; text-decoration: none;">FLEXORA</a>
          <p class="text-muted">Premium fitness experience designed to push your limits and transform your body.</p>
          <div class="social-links" style="margin-top: 1rem; display: inline-flex; gap: 15px;">
            <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="https://twitter.com" target="_blank"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
        
        <div class="footer-col">
          <h4 style="text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem;">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="/pages/about.html">About Us</a></li>
            <li><a href="/pages/services.html">Classes & Services</a></li>
            <li><a href="/pages/gallery.html">Facility Gallery</a></li>
            <li><a href="/pages/home2.html">home2</a></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4 style="text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem;">Support</h4>
          <ul class="footer-links">
            <li><a href="/pages/faq.html">FAQ</a></li>
            <li><a href="/pages/terms-and-conditions.html">Terms & Conditions</a></li>
            <li><a href="/pages/privacy-policy.html">Privacy Policy</a></li>
            <li><a href="/pages/contact.html">Contact Us</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 style="text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem;">Contact Info</h4>
          <ul class="footer-links">
            <li><a href="https://maps.google.com/?q=123+Fitness+Blvd,+Gym+City" target="_blank"><i class="fas fa-map-marker-alt"></i> 123 Fitness Blvd, Gym City</a></li>
            <li><a href="mailto:info@flexora.com"><i class="fas fa-envelope"></i> info@flexora.com</a></li>
            <li><a href="tel:+1234567890"><i class="fas fa-phone"></i> +1 234 567 890</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Flexora. All rights reserved.</p>
      </div>
    </div>
  </footer>
`;

// Only inject if the page doesn't have a specific attribute preventing it
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  if (!body.hasAttribute('data-no-navbar')) {
    // Determine path prefix based on whether we are in pages/ or root
    const isPagesDir = window.location.pathname.includes('/pages/');
    const pathPrefix = isPagesDir ? '../' : './';
    
    // Adjust links dynamically if needed, for now using absolute-like paths or simple relative paths
    const adjustedNav = navbarHTML.replace(/\/pages\//g, pathPrefix + 'pages/').replace(/\/index.html/g, pathPrefix + 'index.html');
    const adjustedFooter = footerHTML.replace(/\/pages\//g, pathPrefix + 'pages/').replace(/\/index.html/g, pathPrefix + 'index.html');
    
    // Create wrapper for nav
    const navWrapper = document.createElement('div');
    navWrapper.innerHTML = adjustedNav;
    body.insertBefore(navWrapper.firstElementChild, body.firstChild);
    
    // Append footer
    const footerWrapper = document.createElement('div');
    footerWrapper.innerHTML = adjustedFooter;
    body.appendChild(footerWrapper.firstElementChild);
    
    // Add padding to body to account for fixed navbar
    body.style.paddingTop = '80px';
    
    // Set active link indicator
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      // Strip out path prefixes just to match the core file name
      const cleanCurrent = currentPath.split('/').pop() || 'index.html';
      const cleanLink = linkPath.split('/').pop();
      if (cleanCurrent === cleanLink) {
        link.classList.add('active');
      }
    });
    
    // Setup mobile menu toggle
    setTimeout(() => {
      const mobileBtn = document.getElementById('mobileMenuBtn');
      const navMenu = document.getElementById('navbarNav');
      if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
          navMenu.classList.toggle('active');
          const icon = mobileBtn.querySelector('i');
          if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            if (icon) {
              icon.classList.remove('fa-bars');
              icon.classList.add('fa-times');
            }
          } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            if (icon) {
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
            }
          }
        });
      }

      // Close dropdown when clicking outside or clicking a link inside
      document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('profileDropdown');
        if (dropdown) {
          // If clicked outside, or clicked on a link inside the dropdown content
          if (!dropdown.contains(e.target) || e.target.closest('.profile-dropdown-content a')) {
            dropdown.classList.remove('active');
          }
        }
      });
    }, 100);
  }
});
