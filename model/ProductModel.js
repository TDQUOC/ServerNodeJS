const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    code: {type: String, require: true},
    name: {type: String, require: true},   //key
    price: {type: Number, require: true}, //key 
    description: {type: String},
    image: {type: String},
    imageFullPath: {type: String},
}, {timestamps: true});

module.exports = mongoose.model('Product', ProductSchema)