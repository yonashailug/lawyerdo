const multer  = require('multer')
const { Router } = require('express')

const config = require('../../config')

const storage = multer.diskStorage({
    destination: config.path.upload.images,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.jpg`)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 3 // 3MB
    },
    fileFilter: (req, file, cb) => {
        if (['image/jpg', 'image/jpeg'].includes(file.mimetype)) {
            cb(null, true)
        } else {
            return cb(new Error('bad request'))
        }
    }
})

const route = Router()

module.exports = (app) => {

    app.use('/picture', route)

    route.post('', upload.single('file'), (req, res) => {

        return res.json({
            data: {
                picture: req.file.filename
            }
        }).status(200)
    })
}