const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database(path.join(__dirname, '128_coffee.db'), (err) => {
    if (err) console.error(err.message);
    else console.log('Connected to 1.28 Coffee SQLite database.');
});

db.serialize(() => {
    // Create Tables
    db.run(`CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, category TEXT, price INTEGER, description TEXT, image TEXT, featured INTEGER, tag TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS reviews (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, rating INTEGER, text TEXT, date TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS reservations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, instagram TEXT, birthdate TEXT, res_date TEXT, res_time TEXT, guests INTEGER, poetry INTEGER, notes TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS inquiries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, message TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS space_inquiries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, event_type TEXT, event_date TEXT, message TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS promotions (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, schedule TEXT, description TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, event_date TEXT, event_time TEXT)`);

    // Seed Menu
    db.get(`SELECT COUNT(*) as count FROM menu`, (err, row) => {
        if (row && row.count === 0) {
            const menu = [
                ['Chicken Teriyaki', 'Rice Bowls', 205, 'Juicy chicken breast fillet over hot rice, glazed with sweet sesame soy sauce.', 'assets/rice1.jpg', 0, '⭐ Must Try'],
                ['Pepper Beef Mushroom Bowl', 'Rice Bowls', 205, 'Beef strips with pepper and mushroom in our special super secret gravy.', 'assets/rice2.jpg', 1, '💚 Bestseller'],
                ['Pork Tonkatsu Bowl', 'Rice Bowls', 205, 'Half-sliced pork fillet, deep-fried golden brown with egg and savory sauce.', 'assets/rice3.jpg', 0, ''],
                ['Chicken Wing Bowls', 'Rice Bowls', 165, 'Choose from: Garlic Parmesan, Spicy Buffalo, Honey Ginger Sriracha, or Uber Cheese.', 'assets/rice4.jpg', 0, ''],
                ['Jalapeño Cheese Stix', 'Nibblers', 260, 'Crispy on the outside, melty and spicy on the inside.', 'assets/nibbler1.jpg', 0, '⭐ Must Try'],
                ['Big Pile of Nachos', 'Nibblers', 330, 'A generous pile of nachos perfect for sharing.', 'assets/nibbler2.jpg', 0, ''],
                ['Cheesy Beefy Fries', 'Nibblers', 200, 'Fries loaded with cheese and beef.', 'assets/nibbler3.jpg', 0, ''],
                ['Plain Fries with Dip', 'Nibblers', 165, 'Comes with your choice of garlic mayo or cheese dip.', 'assets/nibbler4.jpg', 0, ''],
                ['Plate of Wings (12 pcs)', 'Nibblers', 385, 'Choose: Garlic Parmesan (⭐), Uber Cheese, Buffalo, or Honey Ginger Sriracha (💚).', 'assets/nibbler5.jpg', 1, '💚 Bestseller'],
                ['Chicken Poppers', 'Nibblers', 300, 'With 3 dips: Garlic Mayo, Creamy Sriracha, Lemon Butter Gravy.', 'assets/nibbler6.jpg', 0, ''],
                ['Carbonara', 'Pasta', 200, 'Creamy carbonara, a 1.28 staple.', 'assets/pasta1.jpg', 0, ''],
                ['Chicken Alfredo', 'Pasta', 230, 'Creamy alfredo with tender chicken.', 'assets/pasta2.jpg', 1, '💚 Bestseller'],
                ['1.28 Spaghetti', 'Pasta', 220, 'Our signature house spaghetti.', 'assets/pasta3.jpg', 1, '⭐ Must Try'],
                ['Pasta with Sardines', 'Pasta', 250, 'Pasta tossed with sardines — a Filipino favorite.', 'assets/pasta4.jpg', 0, ''],
                ['Tuna Pesto', 'Pasta', 230, 'Pesto pasta with tuna flakes.', 'assets/pasta5.jpg', 0, ''],
                ['Chicken Marinara', 'Pasta', 240, 'Classic marinara sauce with chicken.', 'assets/pasta6.jpg', 0, '⭐ Must Try'],
                ['Tocilog', 'All-Day Breakfast', 149, 'Tocino, sinangag, at itlog — a Filipino classic.', 'assets/breakfast1.jpg', 0, ''],
                ['Tapsilog', 'All-Day Breakfast', 149, 'Tapa, sinangag, at itlog.', 'assets/breakfast2.jpg', 1, '💚 Bestseller'],
                ['Hotsilog', 'All-Day Breakfast', 129, 'Hotdog, sinangag, at itlog.', 'assets/breakfast3.jpg', 0, ''],
                ['Signature BECK Toastie', 'Toasties', 250, 'Bacon, egg, cheese, and keso — the one that started it all.', 'assets/toastie1.jpg', 1, '⭐ Must Try'],
                ['Chicken Toastie', 'Toasties', 220, 'Warm toasted sandwich filled with chicken.', 'assets/toastie2.jpg', 0, ''],
                ['Tuna Toastie', 'Toasties', 190, 'Toasted sandwich with tuna filling.', 'assets/toastie3.jpg', 0, ''],
                ['Cup of Rice', 'Kitchen Extras', 30, 'Extra cup of steamed rice.', 'assets/extra1.jpg', 0, ''],
                ['Garlic Mayo', 'Kitchen Extras', 25, 'Creamy garlic mayo dip.', 'assets/extra2.jpg', 0, ''],
                ['1.28 Cheese Dip', 'Kitchen Extras', 25, 'Our signature cheese dip.', 'assets/extra3.jpg', 0, ''],
                ['Takeaway Packaging', 'Kitchen Extras', 5, 'For takeaway orders.', 'assets/extra4.jpg', 0, ''],
                ['Extra Egg', 'Kitchen Extras', 25, 'Add an extra egg to any dish.', 'assets/extra5.jpg', 0, ''],
                ['Espresso', 'Espresso Bar', 100, 'Hot (8oz) ₱100 · Iced (16oz) ₱110', 'assets/drink1.jpg', 0, ''],
                ['Americano', 'Espresso Bar', 100, 'Hot (8oz) ₱100 · Iced (16oz) ₱110', 'assets/drink2.jpg', 0, ''],
                ['Café Latte', 'Espresso Bar', 110, 'Hot (8oz) ₱110 · Iced (16oz) ₱120', 'assets/drink3.jpg', 0, ''],
                ['Vanilla Latte', 'Espresso Bar', 120, 'Hot (8oz) ₱120 · Iced (16oz) ₱130', 'assets/drink4.jpg', 0, ''],
                ['Caramel Latte', 'Espresso Bar', 120, 'Hot (8oz) ₱120 · Iced (16oz) ₱130', 'assets/drink5.jpg', 0, ''],
                ['Mocha', 'Espresso Bar', 130, 'Hot (8oz) ₱130 · Iced (16oz) ₱140', 'assets/drink6.jpg', 0, ''],
                ['White Mocha', 'Espresso Bar', 130, 'Hot (8oz) ₱130 · Iced (16oz) ₱140', 'assets/drink7.jpg', 0, ''],
                ['Spanish Latte', 'Espresso Bar', 140, 'Hot (8oz) ₱140 · Iced (16oz) ₱150', 'assets/drink8.jpg', 1, '💚 Bestseller'],
                ['Hazelnut', 'Espresso Bar', 120, 'Hot (8oz) ₱120 · Iced (16oz) ₱130', 'assets/drink9.jpg', 0, ''],
                ['Salted Caramel Latte', 'Espresso Bar', 120, 'Hot (8oz) ₱120 · Iced (16oz) ₱130', 'assets/drink10.jpg', 1, '💚 Bestseller'],
                ['Cappuccino', 'Espresso Bar', 110, 'Hot (8oz) ₱110', 'assets/drink11.jpg', 0, ''],
                ['Flat White', 'Espresso Bar', 100, 'Hot (8oz) ₱100', 'assets/drink12.jpg', 0, ''],
                ['Macchiato Shot', 'Espresso Bar', 120, 'Hot (8oz) ₱120', 'assets/drink13.jpg', 0, ''],
                ['Brewed Coffee', 'Brewed', 90, 'Hot (8oz) ₱90 · Iced (16oz) ₱100', 'assets/drink14.jpg', 0, ''],
                ['Brewed Café Latte', 'Brewed', 100, 'Hot (8oz) ₱100 · Iced (16oz) ₱110', 'assets/drink15.jpg', 0, ''],
                ['Brewed Cappuccino', 'Brewed', 100, 'Hot (8oz) ₱100', 'assets/drink16.jpg', 0, ''],
                ['Vanilla Cold Brew', 'Brewed', 120, 'Hot (8oz) or Iced (16oz) — ₱120', 'assets/drink17.jpg', 1, '⭐ Must Try'],
                ['Milo Monster', 'Non-Coffee & Tea', 110, 'A chocolatey Milo overload.', 'assets/drink18.jpg', 0, ''],
                ['1.28 Fruit Punch', 'Non-Coffee & Tea', 130, 'House-blended refreshing fruit punch.', 'assets/drink19.jpg', 1, '💚 Bestseller'],
                ["JD's House Blend Tea", 'Non-Coffee & Tea', 140, 'Signature house blend tea.', 'assets/drink20.jpg', 1, '💚 Bestseller'],
                ['Premium Creamy Matcha Latte', 'Non-Coffee & Tea', 180, 'Creamy, premium grade matcha latte.', 'assets/drink21.jpg', 0, ''],
                ['Premium Strawberry Matcha', 'Non-Coffee & Tea', 210, 'Premium matcha layered with fresh strawberry.', 'assets/drink22.jpg', 0, ''],
                ['Chamomile, Lemongrass Tea', 'Non-Coffee & Tea', 65, 'Hot (8oz) ₱65 — calming herbal blend.', 'assets/drink23.jpg', 0, ''],
                ['Pure Green Tea', 'Non-Coffee & Tea', 60, 'Hot (8oz) ₱60 — light and refreshing.', 'assets/drink24.jpg', 0, ''],
                ['Hibiscus and Rosehip Tea', 'Non-Coffee & Tea', 65, 'Hot (8oz) ₱65 — floral and tart.', 'assets/drink25.jpg', 0, ''],
                ['Mocha Lava', 'Barista Blend', 180, 'Coffee-based signature drink with rich chocolate lava.', 'assets/drink26.jpg', 1, '⭐ Must Try']
            ];
            const stmt = db.prepare(`INSERT INTO menu (name, category, price, description, image, featured, tag) VALUES (?, ?, ?, ?, ?, ?, ?)`);
            menu.forEach(item => stmt.run(item));
            stmt.finalize();
        }
    });
});

