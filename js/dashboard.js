// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
  // Realistic Mock Data Initialization
  if (!localStorage.getItem('user_workouts')) {
    localStorage.setItem('user_workouts', JSON.stringify([
      { id: 1, day: 'Monday', focus: 'Chest & Triceps', exercises: 'Bench Press (4x8), Tricep Pushdowns (3x12), Dips (3xF)', completed: true },
      { id: 2, day: 'Wednesday', focus: 'Back & Biceps', exercises: 'Deadlifts (4x5), Pull-ups (4x8), Barbell Curls (3x10)', completed: false },
      { id: 3, day: 'Friday', focus: 'Legs & Core', exercises: 'Squats (4x8), Lunges (3x12), Planks (3x60s)', completed: false }
    ]));
  }
  if (!localStorage.getItem('user_bookings')) {
    localStorage.setItem('user_bookings', JSON.stringify([
      { class: 'Yoga Flow', date: 'Tomorrow at 06:00 PM' }
    ]));
  }

  // Display Renewal Date
  const renewalElement = document.getElementById('renewalDate');
  if (renewalElement) {
    const renewalDate = new Date();
    renewalDate.setMonth(renewalDate.getMonth() + 1);
    renewalElement.innerText = renewalDate.toLocaleDateString();
  }

  // Render Activity Graph (Streak)
  const activityGraph = document.getElementById('activityGraph');
  if (activityGraph) {
    const days = 14;
    for (let i = 0; i < days; i++) {
      const bar = document.createElement('div');
      bar.className = 'activity-bar';
      // Random heights and active states for realism
      const height = Math.floor(Math.random() * 40) + 10;
      bar.style.height = `${height}px`;
      
      // Make most recent days active to match the "4 day streak" stat chip
      if (i >= days - 4) {
        bar.classList.add('active');
        bar.title = `Workout completed ${days - i} days ago`;
      } else {
        // Randomly set some older ones to active
        if (Math.random() > 0.5) bar.classList.add('active');
      }
      activityGraph.appendChild(bar);
    }
  }

  // Display Workout Plan with Checkboxes
  const updateWorkouts = () => {
    const workoutList = document.getElementById('workoutList');
    if (workoutList) {
      workoutList.innerHTML = '';
      const workouts = JSON.parse(localStorage.getItem('user_workouts'));
      
      workouts.forEach((workout, index) => {
        const li = document.createElement('li');
        li.style.padding = '15px';
        li.style.marginBottom = '10px';
        li.style.backgroundColor = 'var(--color-bg)';
        li.style.borderRadius = '4px';
        li.style.border = '1px solid var(--color-border)';
        li.style.transition = 'all 0.3s ease';
        li.style.display = 'flex';
        li.style.alignItems = 'flex-start';
        li.style.gap = '15px';
        
        if (workout.completed) {
          li.style.opacity = '0.7';
          li.style.borderColor = 'var(--color-primary)';
        }

        li.innerHTML = `
          <div style="margin-top: 3px;">
            <input type="checkbox" id="workout-${workout.id}" ${workout.completed ? 'checked' : ''} style="cursor: pointer; width: 18px; height: 18px; accent-color: var(--color-primary);">
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <label for="workout-${workout.id}" style="color: var(--color-primary); cursor: pointer; font-weight: bold; ${workout.completed ? 'text-decoration: line-through;' : ''}">${workout.day}</label>
              <span style="font-size: 0.9rem; font-weight: bold;">${workout.focus}</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--color-text-muted); ${workout.completed ? 'text-decoration: line-through;' : ''}">${workout.exercises}</div>
          </div>
        `;

        const checkbox = li.querySelector(`#workout-${workout.id}`);
        checkbox.addEventListener('change', (e) => {
          workouts[index].completed = e.target.checked;
          localStorage.setItem('user_workouts', JSON.stringify(workouts));
          // Animate out and re-render
          li.style.transform = 'scale(0.98)';
          setTimeout(() => updateWorkouts(), 150);
        });

        workoutList.appendChild(li);
      });
    }
  };
  updateWorkouts();

  // Handle Class Booking
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const classSelect = document.getElementById('classSelect').value;
      if (!classSelect) return;
      
      const btn = bookingForm.querySelector('button');
      const originalText = btn.innerHTML;
      
      // Loading State
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
      btn.disabled = true;

      setTimeout(() => {
        const bookings = JSON.parse(localStorage.getItem('user_bookings'));
        bookings.unshift({ class: classSelect, date: 'Just Added' }); // Add to top
        localStorage.setItem('user_bookings', JSON.stringify(bookings));
        
        // Success State
        btn.innerHTML = '<i class="fas fa-check"></i> Confirmed!';
        btn.classList.remove('pulse-border');
        btn.style.backgroundColor = 'var(--color-primary)';
        btn.style.color = '#121212';
        
        bookingForm.reset();
        updateBookings();

        // Reset Button
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.classList.add('pulse-border');
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 2000);
      }, 800);
    });
  }

  // Display Bookings
  const updateBookings = () => {
    const bookingsList = document.getElementById('bookingsList');
    if (bookingsList) {
      bookingsList.innerHTML = '';
      const bookings = JSON.parse(localStorage.getItem('user_bookings'));
      if (bookings.length === 0) {
        bookingsList.innerHTML = '<p class="text-muted" style="padding: 10px;">No upcoming classes booked.</p>';
        return;
      }
      bookings.forEach((booking, idx) => {
        const li = document.createElement('li');
        li.style.padding = '12px 15px';
        li.style.marginBottom = '10px';
        li.style.backgroundColor = 'var(--color-bg)';
        li.style.borderRadius = '4px';
        li.style.border = '1px solid var(--color-border)';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        
        // If it's a new booking just added, animate it in
        if (idx === 0 && booking.date === 'Just Added') {
          li.style.animation = 'fadeIn 0.5s ease-out forwards';
        }

        li.innerHTML = `
          <div>
            <strong style="color: var(--color-secondary); display: block; margin-bottom: 4px;">${booking.class.split(' - ')[0]}</strong>
            <span style="font-size: 0.85rem; color: var(--color-text-muted);"><i class="far fa-calendar-alt"></i> ${booking.date}</span>
          </div>
          <button class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.8rem;" onclick="this.parentElement.remove();">Cancel</button>
        `;
        bookingsList.appendChild(li);
      });
    }
  };
  updateBookings();
});
