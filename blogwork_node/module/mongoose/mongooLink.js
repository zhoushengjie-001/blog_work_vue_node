const mongoose = require('mongoose')
const mongoUser = require('./mongoUser')
const Schema = mongoose.Schema

// 友链表
module.exports = mongoose.model("userLink", new Schema({
    blogName: String, // 博客名
    blogOrigin: String, // 博客地址
    blogLogo: String, // 博客logo地址
    blogMessage: String, // 博客描述
    blogDate: Date, //  博客友链创建时间
    about: {
        type: Schema.Types.ObjectId,
        ref: mongoUser
    },
    blogLinkHot: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
}))