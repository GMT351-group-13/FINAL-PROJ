// Required modules
const client = require('./connection.js'); // Database connection module
const express = require('express'); // Express framework
const app = express(); // Creating an express application
const cors = require('cors'); // CORS for cross-origin requests
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const bcrypt = require('bcrypt'); // Module for hashing passwords

const saltRounds = 10; // Number of rounds for salt generation in bcrypt

app.use(bodyParser.json()); // Parse incoming requests with JSON payloads
app.use(cors()); // Enable CORS

// Start the server listening on port 3300
app.listen(3300, () => {
    console.log('http://localhost:3300');
});

// Route to get all users
app.get('/users', (req, res) => {
    client.query(`SELECT * FROM users`, (err, result) => {
        if (!err) {
            res.send(result.rows); // Send all users
        } else {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Route to get a specific user by ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    client.query('SELECT * FROM users WHERE id = $1', [userId], (err, result) => {
        if (!err) {
            if (result.rows.length > 0) {
                res.send(result.rows[0]); // Send the user data
            } else {
                res.status(404).send('User not found');
            }
        } else {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Route to create a new user
app.post('/users', async (req, res) => {
    const user = req.body;
    const userId = generateUniqueId(); // Generating a unique ID for the user

    try {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds); // Hash the password

        const insertQuery = `
            INSERT INTO users(id, firstname, lastname, email, password)
            VALUES($1, $2, $3, $4, $5)
        `; // SQL query for insertion

        const values = [userId, user.firstname, user.lastname, user.email, hashedPassword];

        client.query(insertQuery, values, (err, result) => {
            if (!err) {
                res.status(200).json({ message: 'Insertion was successful' });
            } else {
                console.error(err.message);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to update an existing user
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = req.body;

    const updateQuery = `
        UPDATE users
        SET firstname = $1,
            lastname = $2,
            email = $3
        WHERE id = $4
    `; // SQL query for updating user

    const values = [user.firstname, user.lastname, user.email, userId];

    client.query(updateQuery, values, (err, result) => {
        if (!err) {
            res.send('Update was successful');
        } else {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Route to delete a user
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    const deleteQuery = 'DELETE FROM users WHERE id = $1'; // SQL query for deletion

    client.query(deleteQuery, [userId], (err, result) => {
        if (!err) {
            res.send('Deletion was successful');
        } else {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Route for user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const checkUserQuery = 'SELECT * FROM users WHERE email = $1'; // SQL query to check user

    try {
        const result = await client.query(checkUserQuery, [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            const passwordMatch = await bcrypt.compare(password, user.password); // Compare hashed password

            if (passwordMatch) {
                res.status(200).json({ message: 'Login successful', redirect: 'index.html' });
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for admin login
app.post('/adminlogin', async (req, res) => {
    const { email, password } = req.body;

    const checkUserQuery = 'SELECT * FROM users WHERE email = $1'; // SQL query to check admin

    try {
        const result = await client.query(checkUserQuery, [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch && user.isadmin === 1) {
                res.status(200).json({ message: 'Login successful', redirect: 'http://localhost:5173/' });
            } else {
                res.status(401).json({ error: 'Invalid email, password, or insufficient permissions' });
            }
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all cafes
app.get('/cafes', (req, res) => {
    client.query(`SELECT * FROM cafes`, (err, result) => {
        if (!err) {
            res.send(result.rows); // Send all cafes
        } else {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Route to get a specific cafe by ID
app.get('/cafes/:id', (req, res) => {
    const cafeId = req.params.id;

    client.query('SELECT * FROM cafes WHERE id = $1', [cafeId], (err, result) => {
        if (!err) {
            if (result.rows.length > 0) {
                res.send(result.rows[0]); // Send the cafe data
            } else {
                res.status(404).send('Cafe not found');
            }
        } else {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Route to create a new cafe
app.post('/cafes', (req, res) => {
    const cafes = req.body;
    let insertQuery = `INSERT INTO cafes(id, cafe_name, cafe_lat, cafe_lon, cafe_desc)
                       VALUES(${cafes.id}, '${cafes.cafe_name}', '${cafes.cafe_lat}', '${cafes.cafe_lon}', '${cafes.cafe_desc}')`;

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful');
        } else {
            console.log(err.message);
        }
    });
});

// Route to update an existing cafe
app.put('/cafes/:id', (req, res) => {
    let cafes = req.body;
    let updateQuery = `UPDATE cafes
                       SET cafe_name = '${cafes.cafe_name}',
                       cafe_lat = '${cafes.cafe_lat}',
                       cafe_lon = '${cafes.cafe_lon}',
                       cafe_desc= '${cafes.cafe_desc}'
                       WHERE id = ${cafes.id}`;

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update was successful');
        } else {
            console.log(err.message);
        }
    });
});

// Route to delete a cafe
app.delete('/cafes/:id', (req, res) => {
    let deleteQuery = `DELETE FROM cafes WHERE id=${req.params.id}`;

    client.query(deleteQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful');
        } else {
            console.log(err.message);
        }
    });
});

// Connect to the database
client.connect();

// Function to generate a unique user ID
function generateUniqueId() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
}
