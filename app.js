// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');


dotenv.config({ path: './.env'});
app.use(bodyParser.json());
app.use(authRoutes);

// ENV variables
const hostName =process.env.HOSTNAME;
const PORT = process.env.PORT;

app.get('/',(req,res)=>{
  res.send("hello");
});

// //Create Database
// app.get('/createdb',(req,res)=>{
//   let sql = 'CREATE DATABASE testdata';
//   db.query(sql, (err,result)=>{
//     if(err) throw err;
//     res.send('database created');
//   })
// });

// // Create User Table
// app.get('/createUserTable',(req,res)=>{
//   let sql = `CREATE TABLE user
//             (id int AUTO_INCREMENT, username VARCHAR(255), 
//             email VARCHAR(255), password VARCHAR(255),
//             mnumber VARCHAR(20), PRIMARY KEY(id))`;
//   db.query(sql,(err,result)=>{
//     if(err) throw err;
//     res.send('Table created');
//   });
// });

app.listen(PORT,()=>{
  console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`);
});
