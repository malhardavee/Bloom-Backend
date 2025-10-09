const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// 1️⃣ Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // Change if you use a different username
    password: '',          // Enter your MySQL password here (keep blank if none)
    database: 'bloom'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('✅ Connected to MySQL Database: bloom');
    }
});

// 2️⃣ Helper function for plant state
function getPlantState(mood, diet, hydration) {
    if (mood === 'bad' || diet === 'unhealthy' || hydration < 2) {
        return 'withered';
    } else if (mood === 'neutral' || diet === 'average' || hydration < 4) {
        return 'okay';
    } else {
        return 'healthy';
    }
}

// 3️⃣ Route: homepage
app.get('/', (req, res) => {
    res.send('Bloom backend with MySQL is running!');
});

// 4️⃣ Route: log lifestyle data
app.post('/log', (req, res) => {
    const { name, mood, diet, hydration } = req.body;

    if (!name || !mood || !diet || hydration === undefined) {
        return res.status(400).json({ error: 'Please provide name, mood, diet, and hydration' });
    }

    const plantState = getPlantState(mood, diet, hydration);

    const sql = 'INSERT INTO users (name, mood, diet, hydration, plant_state) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, mood, diet, hydration, plantState], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database insert failed' });
        }
        res.json({ message: 'Log added successfully', plantState });
    });
});

// 5️⃣ Route: get latest log
app.get('/status', (req, res) => {
    const sql = 'SELECT * FROM users ORDER BY log_date DESC LIMIT 1';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.json({ plantState: 'unknown' });
        }
        res.json({ plantState: results[0].plant_state, latestLog: results[0] });
    });
});

// 6️⃣ Start server
app.listen(PORT, () => {
    console.log(`🚀 Bloom backend running at http://localhost:${PORT}`);
});