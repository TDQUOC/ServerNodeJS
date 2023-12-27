const DaySummaryModel = require('../model/DaySummaryModel');
const {ResponseData, GetDate, DeleteFile, DebugLog} = require("../Plugin/Extension");
const {
    AddDataSuccess, AddDataFail, GetDataSuccess, GetDataFail, UpdateDataSuccess, UpdateDataFail, DeleteDataSuccess,
    DeleteDataFail
} = require("../AppConfig");

const BillController = require("./BillController");

const get = async (req, res) => {
    try {
        const data = await DaySummaryModel.find();
        res.json(ResponseData(true, data, GetDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, GetDataFail))
    }
}
const add = async (req, res) => {
    try {
        let result = await addNewDaySummary(req.body.date, req.body.storeId, req.body.storeName);

        res.json(result)
    } catch (e) {
        res.json(ResponseData(false, e.message, AddDataFail))
    }
}
const getByID = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await DaySummaryModel.findById(id);
        res.json(ResponseData(true, data, GetDataSuccess))
    }catch (e) {
        res.json(ResponseData(false, e.message, GetDataFail))
    }
}
const update = async (req, res) => {
    try {
        const newData = {
            date: req.body.date,
            storeId: req.body.storeId,
            storeName: req.body.storeName,
            summaryBill: JSON.parse(req.body.summaryBill),
            importOrExport: JSON.parse(req.body.importOrExport),
            checkIn: JSON.parse(req.body.checkIn),
            checkOut: JSON.parse(req.body.checkOut)
        };
        await DaySummaryModel.findByIdAndUpdate(req.body.id, $set = newData);
        res.json(ResponseData(true, newData, UpdateDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, UpdateDataFail))
    }
}
const del = async (req, res) => {
    try {
        const id = req.body.id;
        await DaySummaryModel.findByIdAndDelete(id);
        res.json(ResponseData(true, id, DeleteDataSuccess))
    } catch (e) {
        res.json(ResponseData(false, e.message, DeleteDataFail))
    }
}
const addBill = async (req, res) => {
    try {
        const today = GetDate("yyyy-MM-dd");
        const storeId = req.body.storeId;
        const storeName = req.body.storeName;

        const ToDaySummary = await DaySummaryModel.findById(req.body.id);

        if (!req.body.detail) return res.json(ResponseData(false, null, "Vui lòng nhập đủ thông tin vào hóa đơn!"));
        let bill = {
            storeId: req.body.storeId,
            storeName: req.body.storeName,
            guestId: req.body.guestId,
            guestName: req.body.guestName,
            employeeId: req.body.employeeId,
            employeeName: req.body.employeeName,
            detail: req.body.detail ? JSON.parse(req.body.detail) : [],
            gift: req.body.gift ? JSON.parse(req.body.gift) : [],
            totalMoney: req.body.totalMoney,
            discountMoney: req.body.discountMoney,
            finalMoney: req.body.finalMoney,
            discountCode: req.body.discountCode,
            giftCode: req.body.giftCode,
            status: req.body.status,
            note: req.body.note
        }
        let imagepath = req.file ? req.file.path : null;
        if (ToDaySummary.isSuccess === true) {
            await saveBillFunction(ToDaySummary.data, bill, imagepath, res)
        } else {
            DebugLog(3, ToDaySummary.data);
            res.json(ResponseData(false, ToDaySummary.data, AddDataFail))
        }
    } catch (e) {
        if(req.file) DeleteFile(req.file.path);
        res.json(ResponseData(false, e.message, AddDataFail))
    }
}


const addImportOrExport = async (req, res) => {
    try {
        const today = GetDate("yyyy-MM-dd");
        const storeId = req.body.storeId;
        const storeName = req.body.storeName;

        const ToDaySummary = await DaySummaryModel.findById(req.body.id);

        if (!req.body.detail) return res.json(ResponseData(false, null, "Vui lòng nhập đủ thông tin!"));
        let form = {
            importOrExport: req.body.importOrExport,
            employeeId: req.body.employeeId,
            employeeName: req.body.employeeName,
            detail: JSON.parse(req.body.detail),
            note: req.body.note,
            time: GetDate('yyyy/mm/dd - HH:mm:ss')
        }
        DebugLog(1, ToDaySummary);
        if (ToDaySummary.isSuccess === true) {
            await addImportForm(ToDaySummary.data, form, res)
        } else {
            DebugLog(3, ToDaySummary.data);
            res.json(ResponseData(false, ToDaySummary.data, AddDataFail))
        }
    } catch (e) {
        if (req.file) DeleteFile(req.file.path);
        res.json(ResponseData(false, e.message, AddDataFail))
    }
}

