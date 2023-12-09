const GuestModel = require('../model/GuestModel');
const Extension = require('../Plugin/Extension');
const {CheckNullString} = require("../Plugin/Extension");

//GET

const getAll = async (req, res) => {
    try {
        let result = await GuestModel.find();
        res.json(Extension.ResponseData(true, result, 'Lấy dữ liệu khách hàng thành công!'))
    } catch (e) {
        res.status(404).json(Extension.ResponseData(false, e, 'Lấy dữ liệu khách hàng thất bại!'))
    }
}

const getByID = async (req, res) => {
    //input query.id
    try {
        let result = await GuestModel.findById(req.query.id);
        res.json(Extension.ResponseData(true, result, 'Lấy dữ liệu khách hàng thành công!'))
    } catch (e) {
        res.status(404).json(Extension.ResponseData(false, e, 'Lấy dữ liệu khách hàng thất bại!'))
    }
}

const findByInfo = async (req, res) => {
    //input query.phone or query.name
    try {
        let result;
        if (!CheckNullString(req.body.phone)) {
            result = await GuestModel.find({phone: req.body.phone});
            return res.json(Extension.ResponseData(true, result, 'Lấy dữ liệu khách hàng thành công!'))
        } else if (!CheckNullString(req.body.name)) {
            result = await GuestModel.find({name: {$regex: req.body.name}});
            return res.json(Extension.ResponseData(true, result, 'Lấy dữ liệu khách hàng thành công!'))
        } else {
            return res.json(Extension.ResponseData(false, e, 'Không tìm thấy khách hàng có thông tin như trên!'))
        }
    } catch (e) {
        res.status(404).json(Extension.ResponseData(false, e, 'Lấy dữ liệu khách hàng thất bại!'))
    }
}

//POST

const update = async (req, res) => {
    //input body query body.id
    try {
        let result = await GuestModel.findByIdAndUpdate(req.body.id, req.body);
        res.json(Extension.ResponseData(true, result, 'Cập nhật thông tin khách hàng thành công!'));
    } catch (e) {
        res.json(Extension.ResponseData(false, e, 'Cập nhật thông tin khách hàng thất bại!'));
    }
}

const del = async (req, res) => {
    //input body.id
    try {
        let result = await GuestModel.findByIdAndDelete(req.body.id);
        res.json(Extension.ResponseData(true, result, 'Xóa khách hàng thành công!'));
    } catch (e) {
        res.json(Extension.ResponseData(false, e, 'Xóa khách hàng thất bại!'));
    }
}

// Reference Method

const add = async (data) => {
    //input body
    try {
        // check exist
        let checkExist = await GuestModel.findOne({phone: data.phone});
        if (checkExist.length > 0) {
            return Extension.ResponseData(false, checkExist, 'Số điện thoại khách hàng đã tồn tại!');
        }
        let result = new GuestModel(data);
        await result.save();
        return Extension.ResponseData(true, result, 'Tạo khách hàng thành công!');
    } catch (e) {
        res.json(Extension.ResponseData(false, e, 'Tạo khách hàng thất bị!'));
    }
}


module.exports = {
    getAll,
    getByID,
    findByInfo,
    update,
    del,
    add
}