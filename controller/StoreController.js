const StoreModel = require('../model/StoreModel');
const {ResponseData, DeleteFile} = require("../Plugin/Extension");
const {
    GetDataSuccess,
    GetDataFail,
    UpdateDataSuccess,
    UpdateDataFail,
    DeleteDataSuccess,
    DeleteDataFail, AddDataSuccess, AddDataFail
} = require("../AppConfig");
const bodyParser = require('body-parser');
const get = async (req, res) => {
    try {
        const data = await StoreModel.find();
        res.json(ResponseData(true, data, GetDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, GetDataFail))
    }
}

const update = async (req, res) => {
    try {
        const newData = {
            province: req.body.province,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            description: req.body.description,
            date: req.body.date,
            status: req.body.status,
            employeeIds: req.body.employeeIds,
            storage: req.body.storage
        }
        if (req.file) {
            const oldImage = await StoreModel.findById(req.body.id);
            DeleteFile(oldImage.image);
            newData.image = req.file.path
        }
        const data = await StoreModel.findByIdAndUpdate(req.body.id, $set = newData, {new: true});
        res.json(ResponseData(true, data, UpdateDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, UpdateDataFail))
        if (req.file) {
            DeleteFile(req.file.path);
        }
    }
}
const getByID = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await StoreModel.findById(id);
        res.json(ResponseData(true, data, GetDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, GetDataFail))
    }
}

const del = async (req, res) => {
    try {

        const id = req.body.id;
        console.log(id)
        const find = await StoreModel.findById(id);
        if (find.image) {
            console.log(find.image)
            DeleteFile(find.image);
        }
        const data = await StoreModel.findByIdAndDelete(id);
        res.json(ResponseData(true, data, DeleteDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, DeleteDataFail))
    }
}

const add = async (req, res) => {
    try {
        const data = await StoreModel({
            province: req.body.province,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            description: req.body.description,
            date: req.body.date,
            status: req.body.status,
            imageFullPath: req.body.imageFullPath,
            employeeIds: req.body.employeeIds,
            storage: req.body.storage
        });
        if (req.file) {
            data.image = req.file.path
        }
        await data.save();
        res.json(ResponseData(true, data, GetDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, GetDataFail))
        if (req.file) {
            DeleteFile(req.file.path);
        }
    }
}

const addEmployee = async (req, res) => {
    try {
        const id = req.body.id;
        const employeeId = req.body.employeeId;
        const data = await StoreModel.findById(id);
        data.employeeIds.push(employeeId);
        await data.save();
        res.json(ResponseData(true, data, AddDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, AddDataFail))

    }
}


module.exports = {
    get,
    update,
    del,
    add,
    getByID,
    addEmployee
}