const express = require('express'); 
const db = require('../database');
const bcrypt = require('bcryptjs');

const router = express.Router();



router.post('/login',async(req,res)=>{
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render('login', {
      message: 'Please provide both Email and Password'
    })
  }
  let sql = `SELECT * FROM user WHERE email=?`;
  db.query(sql, [email], async (err, result) => {
    if (!result || !(await bcrypt.compare(password, result[0].password))) {
      console.log("Sign in error");
      res.status(400).render('login', {
        message: 'Email or Password is Incorrect'
      })
    }
    console.log('Login Successful');
    console.log(result);
  })
});

router.post('/signup',async(req,res)=>{
  const { username, email, password, mnumber } = req.body;
  db.query('SELECT email FROM user WHERE email=? ', [email], async (err, result) => {
  if (err) {
    console.log(err);
  }
  if (result.length > 0) {
    return res.render('signup', {
      message: 'Email ID already in use :/'
    })
  }
  let hashedPassword = await bcrypt.hash(password, 8);
  let sql = 'INSERT INTO user SET ?';
  db.query(sql, { username, email, password: hashedPassword, mnumber }, (err, result) => {
    if (err) throw err;
    console.log(`Row inserted successfully ${result}`);
  });
  });
});

module.exports = router;