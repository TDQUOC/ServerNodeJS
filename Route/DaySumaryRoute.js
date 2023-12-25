const DaySummaryController = require('../controller/DaySummaryController');

const express = require('express');
const {upload, uploadBill, uploadCheckIn, uploadCheckOut, uploadImportOrExport} = require("../middleware/upload");
const DaySummaryRoute = express.Router();

DaySummaryRoute.get('/', DaySummaryController.get);
DaySummaryRoute.post('/getbyid',upload.single("image"), DaySummaryController.getByID);
DaySummaryRoute.post('/add',upload.single("image"), DaySummaryController.add);
DaySummaryRoute.post('/update',upload.single("image"), DaySummaryController.update);
DaySummaryRoute.post('/delete',upload.single("image"), DaySummaryController.del);
DaySummaryRoute.post('/addBill',uploadBill.single("image"), DaySummaryController.addBill);
DaySummaryRoute.post('/addImportOrExport',uploadImportOrExport.single("image"), DaySummaryController.addImportOrExport);
DaySummaryRoute.post('/addCheckIn',uploadCheckIn.single("image"), DaySummaryController.addCheckIn);
DaySummaryRoute.post('/addCheckOut',uploadCheckOut.single("image"), DaySummaryController.addCheckOut);

module.exports = DaySummaryRoute;