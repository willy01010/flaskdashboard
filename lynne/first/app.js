const express = require('express');
const mysql = require('mysql');


const app = express();

console.log('app.js')

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'mlb'
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});




