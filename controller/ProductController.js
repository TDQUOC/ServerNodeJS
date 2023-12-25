const ProductModel = require('../model/ProductModel');
const {ResponseData, DeleteFile} = require("../Plugin/Extension");
const {AddDataSuccess, AddDataFail, GetDataSuccess, GetDataFail, DeleteDataSuccess, DeleteDataFail, UpdateDataSuccess,
    UpdateDataFail
} = require("../AppConfig");

const add = async (req, res) => {
    try {
        const data = await ProductModel.create(req.body);
        if(req.file){
            data.image = req.file.path;
        }
        data.save();
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
        const data = await ProductModel.find();
        res.json(ResponseData(true, data, GetDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, GetDataFail))
    }
}

const update = async (req, res) => {
    try {
        const newData = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        }
        if (req.file) {
            const oldImage = await ProductModel.findById(req.body.id);
            if(oldImage.image) DeleteFile(oldImage.image);
            newData.image = req.file.path
        }
        const data = await ProductModel.findByIdAndUpdate(req.body.id, $set = newData, {new: true});
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
        const data = await ProductModel.findByIdAndDelete(id);
        if(data.image) DeleteFile(data.image);
        res.json(ResponseData(true, data, DeleteDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, DeleteDataFail))
    }
}

module.exports = {
    add,
    get,
    update,
    del
}