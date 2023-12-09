const ProductModel = require('../model/ProductModel');
const extension = require('../Plugin/Extension');


// GET
const getSummary = async (req, res) => {
    // input null
    try {
        const result =
            await ProductModel.find({}, "_id name price");
        res.json(extension.ResponseData(true, result, "Lấy dữ liệu thành công!"));
    } catch (e) {
        extension.DebugLog(3, e);
        res.status(404).json(extension.ResponseData(false, e, "Lấy dữ liệu thất bại!"));
    }
};

const getById = async (req, res) => {
    // input query.id
    try {
        const result = await ProductModel.findById(req.query.id);
        res.json(extension.ResponseData(true, result, "Lấy dữ liệu thành công!"));
    } catch (e) {
        extension.DebugLog(3, e);
        res.status(404).json(extension.ResponseData(false, e, "Lấy dữ liệu thất bại!"));
    }
};

//POST
const add = async (req, res) => {
    // input body
    try {
        const checkExist = await ProductModel.findOne({code: req.body.code});
        if (checkExist) {
            return res.json(extension.ResponseData(false, checkExist, "Sản phẩm đã tồn tại!"));
        }
        const result = new ProductModel(req.body);
        await result.save();
        res.json(extension.ResponseData(true, result, "Tạo sản phẩm thành công!"));
    } catch (e) {
        extension.DebugLog(3, e);
        res.status(404).json(extension.ResponseData(false, e, "Tạo sản phẩm thất bại!"));
    }
};

const update = async (req, res) => {
    // input body query body.id
    try {
        const result = await ProductModel.findByIdAndUpdate(req.body.id, req.body);
        res.json(extension.ResponseData(true, result, "Cập nhật sản phẩm thành công!"));
    } catch (e) {
        extension.DebugLog(3, e);
        res.status(404).json(extension.ResponseData(false, e, "Cập nhật sản phẩm thất bại!"));
    }
};

const del = async (req, res) => {
    // input body.id
    try {
        const result = await ProductModel.findByIdAndDelete(req.body.id);
        res.json(extension.ResponseData(true, result, "Xóa sản phẩm thành công!"));
    } catch (e) {
        extension.DebugLog(3, e);
        res.status(404).json(extension.ResponseData(false, e, "Xóa sản phẩm thất bại!"));
    }
};

module.exports = {
    getSummary,
    getById,
    add,
    update,
    del
}