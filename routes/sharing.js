const router=require('express').Router()
const FOLDER=require('../models/folder.models')
const FILES=require('../models/file.models')
const USER=require('../models/user.models')


router.get('/getfile',async(req,res)=>{
    const fileId=req.query.fileId

    FILES.find({_id:id})
    .then((result)=>{
        res.set('Content-Type',result[0]['contentType'])
        res.send(result[0]['data'])
    })
    .catch((err)=>res.send(err))
})

//  notfication sending to user while sharing file


router.post('/addfileaccess',async(req,res)=>{
    
    const {fileId,parentUsername,email,username,fileName}=req.body

    FILES.updateOne({_id:fileId},{$push:{sharedWith:{username:username}}})
    .then((result)=>{
        USER.updateOne({username:parentUsername},{$push:{sharedFilesByUser:{fileName:fileName,username:username,fileId:fileId}}})
        .then((result)=>{
            USER.updateOne({username:username},{$push:{sharedFilesWithUser:{fileId:fileId,fileName:fileName,parentUsername:parentUsername}}})
            .then((result)=>{
                res.send(result)
            })
            .catch((err)=>res.send(err))
        })
        .catch((err)=>res.send(err))
    })
    .catch((err)=>res.send(err)) 
})


router.post('/removefileaccess',async(req,res)=>{

    const {fileId,parentUsername,email,username,fileName}=req.body

    FILES.updateOne({_id:fileId},{$pull:{sharedWith:{username:username}}})
    .then((result)=>{
        USER.updateOne({username:parentUsername},{$pull:{sharedFilesByUser:{fileName:fileName,username:username,fileId:fileId}}})
        .then((result)=>{
            USER.updateOne({username:username},{$pull:{sharedFilesWithUser:{fileId:fileId,fileName:fileName,parentUsername:parentUsername}}})
            .then((result)=>res.send(result))
            .catch((err)=>res.send(err))
        })
    })
    .catch((err)=>res.send(err))
})



router.post('/addFolderAccess',async(req,res)=>{
    
    const {parentUsername,folderId,email,username,folderName}=req.body
    

    FOLDER.updateOne({_id:folderId},{$push:{sharedWith:{username:username}}})
    .then((result)=>{
        USER.updateOne({username:parentUsername},{$push:{sharedFolderByUser:{folderId:folderId,username:username,folderName:folderName}}})
        .then((result)=>{
            USER.updateOne({username:username},{$push:{sharedFolderWithUser:{parentUsername:parentUsername,folderId:folderId,folderName:folderName}}})
            .then((result)=>{
                res.send(result)
            })
            .catch((err)=>res.send(err))
        })
    })
})




router.post('/removeFolderAccess',async(req,res)=>{
    const {parentUsername,folderId,email,username,folderName}=req.body

    FOLDER.updateOne({_id:folderId},{$pull:{sharedWith:{username:username}}})
    .then((result)=>{
        USER.updateOne({username:parentUsername},{$pull:{sharedFolderByUser:{folderId:folderId,username:username,folderName:folderName}}})
        .then((result)=>{
            USER.updateOne({username:username},{$pull:{sharedFolderWithUser:{parentUsername:parentUsername,folderId:folderId,folderName:folderName}}})
            .then((result)=>{
                res.send(result)
            })
            .catch((err)=>res.send(err))
        })
    })
})



module.exports=router