const addCheckIn = async (req, res) => {
    try {
        const today = GetDate("yyyy-MM-dd");
        const storeId = req.body.storeId;
        const storeName = req.body.storeName;

        //const ToDaySummary = await CheckIfExist(storeId, today, storeName);
        const ToDaySummary = await DaySummaryModel.findById(req.body.id);
        let checkIn = {
            employeeId: req.body.employeeId,
            employeeName: req.body.employeeName,
            time: req.body.time,
            image: req.file ? req.file.path : null
        }

        //if (ToDaySummary === true) {
            await addCheckInFunc(ToDaySummary, checkIn, res)
        //} else {
        //    DebugLog(3, ToDaySummary.data);
        //    res.json(ResponseData(false, ToDaySummary.data, AddDataFail))
        //}
    } catch (e) {
        if (req.file) DeleteFile(req.file.path);
        res.json(ResponseData(false, e.message, AddDataFail))
    }
}

const addCheckOut = async (req, res) => {
    try {
        const today = GetDate("yyyy-MM-dd");
        const storeId = req.body.storeId;
        const storeName = req.body.storeName;

        const ToDaySummary = await DaySummaryModel.findById(req.body.id);

        let checkOut = {
            employeeId: req.body.employeeId,
            employeeName: req.body.employeeName,
            time: req.body.time,
            image: req.file ? req.file.path : null
        }

        if (ToDaySummary.isSuccess === true) {
            await addCheckOutFunc(ToDaySummary.data, checkOut, res)
        } else {
            DebugLog(3, ToDaySummary.data);
            res.json(ResponseData(false, ToDaySummary.data, AddDataFail))
        }
    } catch (e) {
        if (req.file) DeleteFile(req.file.path);
        res.json(ResponseData(false, e.message, AddDataFail))
    }
}

// Function 

const addCheckOutFunc = async (daysummary, checkOut, res) => {
    try {
        daysummary.checkOut.push(checkOut);
        await daysummary.save();
        res.json(ResponseData(true, daysummary, AddDataSuccess));
    } catch (e) {
        if (checkOut.image) DeleteFile(checkOut.image);
        res.json(ResponseData(false, e.message, AddDataFail));
    }
}

const addCheckInFunc = async (daysummary, checkIn, res) => {
    try {
        daysummary.checkIn.push(checkIn);
        await daysummary.save();
        res.json(ResponseData(true, daysummary, AddDataSuccess));
    } catch (e) {
        if (checkIn.image) DeleteFile(checkIn.image);
        res.json(ResponseData(false, e.message, AddDataFail));
    }
}
const CheckIfExist = async (storeId, today, storeName) => {
    try {
        let ToDaySummary = await DaySummaryModel.findOne({$and: [{date: today}, {storeId: storeId}]});
        if (ToDaySummary) {
            return ResponseData(true, ToDaySummary, GetDataSuccess);
        } else {
            ToDaySummary = await addNewDaySummary(today, storeId, storeName)
            if (ToDaySummary.isSuccess === true) {
                return ResponseData(true, ToDaySummary.data, AddDataSuccess);
            } else {

                DebugLog(3, ToDaySummary.msg);
                return ResponseData(false, ToDaySummary.msg, AddDataFail);
            }
        }
    } catch (e) {
        return ResponseData(false, e.msg, AddDataFail);
    }
}

const addNewDaySummary = async (today, storeId, storeName) => {
    try {
        const data = await new DaySummaryModel({
            date: today,
            storeId: storeId,
            storeName: storeName,
            summaryBill: [],
            importOrExport: [],
            checkIn: [],
            checkOut: []
        });
        let result = await data.save();
        return ResponseData(true, result, AddDataSuccess);
    } catch (e) {
        return ResponseData(false, e.message, AddDataFail);
    }
}

const saveBillFunction = async (daysummary, bill, imagepath, res) => {
    try {
        let addBillResult = await BillController.addFunction(bill, imagepath);
        if (await addBillResult.isSuccess === true) {
            let summaryBill = {
                billId: addBillResult.data._id,
                employeeId: addBillResult.data.employeeId,
                employeeName: addBillResult.data.employeeName,
                guestId: addBillResult.data.guestId,
                guestName: addBillResult.data.guestName,
                detail: addBillResult.data.detail,
                money: addBillResult.data.finalMoney,
                note: addBillResult.data.note
            }
            daysummary.summaryBill.push(summaryBill);
            await daysummary.save();
            res.json(ResponseData(true, daysummary, AddDataSuccess));
        } else {
            res.json(addBillResult);
        }
    } catch (e) {
        res.json(ResponseData(false, e.message, AddDataFail))
    }
}

const addImportForm = async (daysummary, form, res) => {
    try {
        daysummary.importOrExport.push(form);
        await daysummary.save();
        res.json(ResponseData(true, daysummary, AddDataSuccess));
    } catch (e) {
        res.json(ResponseData(false, e.message, AddDataFail))
    }
}

module.exports = {
    get,
    add,
    update,
    del,
    addBill,
    addImportOrExport,
    addCheckIn,
    addCheckOut,
    CheckIfExist,
    getByID
}


