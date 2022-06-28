const mongoose = require('mongoose')
const mongooUser = require('./mongoUser')
const schema = mongoose.Schema

module.exports = mongoose.model('usermessage', new schema({
    messageInfo: String,
    messageDate: String,
    messageSort: String,
    about: {
        type: schema.Types.ObjectId,
        ref: mongooUser
    }
}, {
    versionKey: false
}))