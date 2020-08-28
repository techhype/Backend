const jwt = require('jsonwebtoken');
const db = require("./database");

module.exports = (req,res,next) =>{
  const { authorization } = req.headers;
       //authorization === Bearer sfafsafa
       if(!authorization){
           return res.status(401).send({error:"you must be logged in"})
       }
       const token = authorization.replace("Bearer ","");
       jwt.verify(token,process.env.JWT_SECRET,async (err,payload)=>{
          if(err){
            return  res.status(401).send({error:"you must be logged in "})
          }
          const userId = payload.id;
          console.log(userId);
          let sql = `SELECT * FROM user WHERE id=?`;
          db.query(sql, [userId],  (err, result) => {
            req.user = result[0];
            next();
          });
        });
}