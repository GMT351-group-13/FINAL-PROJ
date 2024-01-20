const client = require('./connection.js');
const express = require('express');
const cors = require('cors'); // CORS modülünü içe aktar
const app = express();

// CORS ayarlarını uygula
app.use(cors()); // CORS modülünü kullan

// Body parser kullanarak gelen isteklerin JSON olarak işlenmesini sağla
app.use(express.json()); // express 4.16+ itibariyle bodyParser yerine express.json kullanılıyor

// Sunucu 3300 portunda dinlemeye başlar
app.listen(3301, () => {
    console.log('Server is running on http://localhost:3301');
});

// Veritabanından tüm kafeleri çek ve gönder
app.get('/cafes', (req, res) => {
    client.query('SELECT * FROM cafes', (err, result) => {
        if (!err) {
            res.json(result.rows);
        } else {
            console.error(err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Yeni bir kafe kaydını veritabanına ekle
app.post('/cafes', (req, res) => {
    const { id, cafe_name, cafe_lat, cafe_lon, cafe_desc } = req.body;
    const insertQuery = `INSERT INTO cafes (id, cafe_name, cafe_lat, cafe_lon, cafe_desc) VALUES ($1, $2, $3, $4, $5)`;

    client.query(insertQuery, [id, cafe_name, cafe_lat, cafe_lon, cafe_desc], (err, result) => {
        if (!err) {
            res.status(201).send('Cafe inserted successfully');
        } else {
            console.error(err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Mevcut bir kafe kaydını güncelle
app.put('/cafes/:id', (req, res) => {
    const { cafe_name, cafe_lat, cafe_lon, cafe_desc } = req.body;
    const updateQuery = `UPDATE cafes SET cafe_name = $1, cafe_lat = $2, cafe_lon = $3, cafe_desc = $4 WHERE id = $5`;

    client.query(updateQuery, [cafe_name, cafe_lat, cafe_lon, cafe_desc, req.params.id], (err, result) => {
        if (!err) {
            res.send('Cafe updated successfully');
        } else {
            console.error(err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Bir kafe kaydını sil
app.delete('/cafes/:id', (req, res) => {
    const deleteQuery = 'DELETE FROM cafes WHERE id = $1';

    client.query(deleteQuery, [req.params.id], (err, result) => {
        if (!err) {
            res.send('Cafe deleted successfully');
        } else {
            console.error(err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Veritabanına bağlan
client.connect((err) => {
    if (err) {
        console.error('Database connection failed', err.stack);
    } else {
        console.log('Connected to database');
    }
});
