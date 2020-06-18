const mongoose=require('mongoose')

const Schema=mongoose.Schema

const newUserlist=new Schema({
    name:{type:String,default:'USERLIST'},
    registersuser:[{name:{type:String},username:{type:String},email:{type:String}}]
})


module.exports=mongoose.model('USERLIST',newUserlist);
