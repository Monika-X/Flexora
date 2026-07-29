// form-validation.js
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validation
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (isValid) {
        // Special case for login form
        if (form.id === 'loginForm') {
          const email = document.getElementById('loginEmail').value;
          const pass = document.getElementById('loginPassword').value;
          
          if (email === 'flexora@admin.com' && pass === 'AdminPass123!') {
            window.location.href = '/pages/admin-dashboard.html';
          } else {
            window.location.href = '/pages/user-dashboard.html';
          }
          return;
        }

        // Show success message without reloading
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.style.color = 'var(--color-primary-text)';
        successMsg.style.padding = '10px';
        successMsg.style.marginTop = '10px';
        successMsg.style.border = '1px solid var(--color-primary-text)';
        successMsg.style.borderRadius = '4px';
        successMsg.innerText = 'Submitted successfully! We will get back to you soon.';
        
        // Remove existing success message if any
        const existing = form.querySelector('.success-message');
        if (existing) {
          existing.remove();
        }
        
        form.appendChild(successMsg);
        
        // Reset only the fields
        form.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMsg.remove();
        }, 5000);
      }
    });
  });
});
