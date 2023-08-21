const express = require('express');
const mysql = require('mysql');

const app = express();

console.log('app.js');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mlb'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.get('/getdata', (req, res) => {
    const query = 'SELECT * FROM mlb_data';
  
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data from the database');
        } else {
            res.json(results);
        }
    });
});

app.get('/getresultdata', (req, res) => {
    const resultID = req.query.resultID;
    const query = 'SELECT * FROM mlb_result WHERE result_UE_BS_info_ID = ?';
  
    db.query(query, [resultID], (err, results) => {
        if (err) {
            res.status(500).send('Error fetching result data from the database');
        } else {
            res.json(results);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
