const client = require('./connection.js');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser'); // Keep this declaration
const bcrypt = require('bcrypt');
const saltRounds = 10; 

app.use(bodyParser.json());
app.use(cors());




app.listen(3300, () => {
    console.log('http://localhost:3300');
});

app.get('/users', (req, res) => {
    client.query(`SELECT * FROM users`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.post('/users', async (req, res) => {
    const user = req.body;
    const userId = generateUniqueId(); 

    try {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        const insertQuery = `
            INSERT INTO users(id, firstname, lastname, email, password)
            VALUES($1, $2, $3, $4, $5)
        `;

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


app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = req.body;

    // Kullanıcıyı güncelle
    const updateQuery = `
        UPDATE users
        SET firstname = $1,
            lastname = $2,
            email = $3
        WHERE id = $4
    `;

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

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;


    const deleteQuery = 'DELETE FROM users WHERE id = $1';

    client.query(deleteQuery, [userId], (err, result) => {
        if (!err) {
            res.send('Deletion was successful');
        } else {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;


    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';

    try {
        const result = await client.query(checkUserQuery, [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.send('Login successful');
            } else {
                res.status(401).send('Invalid email or password');
            }
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

function generateUniqueId() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
}


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const checkUserQuery = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;

    client.query(checkUserQuery, (err, result) => {
        if (!err) {
            if (result.rows.length > 0) {
                res.send('Login successful');
            } else {
                res.status(401).send('Invalid email or password');
            }
        } else {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        }
    });
});

function generateUniqueId() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
}

app.post('/cafes', (req, res) => {
    const cafes = req.body;
    let insertQuery = `INSERT INTO cafes(id, cafe_name, cafe_lat, cafe_lon, cafe_desc)
                       VALUES(${cafes.id}, '${cafes.cafe_name}', '${cafes.cafe_lat}', '${cafes.cafe_lon}', '${cafes.cafe_dec}')`;

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful');
        } else {
            console.log(err.message);
        }
    });
    //client.end(); 
});

app.put('/cafes/:id', (req, res) => {
    let cafes = req.body;
    let updateQuery = `UPDATE cafes
                       SET cafe_name = '${cafes.cafe_name}',
                       cafe_lat = '${cafes.cafe_lat}',
                       cafe_lon = '${cafes.cafe_lon}'
                       cafe_desc= '${cafes.cafe_dec}'
                       
                       WHERE id = ${cafes.id}`;

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update was successful');
        } else {
            console.log(err.message);
        }
    });
    //client.end() 
});

app.delete('/cafes/:id', (req, res) => {
    let deleteQuery = `DELETE FROM cafes WHERE id=${req.params.id}`;

    client.query(deleteQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful');
        } else {
            console.log(err.message);
        }
    });
    //client.end()
});

client.connect();
