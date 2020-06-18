const mongoose=require('mongoose')
const Schema=mongoose.Schema


const newfolder=new Schema({
    folderName:{type:String,required:true},
    parentId:{type:String,required:true},
    files:[{fileName:{type:String,required:true},fileId:{type:String,required:true},contentType:{type:String,required:true},createdAt:{type:Date,default:Date.now}}],
    folders:[{folderId:{type:String,required:true},folderName:{type:String,required:true},createdAt:{type:Date,default:Date.now}}],
    sharedWith:[{username:{type:String},email:{type:String},sharedAt:{type:Date,default:Date.now}}],
    updateAt:{type:Date,default:Date.now()}
},{
    timestamps:true
})


module.exports=mongoose.model('FOLDER',newfolder)
