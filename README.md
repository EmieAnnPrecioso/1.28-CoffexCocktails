# 1.28 Coffee x Cocktails

## Project Overview
This website was developed by BSIS 3rd year students (Group 4, BSIS-3A) as part of their Web Development course at the Technological University of the Philippines – Manila. It showcases the menu, cocktail bar reservations, events, and contact information of **1.28 Coffee x Cocktails** — a cozy neighborhood café in Paco, Manila by day, and a reservation-only cocktail bar by night.

## Purpose
To provide an online presence for 1.28 Coffee x Cocktails, promote its day-to-night café-and-bar concept, and allow customers to explore the menu, read and leave reviews, send inquiries, and reserve cocktail bar slots directly through the site. Café staff can also manage the menu, promotions, events, and customer submissions through a login-protected admin dashboard.

## Team Members & Roles
- **Emie Ann L. Precioso** – Project Manager (task allocation, progress monitoring, final output, and deployment to Render)
- **Niah Annelle M. Makinano** – Designer & Researcher
- **Dan Antonio Pedragorda** – Developer
- **Joseph Kristian D. De Leon** – Researcher & Developer
- **Sean Andrei B. Taraya** – Developer

## Tools Used
- **Frontend:** HTML5, CSS3, JavaScript (vanilla)
- **Backend:** Node.js, Express.js (with `cors`)
- **Database:** SQLite (`sqlite3` package)
- **Editor & Tools:** Visual Studio Code, npm
- **Version Control:** Git & GitHub
- **Hosting:** Render (Node.js web service)
- **Third-party Services:** Google Fonts (Fredoka, Caveat), Google Maps embed

## Site Structure
- `server.js` – Express backend: REST API, SQLite setup, menu seed data, admin login
- `package.json` – Dependencies and start script
- `128_coffee.db` – SQLite database (created and seeded automatically on first run)
- `public/index.html` – Homepage (hero, featured picks, promo, gallery strip, hours, map)
- `public/about.html` – About the café and visitor information
- `public/menu.html` – Full menu with live search and category filter
- `public/cocktail-bar.html` – Evening cocktail service, weekly programming, and house rules
- `public/events.html` – Weekly activities, events/promotions, and event-hosting info
- `public/gallery.html` – Photo gallery of the café and bar
- `public/reservation.html` – Cocktail bar reservation form (18+)
- `public/contact.html` – Contact form, Event Hosting form, hours, and Google Map
- `public/feedback.html` – Customer reviews and ratings
- `public/admin.html` – Admin dashboard (staff login required)
- `public/assets/` – Logo and café photos
- `public/css/style.css` – Site-wide stylesheet
- `public/js/` – `script.js`, `menu.js`, `reservation.js`, `feedback.js`, `admin.js`

## Key Features
- **Dynamic menu** loaded from the database, with live keyword search and category filter (10 categories, 53 seeded items)
- **Cocktail bar reservation form** with validation: guests must be 18+, date must be Wed–Sat (not in the past), time from 6:00 PM onwards, and a maximum of 8 guests
- **Customer reviews** (name, 1–5 star rating, comment) saved to the database and shown on the Reviews page
- **Contact form** and **Event Hosting inquiry form**, both saved to the database
- **Events & promotions** page that reads from the database
- **"Open now" badge** on the homepage based on Manila time
- **Admin dashboard** with login gate and real database management:
  - Menu: add, edit, delete
  - Promotions and events: add, delete
  - Reservations, reviews, contact inquiries, and event-hosting inquiries: view and delete
- **Responsive layout** with a collapsible mobile navigation menu

### Admin Login (for evaluation)
- Username: `admin`
- Password: `128admin`

## Operating Hours

**Café**
- Mon–Wed: 10AM–10PM
- Thu–Fri: 12PM–12AM
- Sat: 12PM–11PM
- Sun: Closed

**Cocktail Bar (reservation-only, 18+)**
- Wed–Thu: 6PM–12MN
- Fri–Sat: 6PM–2AM

**Address:** 1409 Paz Street, Paco, Manila

## Design Concept
- **Color Scheme**: Deep Navy `#0A2F4A` (evening / structure), Warm Cream `#F5EDE0` (daytime / backgrounds), and Amber `#E09530` (buttons, active links, highlights)
- **Typography**: Fredoka for headings, Segoe UI (fallbacks: Tahoma, sans-serif) for body text, and Caveat for short handwritten accents such as taglines and photo captions
- **Layout**: Sticky navigation bar, card-based grids, consistent footer across pages, and a mobile layout (≤768px) that stacks into a single column with a hamburger menu
- **Concept**: "Coffee by day, cocktails by night," reflected in the sun/moon hero and the warm-to-dark palette

## How to Run Locally
1. Clone the repository.
2. Open your terminal in the project folder.
3. Run `npm install` to install the Node.js dependencies.
4. Run `npm start` (or `node server.js`) to start the server. The database is created and the menu is seeded automatically on first run.
5. Open **http://localhost:3000** in your browser.

> Open the site through the Node server, not Live Server or by double-clicking the HTML files. The pages call the backend at relative `/api/...` URLs, so forms, the menu, and the admin dashboard only work when served by `server.js`.

## Deployment
- GitHub Repository: [https://github.com/exult-z/128_Coffee_x_Cocktails](https://github.com/exult-z/128_Coffee_x_Cocktails)
- Live Site (Render): [https://one-28-coffexcocktails.onrender.com](https://one-28-coffexcocktails.onrender.com)

The site runs as a Node.js web service on Render (`npm install` to build, `npm start` to run). Deployment was configured by the Project Manager, Emie Ann Precioso. On Render's free plan, the first visit after a period of inactivity may take a short while to load.

## Lessons Learned
- Improved collaboration using Git and GitHub (task division by page and file, regular commits and pulls)
- Practiced responsive design and semantic HTML
- Built a lightweight full-stack application using Node.js, Express, and SQLite
- Strengthened form validation (age, day-of-week, and guest-limit rules) and REST API routing
- Learned that a Node.js backend cannot run on static hosting (GitHub Pages) and deployed it to Render instead

## Timeline

- **Proposal** – Planning, sitemap & wireframe – September 2026
- **Development** – Front-end pages, forms, Node.js/SQLite backend, admin dashboard, coding & testing – Oct–Nov, 2026
- **Deployment** – GitHub setup & Render launch – Nov 21–23, 2026
- **Submission** – Final documentation – Nov 23, 2026

## Course
BSIS 3A – Web Development, Technological University of the Philippines – Manila (Submitted to Dr. Mary Joy D. Viñas)