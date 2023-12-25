const GuestController = require('../controller/GuestController');
const express = require('express');
const {upload} = require("../middleware/upload");
const router = express.Router();

router.get('/', GuestController.get);
router.post('/update',upload.single('null'), GuestController.update);
router.post('/del',upload.single('null'), GuestController.del);
router.post('/add',upload.single('null'), GuestController.add);

module.exports = router;