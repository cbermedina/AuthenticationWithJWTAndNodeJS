require('dotenv').config();
const router = require('express').Router();
var jwt = require('jsonwebtoken')

router.post('/login',(req, res)=>{
    const username= req.headers['username'],
    password = req.headers['password'];
    
    if(username === "cbm" && password === "123") {
        const payload = {
            check:  true,
            rol: 'admin'
        };
        const token = jwt.sign(payload, process.env.secretKey, {
            expiresIn: 3600
        });
        res.json({
            message: 'Correct authentication',
            token: token
        });
    } else {
        res.json({ mensaje: "Incorrect username or password"})
    }
});

router.get('/secure', (req, res) => {
    var token = req.headers['authorization']
    if(!token){
        res.status(401).send({
          error: "Authentication token is required"
        })
        return
    }

    token = token.replace('Bearer ', '')

    jwt.verify(token, process.env.secretKey, function(err, user) {
      if (err) {
        res.status(401).send({
          error: 'Invalid Token'
        })
      } else {
        res.send({
          message: 'ohhhh yeah!!!!',
          rol: user.rol
        })
      }
    })
})

module.exports= router;