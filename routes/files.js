const router = require('express').Router()
const FILE = require('../models/file.models')
const formidable = require('formidable')
const fs = require('fs')
const FOLDER = require('../models/folder.models')



router.post('/addfile', async (req, res) => {

    var form = new formidable.IncomingForm()
    form.keepExtensions
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'DOCUMENT HAS NOT BE UPLOADED'
            })
        }

        const { fileName, id } = fields

        let value
        let type

        if (files.image) {
            value = fs.readFileSync(files.image.path)
            type = files.image.type
        }

        if (files.application) {
            value = fs.readFileSync(files.application.path)
            type = files.application.type
        }

        if (files.video) {
            value = fs.readFileSync(files.video.path)
            type = files.video.type
        }

        const newfile = new FILE({
            fileName: fileName,
            data: value,
            contentType: type
        })
        newfile.save()
        .then((result) => {
            FOLDER.updateOne({ _id: id }, { $push: { files: { fileName: fileName, fileId: result['_id'], contentType: type } } })
            .then((result) => res.send(result))
            .catch((err) => res.send(err))
        })
    })

})


router.post('/removefile', async (req, res) => {
    const { id, parentId } = req.body

    FILE.deleteOne({ _id: id })
    .then((result) => {
        FOLDER.updateOne({ _id: parentId }, { $pull: { files: { fileId: id } } })
        .then((result) => res.send(result))
        .catch((err) => res.send(err))
    })
})


router.get('/getfile', async (req, res) => {
    const id = req.query.id

    FILE.findOne({ _id: id })
    .then((result) => {
        res.set('Content-Type', result['contentType'])
        res.send(result['data'])
    })
})




router.post('/getfileinfo', async (req, res) => {
    const id = req.body.id

    FILE.findOne({ _id: id })
    .then((result) => {
        result.set('data', undefined)
        res.send(result)
    })
    .catch((err) => res.send(err))
})


module.exports = router

