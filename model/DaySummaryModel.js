const mongoose = require('mongoose');
const extension = require("../Plugin/Extension");
const {DetailProduct} = require("../Plugin/ModelExtension");
const Schema = mongoose.Schema;

const DaySummarySchema = new Schema({
    date: {type: String, default: extension.GetDate("yyyy-MM-dd")},
    storeId: {type: String, require: true},
    storeName: {type: String, require: true},
    summaryBill: [{
        billId: {type: String},
        employeeId: {type: String},
        employeeName: {type: String},
        guestId: {type: String},
        guestName: {type: String},
        detail: [DetailProduct],
        money: {type: Number, default: 0},
        note: {type: String, default: 0}
    }],
    importOrExport: [{
        employeeId: {type: String},
        employeeName: {type: String},
        importOrExport: {type: String},
        detail: [DetailProduct],
        note: {type: String},
        time: {type: String, default: extension.GetDate('HH:mm:ss')},
    }],
    checkIn: [{
        employeeId: {type: String},
        employeeName: {type: String},
        time: {type: String},
        image: {type: String},
        imageFullPath: {type: String}
    }],
    checkOut: [{
        employeeId: {type: String},
        employeeName: {type: String},
        time: {type: String},
        image: {type: String},
        imageFullPath: {type: String}
    }]
}, {timestamps: true});

module.exports = mongoose.model('DaySummary', DaySummarySchema);