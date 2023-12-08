const mogoose = require('mongoose');
const Schema = mogoose.Schema;
const extension = require('./Plugin/Extension');

const EmployeeSchema = new Schema({
    name:{type: String,require:true},   //key
    phone:{type: String, require: true}, //key 
    position:{type: String},
    email:{type:String},
    address:{type:String},
    avatar:{type:String},
    status:{type:String,default: "active"},
    username:{type:String,require:true}, //key login
    password:{type:String,require:true},
    date:{type:String,default:extension.GetDate("yyyy-MM-dd")},
})