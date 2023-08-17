// var mysql = require('mysql');

// const express = require('express');
// const app = express();


// var con = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'mlb'
// });


// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM mlb_data", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });


const express = require('express');
const mysql = require('mysql');

const app = express();

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mlb'
});


con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM mlb_data", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

app.use(express.static('public')); // Serve static files in the 'public' folder

app.get('/getdata', (req, res) => {
    const query = 'SELECT * FROM mlb_data';
  
    con.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data from the database');
        } else {
            res.json(results);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


