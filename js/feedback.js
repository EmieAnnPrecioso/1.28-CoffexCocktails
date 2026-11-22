/* ============================
   CUSTOMER FEEDBACK SYSTEM
   Now uses Node.js + SQLite
   ============================ */

async function renderReviews() {
  const list = document.getElementById('reviewsList');
  if (!list) return;

  try {
    const response = await fetch('http://localhost:3000/api/reviews');
    const reviews = await response.json();

    list.innerHTML = `<h2 style="text-align:center; color:var(--coffee-dark); margin-bottom:1rem;">What Our Customers Say</h2>` +
      reviews.reverse().map(r => `
        <div class="review-card">
          <div class="stars">${'⭐'.repeat(r.rating)}</div>
          <p>${r.text}</p>
          <p class="reviewer">— ${r.name} <small style="color:#999;">(${r.date})</small></p>
        </div>
      `).join('');
  } catch (error) {
    console.error("Error loading reviews:", error);
    list.innerHTML = '<p style="text-align:center; color:red;">Could not load reviews. Is the server running?</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderReviews();

  const form = document.getElementById('feedbackForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
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
      try {
        await fetch('http://localhost:3000/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.value.trim(),
            rating: parseInt(rating.value),
            text: text.value.trim(),
            date: new Date().toISOString().split('T')[0]
          })
        });

        form.reset();
        document.getElementById('feedbackSuccess').style.display = 'block';
        setTimeout(() => document.getElementById('feedbackSuccess').style.display = 'none', 4000);
        renderReviews();
      } catch (err) {
        console.error(err);
        alert('Failed to submit review. Server might be offline.');
      }
    }
  });
});