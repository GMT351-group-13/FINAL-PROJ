// Import required modules
const client = require('./connection.js'); // Import the database connection module
const express = require('express'); // Express framework for creating the server
const cors = require('cors'); // CORS (Cross-Origin Resource Sharing) module

const app = express();

// Apply CORS settings
app.use(cors()); // Enable CORS for cross-origin requests

// Use express.json() to parse incoming requests with JSON payloads
app.use(express.json()); // Since express 4.16+, express.json() is used instead of bodyParser

// Start listening on port 3301
app.listen(3301, () => {
    console.log('Server is running on http://localhost:3301');
});

// Route to fetch all cafes from the database and send them as JSON
app.get('/cafes', (req, res) => {
    client.query('SELECT * FROM cafes', (err, result) => {
        if (!err) {
            res.json(result.rows); // Send the rows from the query result as JSON
        } else {
            console.error(err.stack); // Log the error to the console
            res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
        }
    });
});

// Route to add a new cafe record to the database
app.post('/cafes', (req, res) => {
    const { id, cafe_name, cafe_lat, cafe_lon, cafe_desc } = req.body; // Destructure data from request body
    const insertQuery = `INSERT INTO cafes (id, cafe_name, cafe_lat, cafe_lon, cafe_desc) VALUES ($1, $2, $3, $4, $5)`;

    client.query(insertQuery, [id, cafe_name, cafe_lat, cafe_lon, cafe_desc], (err, result) => {
        if (!err) {
            res.status(201).send('Cafe inserted successfully'); // Send success response
        } else {
            console.error(err.stack); // Log the error
            res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
        }
    });
});

// Route to update an existing cafe record
app.put('/cafes/:id', (req, res) => {
    const { cafe_name, cafe_lat, cafe_lon, cafe_desc } = req.body; // Destructure data from request body
    const updateQuery = `UPDATE cafes SET cafe_name = $1, cafe_lat = $2, cafe_lon = $3, cafe_desc = $4 WHERE id = $5`;

    client.query(updateQuery, [cafe_name, cafe_lat, cafe_lon, cafe_desc, req.params.id], (err, result) => {
        if (!err) {
            res.send('Cafe updated successfully'); // Send success response
        } else {
            console.error(err.stack); // Log the error
            res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
        }
    });
});

// Route to delete a cafe record
app.delete('/cafes/:id', (req, res) => {
    const deleteQuery = 'DELETE FROM cafes WHERE id = $1';

    client.query(deleteQuery, [req.params.id], (err, result) => {
        if (!err) {
            res.send('Cafe deleted successfully'); // Send success response
        } else {
            console.error(err.stack); // Log the error
            res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
        }
    });
});

// Connect to the database
client.connect((err) => {
    if (err) {
        console.error('Database connection failed', err.stack); // Log connection error
    } else {
        console.log('Connected to database'); // Log successful connection
    }
});
