# 1.28 Coffee x Cocktails

## Project Overview
This website was developed by our group as part of our Web Development course. It showcases the menu, cocktail bar reservations, events, and contact information of 1.28 Coffee x Cocktails — a cozy neighborhood café in Paco, Manila by day, and a reservation-only cocktail bar by night.

## Purpose
To provide an online presence for 1.28 Coffee x Cocktails, promote its day-to-night café-and-bar concept, and allow customers to explore the menu and reserve cocktail bar slots directly through the site.

## Team Members & Roles
- **Emie Ann Precioso** – Project Manager
- **Niah Annelle Makinano** – Designer & Researcher
- **Dan Antonio Pedragorda** – Developer
- **Joseph Kristian De Leon** – Researcher & Developer
- **Sean Andrei Taraya** – Developer 

## Tools Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Environment:** Visual Studio Code, Node.js
- **Version Control:** Git & GitHub

## Site Structure
- `index.html` – Homepage (featured picks, bestsellers, events)
- `menu.html` – Full menu with live search & category filter
- `reservation.html` – Cocktail Bar reservation form (18+)
- `feedback.html` – Customer reviews & ratings
- `contact.html` – Contact form + Event Hosting form + Google Map
- `admin.html` – Admin Dashboard (protected by a secure staff login)
- `server.js` – Node.js Express backend server
- `128_coffee.db` – SQLite database (auto-generated on first run)
- `assets/` – Images, icons, logo
- `css/` – Stylesheets
- `js/` – JavaScript modules

## Key Features
- Fully functional dynamic menu pulling from the database
- Cocktail Bar reservation form with age and day validations
- Customer reviews system that saves permanently to the DB
- Contact and Event Hosting inquiry forms
- Admin Dashboard with real database management (Add/Delete)
- Secure staff login gate (Username: `admin` / Password: `128admin`)

## How to Run Locally
1. Clone the repository.
2. Open your terminal in the project folder.
3. Run `npm install` to install Node.js dependencies.
4. Run `node server.js` to start the backend and generate the SQLite database.
5. Open the HTML files using Live Server or your browser.

## Lessons Learned
- Improved collaboration using Git
- Practiced responsive design and semantic HTML
- Built a lightweight Full-Stack application using Node.js and SQLite.
- Strengthened form validation and API routing.

## Course
BSIS 3A