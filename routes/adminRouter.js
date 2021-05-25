const express = require('express')
const router = express.Router()
const auth = require('../controllers/authController')

router.get('/', auth, (req,res)=>{
   if (req.user.admin){
    res.send('Pagina de Admin')
   }
    else{
        res.status(401).send('not admin: Acess Deniedd')
    }

  })

module.exports = router