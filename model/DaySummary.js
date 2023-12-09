const mongoose = require('mongoose');
const extension = require("../Plugin/Extension");
const Schema = mongoose.Schema;

const DaySummarySchema = new Schema({
    date: {type: String, default: extension.GetDate("yyyy-MM-dd")},
    storeId: {type: String, require: true},
    storeName: {type: String, require: true},
    summaryBill: [{
        employeeId: {type: String},
        employeeName: {type: String},
        guestId:{type: String},
        guestName: {type: String},
        detail: [{
            productId: {type: String},
            productName : {type: String},
            quantity: {type: Number, default: 0}
        }],
        money: {type: Number, default: 0},
        note: {type: String, default: 0}
    }],
    importOrExport: [{
        employeeId: {type: String},
        employeeName: {type: String},
        detail: [
            {
                importOrExport: {type: String}, //import or export storage
                productId: {type: String},
                productName : {type: String},
                quantity: {type: Number, default: 0},
                note: {type: String}
            }
        ],
        time: extension.GetDate('HH:mm:ss')
    }],
    checkIn: [{
        employeeId: {type: String},
        employeeName: {type: String},
        time: extension.GetDate('HH:mm:ss'),
        image: {type: String},
        imageFullPath: {type: String}
    }],
    checkOut: [{
        employeeId: {type: String},
        employeeName: {type: String},
        time: extension.GetDate('HH:mm:ss'),
        image: {type: String},
        imageFullPath: {type: String}
    }]
}, {timestamps: true});

module.exports = mongoose.model('DaySummary', DaySummarySchema);