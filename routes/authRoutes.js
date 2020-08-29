const express = require('express'); 
const db = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post('/login',async(req,res)=>{
  const { email, password } = req.body;
  if (!email || !password || email=='' || password == '') {
    res.json({error:'Pleaase provide both Email and Password'});
    return;
  }
  let sql = `SELECT * FROM user WHERE email=?`;
  db.query(sql, [email], async (err, result) => {
    if (!result || !(await bcrypt.compare(password, result[0].password))) {
      res.json({ error: 'Email or Password is Incorrect' });
      return;
    }
    const id = result[0].insertId;
    const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    console.log(`Generated Token: ${token}`);
    res.json({token})
    console.log(result);
  })
});

router.post('/signup',async(req,res)=>{
  const { username, email, password, mnumber } = req.body;
  db.query('SELECT email FROM user WHERE email=? ', [email], async (err, result) => {
    if(err){
      console.log(err);
      return;
    }
    if (result.length > 0) {
      res.json({error:'Email id already in use!!'});
      return;
    }
    let hashedPassword = await bcrypt.hash(password, 8);
    let sql = 'INSERT INTO user SET ?';
    db.query(sql, { username, email, password: hashedPassword, mnumber }, async (err, result) => {
      if (err) throw err;
      console.log(`Row inserted successfully ${result}`);
      // res.json({message:'Created an Account'});  
      const id = result.insertId;
      const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.json({token,email});
    });
  }); 
});

module.exports = router;