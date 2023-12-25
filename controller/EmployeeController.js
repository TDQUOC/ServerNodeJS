const EmployeeModel = require('../model/EmployeeModel');
const {ResponseData, DeleteFile, GetDate, LoginResponseData} = require("../Plugin/Extension");
const {AddDataSuccess, AddDataFail, GetDataSuccess, GetDataFail, UpdateDataSuccess, UpdateDataFail, DeleteDataSuccess,
    DeleteDataFail
} = require("../AppConfig");
const DaySummaryController = require("./DaySummaryController");
const StoreModel = require("../model/StoreModel");

const add = async (req, res) => {
    try {
        const data = await EmployeeModel.create(req.body);
        if(req.file){
            data.avatar = req.file.path;
        }
        await data.save();
        res.json(ResponseData(true, data, AddDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, AddDataFail))
        if(req.file){
            DeleteFile(req.file.path);
        }
    }
}

const get = async (req, res) => {
    try {
        const data = await EmployeeModel.find();
        res.json(ResponseData(true, data, GetDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, GetDataFail))
    }
}

const update = async (req, res) => {
    try {
        const newData = {
            name: req.body.name,
            phone: req.body.phone,
            position: req.body.position,
            email: req.body.email,
            address: req.body.address,
            status: req.body.status,
            username: req.body.username,
            password: req.body.password,
            date: req.body.date
        }
        if (req.file) {
            const oldImage = await EmployeeModel.findById(req.body.id);
            if(oldImage.avatar) DeleteFile(oldImage.avatar);
            newData.avatar = req.file.path
        }
        const data = await EmployeeModel.findByIdAndUpdate(req.body.id, $set = newData, {new: true});
        res.json(ResponseData(true, data, UpdateDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, UpdateDataFail))
        if (req.file) {
            DeleteFile(req.file.path);
        }
    }
}

const del = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await EmployeeModel.findByIdAndDelete(id);
        if(data.avatar) DeleteFile(data.avatar);
        res.json(ResponseData(true, data, DeleteDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, DeleteDataFail))
    }
}

const login = async (req,res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        
        const auth = await EmployeeModel.findOne({username: username, password: password});
        if(auth){
            const store = await StoreModel.findOne({employeeIds: {$regex: auth._id}});
            if(store){
                //auth.stroreInfo = store;
                const storeId = store._id;
                const storeName = store.name;
                const daySummary = await DaySummaryController.CheckIfExist(storeId, GetDate("yyyy-MM-dd"), storeName);
                if(daySummary.isSuccess){
                    //auth.daySummaryInfo = daySummary.data;
                    return res.json(ResponseData(true, LoginResponseData(auth,daySummary.data), "Đăng nhập thành công!"))
                }else{
                    return res.json(ResponseData(false, auth, "Lỗi server11!"))
                }
            }
            res.json(ResponseData(false, auth, "Lỗi server!"))
        }
        else{
            res.json(ResponseData(false, auth, "Đăng nhập thất bại!"))
        }
    }
    catch (e) {
        res.json(ResponseData(false, e.message, "Đăng nhập thất bại!"))
    }
}


module.exports ={
    add,
    get,
    update,
    del,
    login
}