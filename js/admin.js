/* ============================
   ADMIN DASHBOARD
   1.28 Coffee x Cocktails
   Uses localStorage as mock DB
   ============================ */

// ---- TAB SWITCHING ----
function switchTab(e, tabId) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.admin-tabs button').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  e.target.classList.add('active');
  loadAllTables();
}

// ============================================
// MENU MANAGEMENT
// ============================================
function renderMenuTable() {
  const tbody = document.querySelector('#menuTable tbody');
  if (!tbody) return;
  const items = getMenuItems();

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:#888;">
      No menu items yet. Click "+ Add New Item" to create one.
    </td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>₱${item.price}</td>
      <td>${item.featured ? '✅' : '—'}</td>
      <td>
        <button class="edit" onclick="editMenuItem(${item.id})">Edit</button>
        <button onclick="deleteMenuItem(${item.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function deleteMenuItem(id) {
  if (!confirm('Delete this menu item?')) return;
  const items = getMenuItems().filter(i => i.id !== id);
  saveMenuItems(items);
  renderMenuTable();
}

let editingMenuId = null;

function openMenuForm(item = null) {
  editingMenuId = item ? item.id : null;
  document.getElementById('modalTitle').textContent = item ? 'Edit Menu Item' : 'Add Menu Item';
  document.getElementById('modalBody').innerHTML = `
    <div class="form-group"><label>Name</label><input id="mName" value="${item?.name || ''}" /></div>
    <div class="form-group"><label>Category</label>
      <select id="mCategory">
        <optgroup label="Food">
          <option value="Rice Bowls" ${item?.category === 'Rice Bowls' ? 'selected' : ''}>Rice Bowls</option>
          <option value="Nibblers" ${item?.category === 'Nibblers' ? 'selected' : ''}>Nibblers</option>
          <option value="Pasta" ${item?.category === 'Pasta' ? 'selected' : ''}>Pasta</option>
          <option value="All-Day Breakfast" ${item?.category === 'All-Day Breakfast' ? 'selected' : ''}>All-Day Breakfast</option>
          <option value="Toasties" ${item?.category === 'Toasties' ? 'selected' : ''}>Toasties</option>
          <option value="Kitchen Extras" ${item?.category === 'Kitchen Extras' ? 'selected' : ''}>Kitchen Extras</option>
        </optgroup>
        <optgroup label="Drinks">
          <option value="Espresso Bar" ${item?.category === 'Espresso Bar' ? 'selected' : ''}>Espresso Bar</option>
          <option value="Brewed" ${item?.category === 'Brewed' ? 'selected' : ''}>Brewed</option>
          <option value="Non-Coffee & Tea" ${item?.category === 'Non-Coffee & Tea' ? 'selected' : ''}>Non-Coffee & Tea</option>
          <option value="Barista Blend" ${item?.category === 'Barista Blend' ? 'selected' : ''}>Barista Blend</option>
        </optgroup>
        <optgroup label="Reservation-Only">
          <option value="Cocktail" ${item?.category === 'Cocktail' ? 'selected' : ''}>Cocktail (Reservation-Only)</option>
        </optgroup>
      </select>
    </div>
    <div class="form-group"><label>Price (₱)</label><input id="mPrice" type="number" value="${item?.price || ''}" /></div>
    <div class="form-group"><label>Description</label><textarea id="mDesc">${item?.description || ''}</textarea></div>
    <div class="form-group"><label>Image filename</label><input id="mImage" value="${item?.image || 'assets/placeholder.jpg'}" /></div>
    <div class="form-group"><label><input type="checkbox" id="mFeatured" ${item?.featured ? 'checked' : ''} /> Featured item</label></div>
    <div class="form-group"><label>Tag</label><input id="mTag" value="${item?.tag || ''}" /></div>
  `;
  document.getElementById('modalSave').onclick = saveMenuItem;
  document.getElementById('modal').style.display = 'flex';
}

function saveMenuItem() {
  const name = document.getElementById('mName').value.trim();
  if (!name) return alert('Name is required.');

  const items = getMenuItems();
  const data = {
    name,
    category: document.getElementById('mCategory').value,
    price: parseInt(document.getElementById('mPrice').value) || 0,
    description: document.getElementById('mDesc').value.trim(),
    image: document.getElementById('mImage').value.trim(),
    featured: document.getElementById('mFeatured').checked,
    tag: document.getElementById('mTag').value.trim()
  };

  if (editingMenuId) {
    const idx = items.findIndex(i => i.id === editingMenuId);
    items[idx] = { ...items[idx], ...data };
  } else {
    data.id = Date.now();
    items.push(data);
  }

  saveMenuItems(items);
  closeModal();
  renderMenuTable();
}

function editMenuItem(id) {
  const item = getMenuItems().find(i => i.id === id);
  if (item) openMenuForm(item);
}

