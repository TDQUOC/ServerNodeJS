const mongoose = require('mongoose');
const extension = require("../Plugin/Extension");
const {DetailProduct} = require("../Plugin/ModelExtension");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    province: {type: String, require: true}, //key
    name: {type: String, require: true}, //key
    address: {type: String, require: true},
    phone: {type: String},
    description: {type: String},
    date: {type: String, default: extension.GetDate("yyyy-MM-dd")},
    status: {type: String, default: "active"},
    image: {type: String},
    imageFullPath: {type: String},
    employeeIds: [{type: String}],
    storage: [DetailProduct]
}, {timestamps: true});


module.exports = mongoose.model('Store', StoreSchema);