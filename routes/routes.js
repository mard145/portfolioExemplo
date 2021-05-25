require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const controllers = require('../controllers/controllers')
const adminRouter = require('./adminRouter')

router.use(express.urlencoded({extended:true}))

router.use('/admin', express.json(), adminRouter)

router.get('/', controllers.indexRender)

router.get('/register', controllers.registerRender)

router.get('/contato', controllers.contatoRender)

router.post('/contato', controllers.contatoNodeMailer)

router.post('/register',express.urlencoded({extended:true}), controllers.registerVal)

router.post('/', controllers.login)

module.exports = router