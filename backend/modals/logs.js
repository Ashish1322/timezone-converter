const mongoose = require("mongoose")
const Schema = mongoose.Schema

var LogsSchema = new Schema({
    clientCountry: {
        type: String,
        required: true
    },
    hostCountry: {
        type: String,
        required: true
    },
    clientTime: {
        type: String,
        required: true
    },
    hostTime: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Logs",LogsSchema)