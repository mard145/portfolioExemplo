const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    name:{type:String, required:true, minlength:3, maxlength:100},
    email:{type:String, required:true, minlength:3, maxlength:150},
    password:{type:String, required:true, minlength:6, maxlength:200},
    repeatPassword:{type:String, required:true},
    admin:{type:Boolean, default:false},
    data:{type:Date, default:Date.now}
})

module.exports = mongoose.model('Usuarios', UserSchema)