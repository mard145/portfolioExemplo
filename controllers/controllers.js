const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const validate = require('../controllers/validate')
const cons = require('consolidate')

const transporter = nodemailer.createTransport({

    host:process.env.EMAIL_USER,
    port:587,
    secure:false,
    auth:{user:process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASS,
        }
  
  })

const indexRender = (req,res) => {res.render('index',{error:false})}

const registerRender = (req,res) => {res.render('register',{error:false, body:{}})}

const contatoRender = (req,res) => {res.render('contato')}

const contatoNodeMailer = (req,res) => {
  
    let email = req.body.emailAdress
    let subject = req.body.subject
    let message = req.body.message
  
    transporter.sendMail({
      from:process.env.EMAIL_USER,
      to:process.env.EMAIL_USER,
      replyTo:email,
      subject:subject,
      text:message
  }).then(info=>{
    
  console.log(info)
  res.send('Mensagem Enviada')
  res.render('contato')})
  
  
  .catch(err=>{console.log(err)
    res.send('Houve algum error')
   
  })
  }

const registerVal = async (req,res) => {

    const regValidate = validate.registerValidate(req.body)
    if(!regValidate){return res.status(400).send(error.message)}
  
    const selectedUser = await User.findOne({email:req.body.email})
    if(selectedUser) return res.status(400).send('E-mail ou usuário já existem')
    console.log(selectedUser)
  
    let newuser = new User({
                             name: req.body.name,
                             email: req.body.email,
                             password: bcrypt.hashSync(req.body.password),
                             repeatPassword: bcrypt.hashSync(req.body.repeatPassword)
                            })
  
    try{
    let doc = await newuser.save()
    res.render('register', {error:false, body:{}})
    console.log(doc)
    console.log('Usuário adicionado')
       }catch(error){
    res.render('register', {error, body:req.body, body:{}})
    
             }
  }

  const login = async (req,res) => {

    const regValidate = validate.loginValidate(req.body)
    if(!regValidate){return res.status(400).send(error.message)}
   
    const selectedUser = await User.findOne({email:req.body.email})
    if(!selectedUser)return res.status(400).send('E-mail or password incorrect')
  
    const passUser = bcrypt.compareSync(req.body.password, selectedUser.password)
    if(!passUser) return res.status(400).send('E-mail or password incorrect')
  
    const token = jwt.sign({_id: selectedUser._id, admin: selectedUser.admin}, process.env.TOKEN_SECRET)
  
    res.header('authorization-token', token)
  
    res.send('User Logged')
  }

  module.exports = { indexRender, registerRender,login, registerVal, contatoRender, contatoNodeMailer }
 
