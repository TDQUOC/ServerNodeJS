const ProductController = require('../controller/ProductController');
const express = require('express');
const {uploadProduct} = require("../middleware/upload");
const router = express.Router();

router.get('/', ProductController.get);
router.post('/add', uploadProduct.single("image"), ProductController.add);
router.post('/update', uploadProduct.single("image"), ProductController.update);
router.post('/del', uploadProduct.single("image"), ProductController.del);

module.exports = router;