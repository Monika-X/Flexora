// gallery.js
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
        filterBtns.forEach(b => b.classList.add('btn-secondary'));
        
        // Add active class to clicked button
        btn.classList.add('active', 'btn-primary');
        btn.classList.remove('btn-secondary');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Lightbox Logic
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxContent = document.querySelector('.lightbox-content');
  
  if (lightbox && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        const textContent = item.querySelector('span').innerText;
        lightboxContent.innerHTML = `<p>${textContent} Full View</p>`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      lightboxContent.innerHTML = ''; // clear iframe
    });
    
    // Close on outside click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxContent.innerHTML = ''; // clear iframe
        lightboxContent.style.width = ''; // reset width
        lightboxContent.style.padding = ''; // reset padding
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxContent.innerHTML = ''; // clear iframe to stop playing
        lightboxContent.style.width = ''; // reset width
        lightboxContent.style.padding = ''; // reset padding
      }
    });
    
    // Virtual Tour Video Logic
    const tourPlayBtn = document.getElementById('tourPlayBtn');
    if (tourPlayBtn) {
      tourPlayBtn.addEventListener('click', () => {
        // Prepare modal styling for video specifically
        lightboxContent.style.width = '100%';
        lightboxContent.style.maxWidth = '900px';
        lightboxContent.style.padding = '10px'; // Less padding for video
        
        // Using a real gym tour video (e.g. Gold's Gym or similar generic gym tour)
        lightboxContent.innerHTML = `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; width: 100%; border-radius: 8px; margin: 0 auto;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/pWifGjzL8aM?si=qkxQGO8nkZ5ZxHBO&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  }
});
