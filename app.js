const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4680;

app.use(cors()); // Aktivera CORS
app.use(bodyParser.json());

// Skapa en MySQL-anslutning
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Babak_Admin',
    password: 'poej82t2n64',    
    database: 'cv',
    port: "3308"
});

db.connect(err => {
    if (err) {
        console.error('Kunde inte ansluta till databasen:', err);
        process.exit();
    }
    console.log('Ansluten till databasen');
});

// Skapa
app.post('/api/workexperience', (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    const query = `INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?)`;
    db.execute(query, [companyname, jobtitle, location, startdate, enddate, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId });
    });
});

// Läs alla
app.get('/api/workexperience', (req, res) => {
    const query = `SELECT * FROM workexperience`;
    db.execute(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Läs en specifik arbetserfarenhet
app.get('/api/workexperience/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM workexperience WHERE id = ?`;
    db.execute(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Arbetserfarenhet hittades inte' });
        }
        res.json(results[0]);
    });
});

// Uppdatera
app.put('/api/workexperience/:id', (req, res) => {
    const { id } = req.params;
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    const query = `UPDATE workexperience SET companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ?, description = ? WHERE id = ?`;
    db.execute(query, [companyname, jobtitle, location, startdate, enddate, description, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Work experience updated' });
    });
});

// Ta bort
app.delete('/api/workexperience/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM workexperience WHERE id = ?`;
    db.execute(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Work experience deleted' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
