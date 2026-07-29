// admin.js
document.addEventListener('DOMContentLoaded', () => {
  // Realistic Mock Data Initialization
  if (!localStorage.getItem('admin_members')) {
    localStorage.setItem('admin_members', JSON.stringify([
      { id: 1, name: 'Sarah Jenkins', plan: 'Premium', status: 'Active', joined: '2025-03-12' },
      { id: 2, name: 'Mike Thompson', plan: 'Basic', status: 'Active', joined: '2026-01-05' },
      { id: 3, name: 'John Doe', plan: 'Premium', status: 'Inactive', joined: '2024-11-20' },
      { id: 4, name: 'Emily Chen', plan: 'Basic', status: 'Active', joined: '2026-06-15' },
      { id: 5, name: 'David Smith', plan: 'Premium', status: 'Active', joined: '2025-08-30' }
    ]));
  }
  
  if (!localStorage.getItem('admin_classes')) {
    localStorage.setItem('admin_classes', JSON.stringify([
      { id: 1, name: 'Yoga Flow', day: 'Today', time: '18:00', instructor: 'Jamie T.', enrolled: 15, capacity: 20 },
      { id: 2, name: 'Spin Studio', day: 'Today', time: '19:30', instructor: 'Alex M.', enrolled: 20, capacity: 20 },
      { id: 3, name: 'HIIT Blast', day: 'Tomorrow', time: '06:00', instructor: 'Marcus R.', enrolled: 12, capacity: 15 },
      { id: 4, name: 'Powerlifting Base', day: 'Tomorrow', time: '17:00', instructor: 'Mike T.', enrolled: 8, capacity: 10 },
      { id: 5, name: 'Mobility Recovery', day: 'Friday', time: '18:00', instructor: 'Jamie T.', enrolled: 10, capacity: 20 }
    ]));
  }

  // Render Members
  const renderMembers = (searchTerm = '') => {
    const memberList = document.getElementById('adminMemberList');
    if (memberList) {
      memberList.innerHTML = '';
      const members = JSON.parse(localStorage.getItem('admin_members'));
      
      const filtered = members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (filtered.length === 0) {
        memberList.innerHTML = '<p class="text-muted" style="padding: 10px;">No members found matching that criteria.</p>';
        return;
      }
      
      filtered.forEach(member => {
        const div = document.createElement('div');
        div.style.padding = '15px';
        div.style.backgroundColor = 'var(--color-bg)';
        div.style.borderRadius = '4px';
        div.style.border = '1px solid var(--color-border)';
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.transition = 'transform 0.2s';
        
        const isInactive = member.status === 'Inactive';
        const badgeClass = isInactive ? 'badge-inactive' : 'badge-active';
        
        div.innerHTML = `
          <div>
            <strong style="font-size: 1.1rem; display: block; margin-bottom: 5px;">${member.name}</strong>
            <span class="text-muted" style="font-size: 0.9rem;"><i class="fas fa-id-card"></i> ${member.plan} Plan &bull; Joined ${member.joined}</span>
          </div>
          <span class="badge ${badgeClass}">${member.status}</span>
        `;
        memberList.appendChild(div);
      });
    }
  };
  renderMembers();

  // Live Search functionality
  const searchInput = document.getElementById('memberSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderMembers(e.target.value);
    });
  }

  // Render Classes
  const renderClasses = () => {
    const classList = document.getElementById('adminClassList');
    if (classList) {
      classList.innerHTML = '';
      const classes = JSON.parse(localStorage.getItem('admin_classes'));
      classes.forEach((c, idx) => {
        const div = document.createElement('div');
        div.style.padding = '15px';
        div.style.backgroundColor = 'var(--color-bg)';
        div.style.borderRadius = '4px';
        div.style.border = '1px solid var(--color-border)';
        
        // If it's a newly added class, animate it in
        if (c.isNew) {
          div.style.animation = 'fadeIn 0.5s ease-out forwards';
          delete c.isNew; // Only animate once
          localStorage.setItem('admin_classes', JSON.stringify(classes));
        }

        const isFull = c.enrolled >= c.capacity;
        const fillPercent = (c.enrolled / c.capacity) * 100;
        const barColor = isFull ? 'var(--color-secondary)' : 'var(--color-primary)';
        
        div.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
            <div>
              <strong style="font-size: 1.1rem; display: block; margin-bottom: 5px; color: var(--color-primary);">${c.name}</strong>
              <span class="text-muted" style="font-size: 0.9rem;"><i class="far fa-clock"></i> ${c.day} at ${c.time} &bull; <i class="fas fa-user"></i> ${c.instructor}</span>
            </div>
            <span class="badge ${isFull ? 'badge-inactive' : 'badge-active'}" style="font-size: 0.8rem;">
              ${c.enrolled}/${c.capacity} Booked
            </span>
          </div>
          <!-- Capacity Bar -->
          <div style="width: 100%; height: 6px; background-color: var(--color-border); border-radius: 3px; overflow: hidden; margin-top: 10px;">
            <div style="height: 100%; width: ${fillPercent}%; background-color: ${barColor}; border-radius: 3px;"></div>
          </div>
        `;
        classList.appendChild(div);
      });
    }
  };
  renderClasses();

  // Add Class Form Logic
  const addClassForm = document.getElementById('addClassForm');
  if (addClassForm) {
    addClassForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = addClassForm.querySelector('button');
      const originalText = btn.innerHTML;
      
      // Loading State
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling...';
      btn.disabled = true;

      setTimeout(() => {
        const className = document.getElementById('className').value;
        const classTime = document.getElementById('classTime').value;
        const classCapacity = document.getElementById('classCapacity').value;
        const classInstructor = document.getElementById('classInstructor').value;
        
        const classes = JSON.parse(localStorage.getItem('admin_classes'));
        classes.unshift({ // Add to top
          id: Date.now(),
          name: className,
          day: 'New',
          time: classTime,
          instructor: classInstructor,
          enrolled: 0,
          capacity: parseInt(classCapacity, 10),
          isNew: true
        });
        
        localStorage.setItem('admin_classes', JSON.stringify(classes));
        
        // Success State
        btn.innerHTML = '<i class="fas fa-check"></i> Added Successfully!';
        btn.classList.remove('pulse-border');
        btn.style.backgroundColor = 'var(--color-primary)';
        btn.style.color = '#121212';
        
        addClassForm.reset();
        renderClasses();

        // Reset Button
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.classList.add('pulse-border');
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 2000);
      }, 600);
    });
  }
});
