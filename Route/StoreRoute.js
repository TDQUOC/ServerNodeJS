const Controller = require("../controller/StoreController")
const express = require("express");
const {upload, uploadStore} = require("../middleware/upload");
const router = express.Router();


router.get('/', Controller.get);
router.post('/add',uploadStore.single("image"), Controller.add);
router.post('/update',uploadStore.single("image"), Controller.update);
router.post('/del',uploadStore.single(""), Controller.del);
router.post('/addEmployee',uploadStore.single("image"), Controller.addEmployee);

module.exports = router