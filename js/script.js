/* ============================
   1.28 COFFEE X COCKTAILS
   General Script
   ============================ */

// ---- MOBILE MENU TOGGLE ----
function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('show');
}

// ---- ON PAGE LOAD ----
document.addEventListener('DOMContentLoaded', () => {
  // Highlight active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Load featured items on homepage
  if (document.getElementById('featuredGrid')) {
    loadFeaturedItems();
  }

  // Load promo preview on homepage
  if (document.getElementById('promoGrid')) {
    loadPromoPreview();
  }
});

// ============================
// FEATURED PRODUCTS
// ============================
function loadFeaturedItems() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  // Pull from menu items (uses versioned getter from menu.js)
  const menu = typeof getMenuItems === 'function' ? getMenuItems() : [];
  const featured = menu.filter(item => item.featured).slice(0, 3); // limit to 3

  if (featured.length === 0) {
    grid.innerHTML = `
      <p style="text-align:center; grid-column:1/-1; color:#888; padding:2rem;">
        No featured items yet.
      </p>
    `;
    return;
  }

  grid.innerHTML = featured.map(item => `
    <div class="card">
      <img src="${item.image}" alt="${item.name}"
           onerror="this.style.display='none'"
           style="height:200px; object-fit:cover; width:100%; display:block;" />
      <div class="card-body">
        ${item.tag ? `<span class="tag">${item.tag}</span>` : ''}
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price">₱${item.price}</p>
      </div>
    </div>
  `).join('');
}

// ============================
// PROMO / EVENTS PREVIEW
// ============================
function loadPromoPreview() {
  const grid = document.getElementById('promoGrid');
  if (!grid) return;

  const promos = JSON.parse(localStorage.getItem('promos')) || [];
  const events = JSON.parse(localStorage.getItem('events')) || [];

  // Empty state
  if (promos.length === 0 && events.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:2.5rem; background:white;
                  border-radius:14px; box-shadow:var(--shadow);">
        <div style="font-size:2.5rem;">✨</div>
        <h3 style="color:var(--forest); font-weight:400; margin:0.5rem 0;">
          New things brewing
        </h3>
        <p style="color:#666;">Follow us on social media for upcoming promos and events.</p>
      </div>
    `;
    return;
  }

  // Combine events + promos, limit to 3
  const combined = [...events, ...promos].slice(0, 3);

  grid.innerHTML = combined.map(p => `
    <div class="card">
      <div class="card-body">
        <span class="tag">${p.date || 'Coming Soon'}</span>
        <h3>${p.title}</h3>
        <p>${p.desc || ''}</p>
      </div>
    </div>
  `).join('');
}