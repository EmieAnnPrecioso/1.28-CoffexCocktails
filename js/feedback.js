/* ============================
   CUSTOMER FEEDBACK SYSTEM
   ============================ */

function getReviews() {
  const stored = localStorage.getItem('reviews');
  if (stored) return JSON.parse(stored);
  // Default seeded reviews
  const defaults = [
    { id: 1, name: 'Maria S.', rating: 5, text: 'The espresso martini is a must-try! Cozy place and friendly staff.', date: '2025-01-15' },
    { id: 2, name: 'Carlo R.', rating: 5, text: 'Best cocktails in town. Their Friday acoustic nights are amazing.', date: '2025-01-20' },
    { id: 3, name: 'Anna L.', rating: 4, text: 'Great coffee, great vibes. Perfect study spot during the day.', date: '2025-02-01' }
  ];
  localStorage.setItem('reviews', JSON.stringify(defaults));
  return defaults;
}

function saveReviews(reviews) {
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

function renderReviews() {
  const list = document.getElementById('reviewsList');
  if (!list) return;
  const reviews = getReviews();

  list.innerHTML = `<h2 style="text-align:center; color:var(--coffee-dark); margin-bottom:1rem;">What Our Customers Say</h2>` +
    reviews.slice().reverse().map(r => `
      <div class="review-card">
        <div class="stars">${'⭐'.repeat(r.rating)}</div>
        <p>${r.text}</p>
        <p class="reviewer">— ${r.name} <small style="color:#999;">(${r.date})</small></p>
      </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderReviews();

  const form = document.getElementById('feedbackForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('invalid'));

    const name = document.getElementById('reviewerName');
    const rating = document.getElementById('rating');
    const text = document.getElementById('reviewText');

    if (name.value.trim().length < 2) { name.parentElement.classList.add('invalid'); valid = false; }
    if (!rating.value) { rating.parentElement.classList.add('invalid'); valid = false; }
    if (text.value.trim().length < 10) { text.parentElement.classList.add('invalid'); valid = false; }

    if (valid) {
      const reviews = getReviews();
      reviews.push({
        id: Date.now(),
        name: name.value.trim(),
        rating: parseInt(rating.value),
        text: text.value.trim(),
        date: new Date().toISOString().split('T')[0]
      });
      saveReviews(reviews);
      form.reset();
      document.getElementById('feedbackSuccess').style.display = 'block';
      setTimeout(() => document.getElementById('feedbackSuccess').style.display = 'none', 4000);
      renderReviews();
    }
  });
});