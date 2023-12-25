const BillController = require('../controller/BillController');
const express = require('express');
const {uploadBill} = require("../middleware/upload");
const router = express.Router();

router.get('/', BillController.get);
router.post('/add',uploadBill.single("image"), BillController.add);
router.post('/update',uploadBill.single("image"), BillController.update);
router.post('/del',uploadBill.single("image"), BillController.del);

module.exports = router;