const mongoose = require('mongoose');
const {DetailProduct} = require("../Plugin/ModelExtension");
const extension = require("../Plugin/Extension");
const Schema = mongoose.Schema;

const billSchema = new Schema({
    storeId: {type: String, require: true},
    storeName: {type: String, require: true},
    guestId: {type: String, require: true},
    guestName: {type: String, require: true},
    employeeId: {type: String, require: true},
    employeeName: {type: String, require: true},
    detail: [DetailProduct],
    gift: [DetailProduct],
    totalMoney: {type: Number, default: 0},
    discountMoney: {type: Number, default: 0},
    finalMoney: {type: Number, default: 0},
    discountCode: {type: String},
    giftCode: {type: String},
    status: {type: String, default: "paid"}, // paid, ordered, cancel
    image: {type: String},
    imageFullPath: {type: String},
    time: {type: String, default: extension.GetDate('yyyy-MM-dd-HH:mm:ss')},
    note: {type: String, default: 0}
}, {timestamps: true});

module.exports = mongoose.model('Bill', billSchema)