document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  const ALLOWED_DAYS = [3, 4, 5, 6];

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;

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

    if (fullName.value.trim().length < 2) { fullName.parentElement.classList.add('invalid'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { email.parentElement.classList.add('invalid'); valid = false; }
    if (!/^[0-9]{10,13}$/.test(phone.value.trim())) { phone.parentElement.classList.add('invalid'); valid = false; }

    if (!birthdate.value) { birthdate.parentElement.classList.add('invalid'); valid = false; }
    else {
      const bd = new Date(birthdate.value); const now = new Date();
      let age = now.getFullYear() - bd.getFullYear();
      const m = now.getMonth() - bd.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < bd.getDate())) age--;
      if (age < 18) { birthdate.parentElement.classList.add('invalid'); valid = false; }
    }

    if (!date.value) { date.parentElement.classList.add('invalid'); valid = false; }
    else {
      const d = new Date(date.value + 'T00:00:00');
      if (!ALLOWED_DAYS.includes(d.getDay())) { date.parentElement.classList.add('invalid'); valid = false; }
      if (date.value < today) { date.parentElement.classList.add('invalid'); valid = false; }
    }

    if (!time.value) { time.parentElement.classList.add('invalid'); valid = false; }
    else { if (Number(time.value.split(':')[0]) < 18) { time.parentElement.classList.add('invalid'); valid = false; } }

    if (!guests.value) { guests.parentElement.classList.add('invalid'); valid = false; }
    if (!agree.checked) { document.getElementById('agreeError').style.display = 'block'; valid = false; }

    if (!valid) return;

    try {
      await fetch('http://localhost:3000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.value.trim(),
          email: email.value.trim(),
          phone: phone.value.trim(),
          instagram: document.getElementById('instagram').value.trim(),
          birthdate: birthdate.value,
          res_date: date.value,
          res_time: time.value,
          guests: guests.value,
          poetry: poetry.checked,
          notes: document.getElementById('notes').value.trim()
        })
      });

      document.getElementById('successMsg').style.display = 'block';
      form.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => { document.getElementById('successMsg').style.display = 'none'; }, 6000);
    } catch (err) {
      alert('Failed to save reservation. Is the server running?');
    }
  });
});