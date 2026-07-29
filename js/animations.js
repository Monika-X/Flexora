// animations.js
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll reveals
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after revealing to prevent refiring
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Number Counters Logic
  const counterElements = document.querySelectorAll('.stat-counter');
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));

  function startCounter(el) {
    const target = +el.getAttribute('data-target');
    const duration = 2000; // ms
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const progress = currentTime - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      const currentVal = Math.floor(easeProgress * target);
      // Format number with commas
      el.innerText = currentVal.toLocaleString();

      if (progress < duration) {
        requestAnimationFrame(animation);
      } else {
        el.innerText = target.toLocaleString();
        
        // Add optional suffix if defined
        const suffix = el.getAttribute('data-suffix');
        if(suffix) el.innerText += suffix;
      }
    }
    
    requestAnimationFrame(animation);
  }
});
