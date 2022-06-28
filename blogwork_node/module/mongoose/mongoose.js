const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://localhost:27017/blog')
.then(()=>{
    console.log("数据库连接成功")
}).catch(()=>{
    console.log("数据库连接失败")
})