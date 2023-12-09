const path = require('path')
const multer = require('multer')
const appConfig = require('../AppConfig')

//storage
let storage = multer.diskStorage({
    // khai báo nơi lưu file
    destination: function (req, file, callback) {
        callback(null, "upload/")
    },
    filename: function (req, file, callback) {
        let ext = path.extname(file.originalname)
        callback(null, Date.now() + ext)
    }
})

let productStorage = multer.diskStorage({
    // khai báo nơi lưu file
    destination: function (req, file, callback) {
        callback(null, "upload/product/")
    },
    filename: function (req, file, callback) {
        let ext = path.extname(file.originalname)
        callback(null, Date.now() + ext)
    }
})

let billStorage = multer.diskStorage({
    // khai báo nơi lưu file
    destination: function (req, file, callback) {
        callback(null, "upload/bill/")
    },
    filename: function (req, file, callback) {
        let ext = path.extname(file.originalname)
        callback(null, Date.now() + ext)
    }
})

let checkInStorage = multer.diskStorage({
    // khai báo nơi lưu file
    destination: function (req, file, callback) {
        callback(null, "upload/checkin/")
    },
    filename: function (req, file, callback) {
        let ext = path.extname(file.originalname)
        callback(null, Date.now() + ext)
    }
})

let checkOutStorage = multer.diskStorage({
    // khai báo nơi lưu file
    destination: function (req, file, callback) {
        callback(null, "upload/checkout/")
    },
    filename: function (req, file, callback) {
        let ext = path.extname(file.originalname)
        callback(null, Date.now() + ext)
    }
})


//upload
let upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
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
        fileSize: 1024 * 1024 * appConfig.LimitSizeFile
    }
})

let uploadProduct = multer({
    storage: productStorage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
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
        fileSize: 1024 * 1024 * appConfig.LimitSizeFile
    }
})

let uploadBill = multer({
    storage: billStorage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
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
        fileSize: 1024 * 1024 * appConfig.LimitSizeFile
    }
})

let uploadCheckIn = multer({
    storage: checkInStorage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            callback(null, true)
        } else {
            console.log("upload file wrong type!")
            callback(null, false)
        }
    },
    // giể hợp file
    limits: {
        // giể hợp 10 mb
        fileSize: 1024 * 1024 * appConfig.LimitSizeFile
    }
})

let uploadCheckOut = multer({
    storage: checkOutStorage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            callback(null, true)
        } else {
            console.log("upload file wrong type!")
            callback(null, false)
        }
    },
    // giể hợp file
    limits: {
        // giể hợp 10 mb
        fileSize: 1024 * 1024 * appConfig.LimitSizeFile
    }
})


module.exports = {
    upload,
    uploadProduct,
    uploadBill,
    uploadCheckIn,
    uploadCheckOut
}