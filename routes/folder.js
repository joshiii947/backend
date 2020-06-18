const router = require('express').Router()
const FOLDER = require('../models/folder.models')



router.post('/createFolder', async (req, res) => {
    const { folderName, id, parentId } = req.body

    const newfolder = new FOLDER({
        folderName: folderName,
        parentId: id
    })

    newfolder.save()
    .then((result) => {
        FOLDER.updateOne({ _id: id }, { $push: { folders: { folderId: result['_id'], folderName: folderName } } })
        .then((result) => res.send(result))
        .catch((err) => res.send(err))
    })
    .catch((err) => res.send(err))

})




///    DELETEING NESTED ELEMENT ON THE FOLDERS And FILES

router.post('/deleteFolder', async (req, res) => {

    const { id, parentId } = req.body


    FOLDER.deleteOne({ _id: id })
    .then((result) => {
        FOLDER.updateOne({ _id: parentId }, { $pull: { folders: { folderId: id } } })
        .then((result) => res.send(result))
            .catch((err) => res.send(err))
        })
    .catch((err) => res.send(err))
})



router.post('/userfolderdetails', async (req, res) => {
    const id = req.body.id

    FOLDER.findOne({ parentId: id })
    .then((result) => res.send(result))
    .catch((err) => res.send(err))

})

router.post('/folderdetails', async (req, res) => {
    const id = req.body.id


    FOLDER.findOne({ _id: id })
    .then((result) => res.send(result))
    .catch((err) => res.send(err))

})





module.exports = router

