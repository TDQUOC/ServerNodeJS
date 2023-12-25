const GuestModel = require('../model/GuestModel');
const {ResponseData} = require("../Plugin/Extension");

const addFunction = async (data) => {
    try {
        const result = await GuestModel.create(data);
        await result.save();
        return ResponseData(true, result, "Add guest success");
    } catch (e) {
        return ResponseData(false, e.message, "Add guest fail");
    }
}

const add = async (req, res) => {
    try {
        const result = await GuestModel.create(req.body);
        await result.save();
        res.json(ResponseData(true, result, "Add guest success"))
    }catch (e) {
        res.json(ResponseData(false, e.message, "Add guest fail"))
    }
}

const get = async (req, res) => {
    try {
        const data = await GuestModel.find();
        res.json(ResponseData(true, data, "Get guest success"))
    } catch (e) {
        res.json(ResponseData(false, e.message, "Get guest fail"))
    }
}

const update = async (req, res) => {
    try {
        const newData = {
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            email: req.body.email,
            level: req.body.level
        }
        const data = await GuestModel.findByIdAndUpdate(req.body.id, $set = newData, {new: true});
        res.json(ResponseData(true, data, "Update guest success"))
    } catch (e) {
        res.json(ResponseData(false, e.message, "Update guest fail"))
    }
}

const del = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await GuestModel.findByIdAndDelete(id);
        res.json(ResponseData(true, data, "Delete guest success"))
    } catch (e) {
        res.json(ResponseData(false, e.message, "Delete guest fail"))
    }
}

module.exports = {
    add,
    get,
    update,
    del,
    addFunction
}