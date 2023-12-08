const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaGuest = new Schema({
    name : {type:String},
    phone :{type:String}, // Key
    email : {type:String},
    address : {type:String},
    level: {type:String,default:"NORMAL"} // NORMAL, VIP
});

module.exports = mongoose.model('Guest',SchemaGuest)