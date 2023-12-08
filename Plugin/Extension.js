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

const GetDate = (fomatString) =>{
    let currentDate = new Date();
    return format(currentDate, 'yyyy-MM-dd');
}

module.exports = {
    DebugLog,
    GetDate
}