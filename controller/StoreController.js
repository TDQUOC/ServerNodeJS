const StoreModel = require("../model/StoreModel");
const extension = require("../Plugin/Extension");

//=>GET
const getSummary = async (req, res) => {
    // input null
    try {
        const result =
            await StoreModel.find({}, "_id province name address status");
        res.json(extension.ResponseData(true, result, "Lấy dữ liệu thành công!"));
    } catch (e) {
        extension.DebugLog(3, e);
        res.status(404).json(extension.ResponseData(false, e, "Lấy dữ liệu thất bại! "));
    }
}

const getByID = async (req, res) => {
    // input query.id
    try {
        const result = StoreModel.findById(req.query.id);
        res.json(extension.ResponseData(true, result, "Lấy dữ liệu thành công!"));
    } catch (e) {
        extension.DebugLog(3, e);
        res.status(404).json(extension.ResponseData(false, e, "Lấy dữ liệu thất bại! "));
    }
}

const getByProvince = async (req, res) => {
    // input query.province
    try {
        const result =
            await StoreModel.find({province: req.query.province}, "_id province name address status");
        res.json(extension.ResponseData(true, result, "Lấy dữ liệu thành công!"));
    } catch (e) {
        extension.DebugLog(3, e);
        res.status(404).json(extension.ResponseData(false, e, "Lấy dữ liệu thất bại! "));
    }
}

const getByStatus = async (req, res) => {
    // input query.status
    try {
        const result =
            await StoreModel.find({status: req.query.status}, "_id province name address status");
        res.json(extension.ResponseData(true, result, "Lấy dữ liệu thành công!"));
    } catch (e) {
        extension.DebugLog(3, e);
        res.status(404).json(extension.ResponseData(false, e, "Lỗi dữ liệu thất bại! "));
    }
}

//=> POST
const add = async (req, res) => {
    // input body
    try {
        const checkExist = await StoreModel.findOne({$and: [{province: req.body.province}, {name: req.body.name}]});
        if (checkExist.length > 0) {
            return res.json(extension.ResponseData(false, checkExist, "Cửa hàng đã tồn tại!"));
        }
        const result = new StoreModel(req.body);
        await result.save();
        res.json(extension.ResponseData(true, result, "Tạo cửa hàng thành công!"));
    } catch (e) {
        extension.DebugLog(3, e);
        res.status(404).json(extension.ResponseData(false, e, "Tạo cửa hàng thất bại!"));
    }
}

const update = async (req, res) => {
    // input body query body.id
    try {
        const result = await StoreModel.findByIdAndUpdate(req.body.id, req.body);
        res.json(extension.ResponseData(true, result, "Cập nhật thông tin cửa hàng thành công!"));
    } catch (e) {
        extension.DebugLog(3, e);
        res.status(404).json(extension.ResponseData(false, e, "Cập nhật thông tin cửa hàng thất bại!"));
    }
}

const del = async (req, res) => {
    // input body.id
    try {
        const result = await StoreModel.findByIdAndDelete(req.body.id);
        res.json(extension.ResponseData(true, result, "Xóa cửa hàng thành công!"));
    } catch (e) {
        extension.DebugLog(3, e);
        res.status(404).json(extension.ResponseData(false, e, "Xóa cửa hàng thất bại!"));
    }
}


// EXPORT

module.exports = {
    getSummary,
    getByID,
    getByProvince,
    getByStatus,
    add,
    update,
    del
}
