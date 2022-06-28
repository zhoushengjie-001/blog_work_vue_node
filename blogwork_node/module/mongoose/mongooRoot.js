const mongoose = require('mongoose')
const schema = mongoose.Schema

module.exports = mongoose.model("root", new schema({
    rootName: String,
    rootPass: String
},{versionKey:false}))