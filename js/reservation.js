/* ============================
   COCKTAIL RESERVATION
   Enforces: 18+, Wed-Sat only, 6PM+, max 8, agreement
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  // Set min date to today
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  // Filter allowed weekdays (Wed=3, Thu=4, Fri=5, Sat=6)
  const ALLOWED_DAYS = [3, 4, 5, 6];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Reset
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('invalid'));
    document.getElementById('agreeError').style.display = 'none';

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const birthdate = document.getElementById('birthdate');
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    const guests = document.getElementById('guests');
    const agree = document.getElementById('agree');
    const poetry = document.getElementById('poetry');

    // ---- Name ----
    if (fullName.value.trim().length < 2) {
      fullName.parentElement.classList.add('invalid'); valid = false;
    }

    // ---- Email ----
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.parentElement.classList.add('invalid'); valid = false;
    }

    // ---- Phone ----
    if (!/^[0-9]{10,13}$/.test(phone.value.trim())) {
      phone.parentElement.classList.add('invalid'); valid = false;
    }

    // ---- Age Check (18+) ----
    if (!birthdate.value) {
      birthdate.parentElement.classList.add('invalid'); valid = false;
    } else {
      const bd = new Date(birthdate.value);
      const now = new Date();
      let age = now.getFullYear() - bd.getFullYear();
      const m = now.getMonth() - bd.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < bd.getDate())) age--;
      if (age < 18) {
        birthdate.parentElement.classList.add('invalid'); valid = false;
        birthdate.parentElement.querySelector('.error').textContent =
          'You must be at least 18 years old to reserve the cocktail bar.';
      }
    }

    // ---- Day of Week Check ----
    if (!date.value) {
      date.parentElement.classList.add('invalid'); valid = false;
    } else {
      const d = new Date(date.value + 'T00:00:00');
      const day = d.getDay(); // 0=Sun ... 6=Sat
      if (!ALLOWED_DAYS.includes(day)) {
        date.parentElement.classList.add('invalid'); valid = false;
        date.parentElement.querySelector('.error').textContent =
          'Cocktail bar is only available Wed, Thu, Fri, or Sat.';
      }
      if (date.value < today) {
        date.parentElement.classList.add('invalid'); valid = false;
        date.parentElement.querySelector('.error').textContent =
          'Please pick a future date.';
      }
    }

    // ---- Time Check (6PM+) ----
    if (!time.value) {
      time.parentElement.classList.add('invalid'); valid = false;
    } else {
      const [h, m] = time.value.split(':').map(Number);
      if (h < 18) {
        time.parentElement.classList.add('invalid'); valid = false;
        time.parentElement.querySelector('.error').textContent =
          'Cocktail reservations start at 6:00 PM.';
      }
    }

    // ---- Guests ----
    if (!guests.value) {
      guests.parentElement.classList.add('invalid'); valid = false;
    }

    // ---- Agreement ----
    if (!agree.checked) {
      document.getElementById('agreeError').style.display = 'block';
      valid = false;
    }

    if (!valid) {
      // Scroll to first error
      const firstError = document.querySelector('.form-group.invalid, #agreeError[style*="block"]');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // ---- SAVE ----
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.push({
      id: Date.now(),
      type: 'cocktail',
      name: fullName.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      instagram: document.getElementById('instagram').value.trim(),
      birthdate: birthdate.value,
      date: date.value,
      time: time.value,
      guests: guests.value,
      poetry: poetry.checked,
      notes: document.getElementById('notes').value.trim(),
      submitted: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('reservations', JSON.stringify(reservations));

    document.getElementById('successMsg').style.display = 'block';
    form.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      document.getElementById('successMsg').style.display = 'none';
    }, 6000);
  });
});