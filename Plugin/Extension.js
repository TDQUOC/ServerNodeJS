const {format} = require("date-fns");
const DebugLog = (level, message) => {
    if (level === 1) {
        console.log("debug:" + message)
    } else if (level === 2) {
        console.log("warnning: " + message)
    } else if (level === 3) {
        console.log("error: " + message)
    }
}

const GetDate = (fomatString) => {
    let currentDate = new Date();
    return format(currentDate, 'yyyy-MM-dd');
}

const ResponseData = (status, data, msg) => {
    return {
        status: status, // true fail
        data: data, // data response
        msg: msg // message if status = false
    }
};

const CheckNullString = (str) => {
    if (str === null || str === undefined || str === "") {
        return true
    }
    return false
}

module.exports = {
    DebugLog,
    GetDate,
    ResponseData,
    CheckNullString
}


// get thì dùng tham chiếu là query
// post thì dùng tham chiếu là body