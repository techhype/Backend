const mysql = require("mysql");
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});



// DB connection
var db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PW ,
  database: process.env.DATABASE,
});

db.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log('connected to MySql');
});


module.exports = db;