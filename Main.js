const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const appConfig = require("./AppConfig");
const extension = require("./Plugin/Extension");

// connect to mongo db
mongoose.connect('mongodb://localhost:27017/' + appConfig.DatabaseName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

mongodbFunction(db)

// create router

// create express app
const app = express()
const storeRoute = require("./Route/StoreRoute")
const employeeRoute = require("./Route/EmployeeRoute")
const guestRoute = require("./Route/GuestRoute")
const productRoute = require("./Route/ProductRoute")
const billRoute = require("./Route/BillRoute")
const daySummaryRoute = require("./Route/DaySumaryRoute")

SetupApp(app);


setupRouter(app);


// Functions 

//=> MongoDB Functions
function mongodbFunction(db) {
    // console error if any
    db.on('error', (err) => {
        extension.DebugLog(3, err)
    })

    db.once('open', () => {
        extension.DebugLog(1, "Connected to MongoDB!")
    })
}


function SetupApp(app) {
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
// dòng để truy cập tập tin công khai => có thể download file
    app.use("/upload", express.static("upload"))

    const PORT = appConfig.ServerPort

    app.listen(PORT, () => {
        extension.DebugLog(1, "server is listening on port " + PORT);
    })

}

function setupRouter(app) {
    app.use("/api/store", storeRoute)
    app.use("/api/employee", employeeRoute)
    app.use("/api/guest", guestRoute)
    app.use("/api/product", productRoute)
    app.use("/api/bill", billRoute)
    app.use("/api/day-summary", daySummaryRoute)

}
