const {format} = require("date-fns");
const fs = require("fs");
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

const ResponseData = (isSuccess, data, msg) => {
    return {
        isSuccess: isSuccess, // true fail
        data: data, // data response
        msg: msg // message if status = false
    }
};

const LoginResponseData = (employee, daySummary) => {
    return {
        employee: employee,
        daySummary: daySummary
    }
}

const CheckNullString = (str) => {
    if (str === null || str === undefined || str === "") {
        return true
    }
    return false
}
const DeleteFile = (path) => {
    // check if exist is delete file in upload folder
    let filePath = __dirname.replace("\\Plugin", "") + '/' + path;
    try {

        //console.log(filePath)
        // Check if the file exists synchronously
        if (fs.existsSync(filePath)) {
            // File exists, so delete it synchronously
            fs.unlinkSync(filePath);
            DebugLog(1, `File ${filePath} has been deleted.`);
        } else {
            console.error(2, `File ${filePath} does not exist.`);
        }
    } catch (err) {
        console.error(3, `Error deleting file ${filePath}: ${err}`);
    }
}

module.exports = {
    DebugLog,
    GetDate,
    ResponseData,
    CheckNullString,
    DeleteFile,
    LoginResponseData
}


// get thì dùng tham chiếu là query
// post thì dùng tham chiếu là body