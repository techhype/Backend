const mysql = require("mysql");

// DB connection
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdata',
});

db.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log('connected to MySql');
});


module.exports = db;