const express = require('express')
const app = express()
const history = require('connect-history-api-fallback');
app.use(history())
// 解析请求数据
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// 配置静态文件
app.use(express.static('./public'))
// 设置session
app.use(require('./module/plugin_vue/session'))

// 设置子路由
app.use('/blog',require('./router/blog_vue'))
app.use('/user',require('./router/blog_user'))
app.use('/root',require('./router/blog_root'))
// 使用mongoodb
require('./module/mongoose/mongoose')
app.listen('90',()=>{
    console.log("90端口启动成功！")
})