// ============================================
// PROMOTIONS
// ============================================
function getPromos() {
  const stored = localStorage.getItem('promos');
  if (stored !== null) return JSON.parse(stored);
  localStorage.setItem('promos', JSON.stringify([]));
  return [];
}
function savePromos(p) { localStorage.setItem('promos', JSON.stringify(p)); }

function renderPromoTable() {
  const tbody = document.querySelector('#promoTable tbody');
  if (!tbody) return;
  const promos = getPromos();
  if (promos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:2rem; color:#888;">
      No promotions yet. Click "+ Add Promotion" to create one.
    </td></tr>`;
    return;
  }
  tbody.innerHTML = promos.map(p => `
    <tr>
      <td>${p.title}</td>
      <td>${p.date}</td>
      <td>${p.desc}</td>
      <td>
        <button class="edit" onclick="editPromo(${p.id})">Edit</button>
        <button onclick="deletePromo(${p.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

let editingPromoId = null;
function openPromoForm(p = null) {
  editingPromoId = p ? p.id : null;
  document.getElementById('modalTitle').textContent = p ? 'Edit Promotion' : 'Add Promotion';
  document.getElementById('modalBody').innerHTML = `
    <div class="form-group"><label>Title</label><input id="pTitle" value="${p?.title || ''}" /></div>
    <div class="form-group"><label>Schedule</label><input id="pDate" value="${p?.date || ''}" /></div>
    <div class="form-group"><label>Description</label><textarea id="pDesc">${p?.desc || ''}</textarea></div>
  `;
  document.getElementById('modalSave').onclick = savePromo;
  document.getElementById('modal').style.display = 'flex';
}
function savePromo() {
  const title = document.getElementById('pTitle').value.trim();
  if (!title) return alert('Title required');
  const promos = getPromos();
  const data = {
    title,
    date: document.getElementById('pDate').value.trim(),
    desc: document.getElementById('pDesc').value.trim()
  };
  if (editingPromoId) {
    const idx = promos.findIndex(p => p.id === editingPromoId);
    promos[idx] = { ...promos[idx], ...data };
  } else {
    data.id = Date.now();
    promos.push(data);
  }
  savePromos(promos);
  closeModal();
  renderPromoTable();
}
function editPromo(id) { openPromoForm(getPromos().find(p => p.id === id)); }
function deletePromo(id) {
  if (!confirm('Delete this promo?')) return;
  savePromos(getPromos().filter(p => p.id !== id));
  renderPromoTable();
}

// ============================================
// EVENTS
// ============================================
function getEvents() {
  const stored = localStorage.getItem('events');
  if (stored !== null) return JSON.parse(stored);
  localStorage.setItem('events', JSON.stringify([]));
  return [];
}
function saveEvents(e) { localStorage.setItem('events', JSON.stringify(e)); }

function renderEventTable() {
  const tbody = document.querySelector('#eventTable tbody');
  if (!tbody) return;
  const events = getEvents();
  if (events.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:2rem; color:#888;">
      No events added yet. Click "+ Add Event" to create one.
    </td></tr>`;
    return;
  }
  tbody.innerHTML = events.map(e => `
    <tr>
      <td>${e.title}</td>
      <td>${e.date || '—'}</td>
      <td>${e.time || '—'}</td>
      <td>
        <button class="edit" onclick="editEvent(${e.id})">Edit</button>
        <button onclick="deleteEvent(${e.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

let editingEventId = null;
function openEventForm(e = null) {
  editingEventId = e ? e.id : null;
  document.getElementById('modalTitle').textContent = e ? 'Edit Event' : 'Add Event';
  document.getElementById('modalBody').innerHTML = `
    <div class="form-group"><label>Event Title</label><input id="eTitle" value="${e?.title || ''}" /></div>
    <div class="form-group"><label>Date</label><input id="eDate" type="date" value="${e?.date || ''}" /></div>
    <div class="form-group"><label>Time</label><input id="eTime" type="time" value="${e?.time || ''}" /></div>
  `;
  document.getElementById('modalSave').onclick = saveEvent;
  document.getElementById('modal').style.display = 'flex';
}
function saveEvent() {
  const title = document.getElementById('eTitle').value.trim();
  if (!title) return alert('Title required');
  const events = getEvents();
  const data = {
    title,
    date: document.getElementById('eDate').value,
    time: document.getElementById('eTime').value
  };
  if (editingEventId) {
    const idx = events.findIndex(e => e.id === editingEventId);
    events[idx] = { ...events[idx], ...data };
  } else {
    data.id = Date.now();
    events.push(data);
  }
  saveEvents(events);
  closeModal();
  renderEventTable();
}
function editEvent(id) { openEventForm(getEvents().find(e => e.id === id)); }
function deleteEvent(id) {
  if (!confirm('Delete this event?')) return;
  saveEvents(getEvents().filter(e => e.id !== id));
  renderEventTable();
}

// ============================================
// RESERVATIONS (Cocktail Bar)
// ============================================
function renderReservations() {
  const tbody = document.querySelector('#resTable tbody');
  if (!tbody) return;
  const res = JSON.parse(localStorage.getItem('reservations')) || [];

  if (res.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:#888;">
      No reservations yet.
    </td></tr>`;
    return;
  }

  tbody.innerHTML = res.map(r => {
    let age = '—';
    if (r.birthdate) {
      const bd = new Date(r.birthdate), now = new Date();
      age = now.getFullYear() - bd.getFullYear();
      const m = now.getMonth() - bd.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < bd.getDate())) age--;
    }
    return `
      <tr>
        <td>${r.name}<br><small style="color:#888;">${r.instagram || ''}</small></td>
        <td>${r.email}<br><small>${r.phone}</small></td>
        <td>${r.date}<br><small>${r.time}</small></td>
        <td>${r.guests}</td>
        <td>${age} yrs</td>
        <td>${r.poetry ? '📖 Yes' : '—'}</td>
        <td><button onclick="deleteReservation(${r.id})">Delete</button></td>
      </tr>
    `;
  }).join('');
}

function deleteReservation(id) {
  if (!confirm('Delete this reservation?')) return;
  const res = JSON.parse(localStorage.getItem('reservations')).filter(r => r.id !== id);
  localStorage.setItem('reservations', JSON.stringify(res));
  renderReservations();
}

// ============================================
// REVIEWS MODERATION
// ============================================
function renderReviewsTable() {
  const tbody = document.querySelector('#revTable tbody');
  if (!tbody) return;
  const revs = JSON.parse(localStorage.getItem('reviews')) || [];
  if (revs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:2rem; color:#888;">
      No reviews yet.
    </td></tr>`;
    return;
  }
  tbody.innerHTML = revs.map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${'⭐'.repeat(r.rating)}</td>
      <td>${r.text}</td>
      <td><button onclick="deleteReview(${r.id})">Delete</button></td>
    </tr>
  `).join('');
}

function deleteReview(id) {
  if (!confirm('Delete this review?')) return;
  const revs = JSON.parse(localStorage.getItem('reviews')).filter(r => r.id !== id);
  localStorage.setItem('reviews', JSON.stringify(revs));
  renderReviewsTable();
}

// ============================================
// INQUIRIES (contact messages)
// ============================================
function renderInquiries() {
  const tbody = document.querySelector('#msgTable tbody');
  if (!tbody) return;
  const msgs = JSON.parse(localStorage.getItem('inquiries')) || [];
  if (msgs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:2rem; color:#888;">
      No inquiries yet.
    </td></tr>`;
    return;
  }
  tbody.innerHTML = msgs.map(m => `
    <tr>
      <td>${m.name}</td>
      <td>${m.email}</td>
      <td>${m.message}</td>
      <td><button onclick="deleteInquiry(${m.id})">Delete</button></td>
    </tr>
  `).join('');
}

function deleteInquiry(id) {
  if (!confirm('Delete this inquiry?')) return;
  const msgs = JSON.parse(localStorage.getItem('inquiries')).filter(m => m.id !== id);
  localStorage.setItem('inquiries', JSON.stringify(msgs));
  renderInquiries();
}

// ============================================
// EVENT HOSTING INQUIRIES (coffee cart / space rental)
// ============================================
function renderSpaceInquiries() {
  const tbody = document.querySelector('#spaceTable tbody');
  if (!tbody) return;
  const msgs = JSON.parse(localStorage.getItem('spaceInquiries')) || [];
  if (msgs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:#888;">
      No event hosting inquiries yet.
    </td></tr>`;
    return;
  }
  tbody.innerHTML = msgs.map(m => `
    <tr>
      <td>${m.name}</td>
      <td>${m.email}<br><small>${m.phone || ''}</small></td>
      <td>${m.eventType}</td>
      <td>${m.date || '—'}</td>
      <td>${m.message}</td>
      <td><button onclick="deleteSpaceInquiry(${m.id})">Delete</button></td>
    </tr>
  `).join('');
}

function deleteSpaceInquiry(id) {
  if (!confirm('Delete this inquiry?')) return;
  const msgs = JSON.parse(localStorage.getItem('spaceInquiries')).filter(m => m.id !== id);
  localStorage.setItem('spaceInquiries', JSON.stringify(msgs));
  renderSpaceInquiries();
}

// ============================================
// MODAL + LOAD
// ============================================
function closeModal() {
  document.getElementById('modal').style.display = 'none';
  editingMenuId = null;
  editingPromoId = null;
  editingEventId = null;
}

function loadAllTables() {
  renderMenuTable();
  renderPromoTable();
  renderEventTable();
  renderReservations();
  renderReviewsTable();
  renderInquiries();
  renderSpaceInquiries();
}

document.addEventListener('DOMContentLoaded', loadAllTables);