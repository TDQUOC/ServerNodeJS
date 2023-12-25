const Controller = require("../controller/EmployeeController")
const express = require("express");
const {uploadEmployee} = require("../middleware/upload");
const router = express.Router();

router.post('/add', uploadEmployee.single("avatar"), Controller.add);
router.get('/', Controller.get);
router.post('/update', uploadEmployee.single("avatar"), Controller.update);
router.post('/delete', uploadEmployee.single("del"), Controller.del);
router.post('/login',uploadEmployee.single(""), Controller.login);

module.exports = router