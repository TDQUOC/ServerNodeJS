const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    // khai báo nơi lưu file
    destination: function (req, file, callback) {
        callback(null, "upload/")
    },
    filename: function (req, file, callback) {
        let ext = path.extname(file.originalname)
        callback(null, Date.now() + ext)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            callback(null, true)
        } else {
            console.log("upload file wrong type!")
            callback(null, false)
        }
    },
    // giới hạn file
    limits: {
        // giới hạn ở 10 mb
        fileSize: 1024 * 1024 * 10
    }
})

module.exports = upload