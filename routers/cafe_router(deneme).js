const client = require('./connection.js');
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3300, () => {
    console.log('http://localhost:3300');
});

app.get('/cafes', (req, res) => {
    client.query(`SELECT * FROM cafes`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    //client.end(); 
});

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