// --- AUTH ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '128admin') res.json({ success: true });
    else res.status(401).json({ success: false });
});

// --- MENU ---
app.get('/api/menu', (req, res) => db.all(`SELECT * FROM menu`, [], (err, rows) => res.json(rows || [])));
app.post('/api/menu', (req, res) => {
    const { name, category, price, description, image, featured, tag } = req.body;
    db.run(`INSERT INTO menu (name, category, price, description, image, featured, tag) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, category, price, description, image, featured ? 1 : 0, tag], function(err) { res.json({ id: this.lastID }); });
});
app.put('/api/menu/:id', (req, res) => {
    const { name, category, price, description, image, featured, tag } = req.body;
    db.run(`UPDATE menu SET name = ?, category = ?, price = ?, description = ?, image = ?, featured = ?, tag = ? WHERE id = ?`,
        [name, category, price, description, image, featured ? 1 : 0, tag, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes > 0 });
        });
});
app.delete('/api/menu/:id', (req, res) => db.run(`DELETE FROM menu WHERE id = ?`, req.params.id, function() { res.json({ deleted: true }); }));

// --- PROMOTIONS ---
app.get('/api/promotions', (req, res) => db.all(`SELECT * FROM promotions`, [], (err, rows) => res.json(rows || [])));
app.post('/api/promotions', (req, res) => {
    const { title, schedule, description } = req.body;
    db.run(`INSERT INTO promotions (title, schedule, description) VALUES (?, ?, ?)`,
        [title, schedule, description], function(err) { res.json({ id: this.lastID }); });
});
app.delete('/api/promotions/:id', (req, res) => db.run(`DELETE FROM promotions WHERE id = ?`, req.params.id, function() { res.json({ deleted: true }); }));

// --- EVENTS ---
app.get('/api/events', (req, res) => db.all(`SELECT * FROM events`, [], (err, rows) => res.json(rows || [])));
app.post('/api/events', (req, res) => {
    const { title, event_date, event_time } = req.body;
    db.run(`INSERT INTO events (title, event_date, event_time) VALUES (?, ?, ?)`,
        [title, event_date, event_time], function(err) { res.json({ id: this.lastID }); });
});
app.delete('/api/events/:id', (req, res) => db.run(`DELETE FROM events WHERE id = ?`, req.params.id, function() { res.json({ deleted: true }); }));

// --- REVIEWS ---
app.get('/api/reviews', (req, res) => db.all(`SELECT * FROM reviews`, [], (err, rows) => res.json(rows || [])));
app.delete('/api/reviews/:id', (req, res) => db.run(`DELETE FROM reviews WHERE id = ?`, req.params.id, function() { res.json({ deleted: true }); }));

// --- RESERVATIONS ---
app.get('/api/reservations', (req, res) => db.all(`SELECT * FROM reservations`, [], (err, rows) => res.json(rows || [])));
app.post('/api/reservations', (req, res) => {
    const { name, email, phone, instagram, birthdate, res_date, res_time, guests, poetry, notes } = req.body;
    db.run(`INSERT INTO reservations (name, email, phone, instagram, birthdate, res_date, res_time, guests, poetry, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, phone, instagram, birthdate, res_date, res_time, guests, poetry ? 1 : 0, notes], function(err) { res.json({ id: this.lastID }); });
});
app.delete('/api/reservations/:id', (req, res) => db.run(`DELETE FROM reservations WHERE id = ?`, req.params.id, function() { res.json({ deleted: true }); }));

