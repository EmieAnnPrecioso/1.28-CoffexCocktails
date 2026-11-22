const API_URL = 'http://localhost:3000/api';

function switchTab(e, tabId) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.admin-tabs button').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  e.target.classList.add('active');
  loadAllTables();
}
function closeModal() { document.getElementById('modal').style.display = 'none'; }

// MENU
async function renderMenuTable() {
  const tbody = document.querySelector('#menuTable tbody');
  if (!tbody) return;
  try {
    const res = await fetch(`${API_URL}/menu`);
    const items = await res.json();
    tbody.innerHTML = items.map(item => `
      <tr>
        <td>${item.name}</td><td>${item.category}</td><td>₱${item.price}</td>
        <td>${item.featured ? '✅' : '—'}</td>
        <td><button onclick="deleteMenuItem(${item.id})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Delete</button></td>
      </tr>
    `).join('');
  } catch (err) { console.error(err); }
}
async function deleteMenuItem(id) {
  if (!confirm('Delete this menu item?')) return;
  await fetch(`${API_URL}/menu/${id}`, { method: 'DELETE' });
  renderMenuTable();
}
function openMenuForm() {
  document.getElementById('modalTitle').textContent = 'Add Menu Item';
  document.getElementById('modalBody').innerHTML = `
    <div class="form-group"><label>Name</label><input id="mName" /></div>
    <div class="form-group"><label>Category</label><input id="mCategory" /></div>
    <div class="form-group"><label>Price (₱)</label><input id="mPrice" type="number" /></div>
    <div class="form-group"><label>Description</label><textarea id="mDesc"></textarea></div>
    <div class="form-group"><label>Image filename</label><input id="mImage" value="assets/placeholder.jpg" /></div>
    <div class="form-group"><label><input type="checkbox" id="mFeatured" /> Featured item</label></div>
    <div class="form-group"><label>Tag</label><input id="mTag" /></div>
  `;
  document.getElementById('modalSave').onclick = async () => {
    const data = {
      name: document.getElementById('mName').value,
      category: document.getElementById('mCategory').value,
      price: parseInt(document.getElementById('mPrice').value) || 0,
      description: document.getElementById('mDesc').value,
      image: document.getElementById('mImage').value,
      featured: document.getElementById('mFeatured').checked,
      tag: document.getElementById('mTag').value
    };
    await fetch(`${API_URL}/menu`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    closeModal(); renderMenuTable();
  };
  document.getElementById('modal').style.display = 'flex';
}

// PROMOTIONS
async function renderPromoTable() {
  const tbody = document.querySelector('#promoTable tbody');
  if (!tbody) return;
  try {
    const res = await fetch(`${API_URL}/promotions`);
    const promos = await res.json();
    tbody.innerHTML = promos.map(p => `
      <tr><td>${p.title}</td><td>${p.schedule}</td><td>${p.description}</td>
      <td><button onclick="deletePromo(${p.id})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Delete</button></td></tr>
    `).join('');
  } catch (err) { console.error(err); }
}
async function deletePromo(id) {
  if (!confirm('Delete this promo?')) return;
  await fetch(`${API_URL}/promotions/${id}`, { method: 'DELETE' });
  renderPromoTable();
}
function openPromoForm() {
  document.getElementById('modalTitle').textContent = 'Add Promotion';
  document.getElementById('modalBody').innerHTML = `
    <div class="form-group"><label>Title</label><input id="pTitle" /></div>
    <div class="form-group"><label>Schedule</label><input id="pSchedule" placeholder="e.g. Every Friday" /></div>
    <div class="form-group"><label>Description</label><textarea id="pDesc"></textarea></div>
  `;
  document.getElementById('modalSave').onclick = async () => {
    const data = {
      title: document.getElementById('pTitle').value,
      schedule: document.getElementById('pSchedule').value,
      description: document.getElementById('pDesc').value
    };
    await fetch(`${API_URL}/promotions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    closeModal(); renderPromoTable();
  };
  document.getElementById('modal').style.display = 'flex';
}

// EVENTS
async function renderEventTable() {
  const tbody = document.querySelector('#eventTable tbody');
  if (!tbody) return;
  try {
    const res = await fetch(`${API_URL}/events`);
    const events = await res.json();
    tbody.innerHTML = events.map(e => `
      <tr><td>${e.title}</td><td>${e.event_date || '—'}</td><td>${e.event_time || '—'}</td>
      <td><button onclick="deleteEvent(${e.id})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Delete</button></td></tr>
    `).join('');
  } catch (err) { console.error(err); }
}
async function deleteEvent(id) {
  if (!confirm('Delete this event?')) return;
  await fetch(`${API_URL}/events/${id}`, { method: 'DELETE' });
  renderEventTable();
}
function openEventForm() {
  document.getElementById('modalTitle').textContent = 'Add Event';
  document.getElementById('modalBody').innerHTML = `
    <div class="form-group"><label>Event Title</label><input id="eTitle" /></div>
    <div class="form-group"><label>Date</label><input id="eDate" type="date" /></div>
    <div class="form-group"><label>Time</label><input id="eTime" type="time" /></div>
  `;
  document.getElementById('modalSave').onclick = async () => {
    const data = {
      title: document.getElementById('eTitle').value,
      event_date: document.getElementById('eDate').value,
      event_time: document.getElementById('eTime').value
    };
    await fetch(`${API_URL}/events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    closeModal(); renderEventTable();
  };
  document.getElementById('modal').style.display = 'flex';
}

// RESERVATIONS / REVIEWS / INQUIRIES
async function renderReservations() {
  const tbody = document.querySelector('#resTable tbody');
  if (!tbody) return;
  try {
    const res = await fetch(`${API_URL}/reservations`);
    const data = await res.json();
    tbody.innerHTML = data.map(r => `
      <tr><td>${r.name}</td><td>${r.email}</td><td>${r.res_date} ${r.res_time}</td><td>${r.guests}</td>
      <td><button onclick="deleteReservation(${r.id})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Delete</button></td></tr>
    `).join('');
  } catch (err) { console.error(err); }
}
async function deleteReservation(id) {
  if (!confirm('Delete this reservation?')) return;
  await fetch(`${API_URL}/reservations/${id}`, { method: 'DELETE' });
  renderReservations();
}

async function renderReviewsTable() {
  const tbody = document.querySelector('#revTable tbody');
  if (!tbody) return;
  try {
    const res = await fetch(`${API_URL}/reviews`);
    const data = await res.json();
    tbody.innerHTML = data.map(r => `
      <tr><td>${r.name}</td><td>${'⭐'.repeat(r.rating)}</td><td>${r.text}</td>
      <td><button onclick="deleteReview(${r.id})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Delete</button></td></tr>
    `).join('');
  } catch (err) { console.error(err); }
}
async function deleteReview(id) {
  if (!confirm('Delete this review?')) return;
  await fetch(`${API_URL}/reviews/${id}`, { method: 'DELETE' });
  renderReviewsTable();
}

async function renderInquiries() {
  const tbody = document.querySelector('#msgTable tbody');
  if (!tbody) return;
  try {
    const res = await fetch(`${API_URL}/inquiries`);
    const data = await res.json();
    tbody.innerHTML = data.map(m => `
      <tr><td>${m.name}</td><td>${m.email}</td><td>${m.message}</td>
      <td><button onclick="deleteInquiry(${m.id})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Delete</button></td></tr>
    `).join('');
  } catch (err) { console.error(err); }
}
async function deleteInquiry(id) {
  if (!confirm('Delete this inquiry?')) return;
  await fetch(`${API_URL}/inquiries/${id}`, { method: 'DELETE' });
  renderInquiries();
}

async function renderSpaceInquiries() {
  const tbody = document.querySelector('#spaceTable tbody');
  if (!tbody) return;
  try {
    const res = await fetch(`${API_URL}/space_inquiries`);
    const data = await res.json();
    tbody.innerHTML = data.map(m => `
      <tr><td>${m.name}</td><td>${m.email}</td><td>${m.event_type}</td><td>${m.event_date}</td><td>${m.message}</td>
      <td><button onclick="deleteSpaceInquiry(${m.id})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Delete</button></td></tr>
    `).join('');
  } catch (err) { console.error(err); }
}
async function deleteSpaceInquiry(id) {
  if (!confirm('Delete this inquiry?')) return;
  await fetch(`${API_URL}/space_inquiries/${id}`, { method: 'DELETE' });
  renderSpaceInquiries();
}

function loadAllTables() {
  renderMenuTable(); renderPromoTable(); renderEventTable();
  renderReservations(); renderReviewsTable(); renderInquiries(); renderSpaceInquiries();
}