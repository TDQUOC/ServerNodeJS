const BillModel = require('../model/BillModel');
const {DeleteFile, ResponseData} = require("../Plugin/Extension");
const {
    AddDataSuccess, AddDataFail, GetDataSuccess, GetDataFail, UpdateDataSuccess, UpdateDataFail, DeleteDataSuccess,
    DeleteDataFail
} = require("../AppConfig");


const add = async (req, res) => {
    try {
        const data = await new BillModel({
            storeId: req.body.storeId,
            storeName: req.body.storeName,
            guestId: req.body.guestId,
            guestName: req.body.guestName,
            employeeId: req.body.employeeId,
            employeeName: req.body.employeeName,
            detail: JSON.parse(req.body.detail),
            gift: JSON.parse(req.body.gift),
            totalMoney: req.body.totalMoney,
            discountMoney: req.body.discountMoney,
            finalMoney: req.body.finalMoney,
            discountCode: req.body.discountCode,
            giftCode: req.body.giftCode,
            status: req.body.status,
            note: req.body.note,
        });
        if (req.file) {
            data.image = req.file.path;
        }
        await data.save();
        res.json(ResponseData(true, data, AddDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, AddDataFail))
        if (req.file) {
            DeleteFile(req.file.path);
        }
    }
}

const get = async (req, res) => {
    try {
        const data = await BillModel.find();
        res.json(ResponseData(true, data, GetDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, GetDataFail))
    }
}

const update = async (req, res) => {
    try {
        const detailBill = JSON.parse(req.body.detail);
        const giftBill = JSON.parse(req.body.gift);
        const newData = {
            storeId: req.body.storeId,
            storeName: req.body.storeName,
            guestId: req.body.guestId,
            guestName: req.body.guestName,
            employeeId: req.body.employeeId,
            employeeName: req.body.employeeName,
            detail: detailBill,
            gift: giftBill,
            totalMoney: req.body.totalMoney,
            discountMoney: req.body.discountMoney,
            finalMoney: req.body.finalMoney,
            discountCode: req.body.discountCode,
            giftCode: req.body.giftCode,
            status: req.body.status
        }
        console.log(req.body.detail)
        if (req.file) {
            const oldImage = await BillModel.findById(req.body.id);
            if (oldImage.image) DeleteFile(oldImage.image);
            newData.image = req.file.path
        }
        const data = await BillModel.findByIdAndUpdate(req.body.id, $set = newData, {new: true});
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
        const data = await BillModel.findByIdAndDelete(id);
        if (data.image) DeleteFile(data.image);
        res.json(ResponseData(true, data, DeleteDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, DeleteDataFail))
    }
}

const addFunction = async (inputdata, imagepath) => {
    try {
        const data = await new BillModel({
            storeId: inputdata.storeId,
            storeName: inputdata.storeName,
            guestId: inputdata.guestId,
            guestName: inputdata.guestName,
            employeeId: inputdata.employeeId,
            employeeName: inputdata.employeeName,
            detail: inputdata.detail,
            gift: inputdata.gift,
            totalMoney: inputdata.totalMoney,
            discountMoney: inputdata.discountMoney,
            finalMoney: inputdata.finalMoney,
            discountCode: inputdata.discountCode,
            giftCode: inputdata.giftCode,
            status: inputdata.status,
            note: inputdata.note,
        });
        if (imagepath != null) {
            data.image = imagepath;
        }
        await data.save();
        return ResponseData(true, data, AddDataSuccess)
    } catch (e) {
        if (imagepath) {
            DeleteFile(imagepath);
        }
        return ResponseData(false, e.message, AddDataFail)
    }
}

module.exports = {
    add,
    get,
    update,
    del, 
    addFunction
}