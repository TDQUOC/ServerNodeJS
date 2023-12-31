﻿const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const extension = require('../Plugin/Extension');

const EmployeeSchema = new Schema({
    name: {type: String, require: true},   //key
    phone: {type: String, require: true}, //key 
    position: {type: String},
    email: {type: String},
    address: {type: String},
    avatar: {type: String},
    avatarFullPath: {type: String},
    status: {type: String, default: "active"},
    username: {type: String, require: true}, //key login
    password: {type: String, require: true},
    date: {type: String, default: extension.GetDate("yyyy-MM-dd")},
}, {timestamps: true});

module.exports = mongoose.model('Employee', EmployeeSchema)