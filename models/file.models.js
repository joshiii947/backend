const mongoose=require('mongoose')
const Schema=mongoose.Schema


const newfile=new Schema({
    fileName:{type:String,required:true},
    data:{type:Buffer,required:true},
    contentType:{type:String,required:true},
    sharedWith:[{name:{type:String},username:{type:String},sharedAt:{type:Date,default:Date.now}}]
},{
    timestamps:true
})



module.exports=mongoose.model('FILES',newfile);