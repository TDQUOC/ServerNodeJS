const EmployeeModel = require('../model/EmployeeModel');
const Extension = require('../Plugin/Extension');
const {CheckNullString} = require("../Plugin/Extension");

//GET

const getAll = async (req, res) => {
    try {
        let result = await EmployeeModel.find();
        res.json(Extension.ResponseData(true, result, 'Lấy dữ liệu thành công!'));
    } catch (e) {
        res.status(404).json(Extension.ResponseData(false, e, 'Lấy dữ liệu thất bại!'));
    }
}

const getById = async (req, res) => {
    // input query.id
    try {
        let result = await EmployeeModel.findById(req.query.id);
        res.json(Extension.ResponseData(true, result, 'Lấy dữ liệu thành công!'));
    } catch (e) {
        res.status(404).json(Extension.ResponseData(false, e, 'Lấy dữ liệu thất bại!'));
    }
}

const getByPosition = async (req, res) => {
    // input query.position
    try {
        let result = await EmployeeModel.find({position: req.query.position});
        res.json(Extension.ResponseData(true, result, 'Lấy dữ liệu thành công!'));
    } catch (e) {
        res.status(404).json(Extension.ResponseData(false, e, 'Lấy dữ liệu thất bại!'));
    }
}

const getByInfo = async (req, res) => {
    //input query.phone or query.name
    try {
        let result;
        if (!CheckNullString(req.query.phone)) {
            result = await EmployeeModel.find({phone: req.query.phone});
            return res.json(Extension.ResponseData(true, result, 'Lấy dữ liệu thành công!'));
        } else if (!CheckNullString(req.query.name)) {
            result = await EmployeeModel.find({name: {$regex: req.query.name}});
            return res.json(Extension.ResponseData(true, result, 'Lấy dữ liệu thành công!'));
        } else {
            return res.json(Extension.ResponseData(false, null, 'Không tìm thấy nhân viên có thông tin như trên!'));
        }
    } catch (e) {
        res.status(404).json(Extension.ResponseData(false, e, 'Lấy dữ liệu thất bại!'));
    }
}

const login = async (req, res) => {
    try {
        let result = await EmployeeModel.findOne({username: req.query.username, password: req.query.password});
        if (result) {
            res.json(Extension.ResponseData(true, result, 'Đăng nhập thành công!'));
        } else {
            res.json(Extension.ResponseData(false, null, 'Đăng nhập thất bại!'));
        }
    } catch (e) {
        res.status(404).json(Extension.ResponseData(false, e, 'Lấy dữ liệu thất bại!'));
    }
}

//POST

const update = async (req, res) => {
    //input body query body.id
    try {
        let result = await EmployeeModel.findByIdAndUpdate(req.body.id, req.body);
        res.json(Extension.ResponseData(true, result, 'Cập nhật nhân viên có th như trên!'));
    } catch (e) {
        res.json(Extension.ResponseData(false, e, 'Cập nhật nhân viên thất bị!'));
    }
}

const del = async (req, res) => {
    //input body query body.id
    try {
        let result = await EmployeeModel.findByIdAndDelete(req.body.id);
        res.json(Extension.ResponseData(true, result, 'Xóa nhân viên có th như trên!'));
    } catch (e) {
        res.json(Extension.ResponseData(false, e, 'Xóa nhân viên thất bị!'));
    }
}

const add = async (req, res) => {
    //input body
    try {
        let result = new EmployeeModel(req.body);
        await result.save();
        res.json(Extension.ResponseData(true, result, 'Tạo nhân viên có th như trên!'));
    } catch (e) {
        res.json(Extension.ResponseData(false, e, 'Tạo nhân viên thểat bị!'));
    }
}

// Reference Method 

const addNew = async (data) => {
    //input body
    try {
        let result = new EmployeeModel(data);
        await result.save();
        return Extension.ResponseData(true, result, 'Tạo nhân viên thành công!');
    } catch (e) {
        return Extension.ResponseData(false, e, 'Tạo nhân viên thất bại!');
    }
}

module.exports = {
    getAll,
    getById,
    getByPosition,
    getByInfo,
    login,
    update,
    del,
    add,
    addNew
}




