const mongoose = require('mongoose')

const schema = mongoose.Schema

module.exports = mongoose.model('blogInfo',new schema({
    articleName: String, // 博客名
    articleOrigin: String, // 博客地址
    articleImg: {
        type:String,
        default:'/vueImg/award.png'
    }, // 博客封面
    articleMessage: String, // 博客描述
    articleDate: Date, //  博客创建时间
    articleHot: {
        type: Boolean,
        default: false
    }
}))