// --- INQUIRIES ---
app.get('/api/inquiries', (req, res) => db.all(`SELECT * FROM inquiries`, [], (err, rows) => res.json(rows || [])));
app.post('/api/inquiries', (req, res) => {
    const { name, email, message } = req.body;
    db.run(`INSERT INTO inquiries (name, email, message) VALUES (?, ?, ?)`,
        [name, email, message], function(err) { res.json({ id: this.lastID }); });
});
app.delete('/api/inquiries/:id', (req, res) => db.run(`DELETE FROM inquiries WHERE id = ?`, req.params.id, function() { res.json({ deleted: true }); }));

// --- SPACE INQUIRIES (Event Hosting) ---
app.get('/api/space_inquiries', (req, res) => db.all(`SELECT * FROM space_inquiries`, [], (err, rows) => res.json(rows || [])));
app.post('/api/space_inquiries', (req, res) => {
    const { name, email, phone, event_type, event_date, message } = req.body;
    db.run(`INSERT INTO space_inquiries (name, email, phone, event_type, event_date, message) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, email, phone, event_type, event_date, message], function(err) { res.json({ id: this.lastID }); });
});
app.delete('/api/space_inquiries/:id', (req, res) => db.run(`DELETE FROM space_inquiries WHERE id = ?`, req.params.id, function() { res.json({ deleted: true }); }));

// --- START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.post('/api/reviews', (req, res) => {
    const { name, rating, text, date } = req.body;
    db.run(`INSERT INTO reviews (name, rating, text, date) VALUES (?, ?, ?, ?)`,
        [name, rating, text, date], function(err) { res.json({ id: this.lastID }); });
});