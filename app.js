require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const consolidate = require('consolidate')
const routes = require('./routes/routes')

const port = process.env.PORT

mongoose.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('banco conectado')
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use('/', routes, express.static(path.join(__dirname, 'public')))

app.listen(port, (error)=>{
  if(error)
  console.log(error)
  else
  console.log('server running on port ',port)})