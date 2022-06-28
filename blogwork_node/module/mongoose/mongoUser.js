const mongoose = require('mongoose')

module.exports = mongoose.model(
    'userInfo',
    new mongoose.Schema({
        userName: String,
        userPass: String,
        userDate: {
            type: String,
            default: Date.now() + 1000 * 60 * 60 * 8 //北京时间
        },
        userIcon: {
            type: String,
            default: '/vueImg/award.png'
        }
    }, {
        versionKey: false
    })
)