const mongoose=require('mongoose')
const Schema=mongoose.Schema

const newUser=new Schema({
    name:{type:String,required:true,trim:true,minlength:4,maxlength:50},
    username:{type:String,required:true,trim:true,minlength:4,maxlength:50,unique:true},
    email:{type:String,required:true,trim:true,minlength:4,maxlength:50,unique:true},
    password:{type:String,required:true,minlength:4,maxlength:50},
    joiningDate:{type:Date,default:Date.now},
    updatedon:{type:Date,default:Date.now()},
    isAuthenticatedEmail:{type:Boolean,default:false},
    sharedFilesWithUser:[],
    sharedFolderWithUser:[],
    sharedFilesByUser:[],
    sharedFolderByUser:[]
},{
    timestamps:true
})


module.exports=mongoose.model('USER',newUser);

