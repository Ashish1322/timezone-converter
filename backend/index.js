const express = require("express")
const ct = require('countries-and-timezones');
const cors = require("cors")
const body_parsor = require("body-parser")
const mongoose = require("mongoose")
const app = express();


const LogsSchema = require("./modals/logs")

// db connection
const connectionUrl = 'mongodb+srv://ashish1322:DN4jzZkz8voDHsxY@cluster0.88yqf.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connectionUrl).then(()=> console.log("Database Connected"))

// middlewares
app.use(cors())
app.use(body_parsor.json())

// routes
app.get("/getAllCountries", (req,res) => {
    const countries = ct.getAllCountries();
    let countriesArray = []
    for (key in countries)
        countriesArray.push({...countries[key],"timezones":countries[key]["timezones"][0]})

    res.send(countriesArray)
})

app.post("/saveLog",(req,res) => {
    const log = new LogsSchema(req.body)
    log.save()
    .then(() => res.status(200).json({success: true}))
    .catch((err) => res.status(400).json({success: false}))
    
})

app.get("/getLogs",(req,res) => {
    LogsSchema.find({}).then(data => res.send(data))
})

app.post("/clearLogs" , (req,res) => {
    LogsSchema.deleteMany({}).
    then(() => res.json({success: true}))
    .catch((err) => res.json({success: false}))
})

// run
app.listen(3001 || process.env.PORT, () => console.log("App is running on port 3001"))