const express = require('express')
const router = express.Router()
const email = require('../module/plugin_vue/email')
const svg = require('../module/plugin_vue/svgcaptcha')
const {
    handleUser,
    change,
    changeImg
} = require('../module/blog_user/handleUser')
const upload = require('../module/plugin_vue/multer')
const multer = require('multer')
// 发送邮件
router.post('/setEmail', (req, res) => {
    let {
        ruleForm
    } = req.body
    email(ruleForm, callBack)

    function callBack(val) {
        res.send(val)
    }
})

// 设置验证码
router.get('/getsvg', (req, res) => {
    let {
        text,
        data
    } = svg()
    res.send({
        code: 200,
        text,
        data
    })
})

//登录注册 
router.post('/userInfo', async (req, res) => {
    let {
        ruleForm
    } = req.body
    let result = await handleUser(ruleForm)
    if (result.code) req.session.userSession = result
    res.send(result)
})

// 免密登录
router.get('/getcookie', (req, res) => {
    const data = req.session.userSession
    if (data) {
        res.send(data)
    } else {
        res.send({
            code: 0
        })
    }
})

// 退出登录
router.post('/logout', (req, res) => {
    req.session.userSession = ''
    let data = {
        userDate: "",
        userIcon: "/vue_img/hot5.png",
        userName: "",
        userPass: "",
        id: "",
    }
    res.send({
        code: 200,
        title: "退出成功~",
        data
    })
})

// 修改用户名
router.post('/changeuser', async (req, res) => {
    let result = await change(req.body)
    if (result.code == 201) return req.session.userSession = result
    res.send(result)
})

// 修改密码
router.post('/changepass', async (req, res) => {
    let result = await change(req.body)
    if (result.code == 201) return req.session.userSession = result
    res.send(result)
})

// 更换头像
router.post('/changeimg', (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // 上传错误
            console.log("上传错误！")
        } else if (err) {
            // 未知错误
            console.log("未知错误！");
        }
        let {
            id
        } = req.body
        let path = '/userimg/' + req.file.filename
        let origin = req.session.userSession.data.userIcon
        let result = await changeImg(id, path,origin)
        req.session.userSession = {
            code: 200,
            value: "修改成功",
            data: result
        }
        res.send({
            code: 200,
            value: "修改成功",
            data: result
        })
        // 一切都好
    })
})
module.exports = router