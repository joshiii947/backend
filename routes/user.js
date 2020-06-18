const router=require('express').Router()
const USERSLIST=require('../models/userlist.models')
const USER=require('../models/user.models')
const FOLDER=require('../models/folder.models')
const jwt=require('jsonwebtoken')



//   A router is needed when the user authenticate his email from his email address only then his name will be displyed in database 

/// Curretly user get automatically get dded by register it should be kept in mind that it should be done after all the creation

//  Login authentication also needed be checked


router.post('/createlist',async(req,res)=>{
    
    const name='USERLIST'
    const newList=new USERSLIST({
        name:'USERLIST'
    })
    newList.save()
    .then((result)=>res.send(result))
    .catch((err)=>res.send(err))
})




router.post('/register',async(req,res)=>{

    const {name,username,email,password}=req.body

    const newuser=new USER({
        name:name,
        username:username,
        email:email,
        password:password
    })

    newuser.save()
    .then((result)=>{
        const newfolder=new FOLDER({
            folderName:username,
            parentId:result['_id']
        })

        newfolder.save()
        .then((result)=>{
            USERSLIST.updateOne({name:'USERLIST'},{$push:{registersuser:{name:name,username:username,email:email}}})
            .then((result)=>{
                res.send(result)
            })
            .catch((err)=>res.send(err))
        })
        .catch((err)=>res.send(err))
    })
    .catch((err)=>res.send(err))
})


router.post('/login',async(req,res)=>{
    const {username,password}=req.body

    USER.findOne({username:username,password:password})
    .then((result)=>{
        if(result==null){
            res.send('Not authorized')
        }
        else{
            jwt.sign({username,password},process.env.SECRET_KEY,(err,token)=>{
                if(err){
                    res.send(err)
                }
                res.json({
                    result:result,
                    token:token
                })
            })
        }
    })
    .catch((err)=>res.send(err))
})



router.post('/getlist',async(req,res)=>{
    
    USERSLIST.findOne({name:'USERLIST'})
    .then((result)=>res.send(result))
    .catch((err)=>res.send(err))
})


router.post('/getuserinfo',async(req,res)=>{
    const username=req.body.username

    USER.findOne({username:username})
    .then((result)=>res.send(result))
    .catch((err)=>res.send(err))
})



module.exports=router