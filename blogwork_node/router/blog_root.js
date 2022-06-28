const express = require('express')
const router = express.Router()
const {
    InitRoot,
    rootLogin,
    changeRootPass,
    storebloginfo,
    getBlogInfo,
    handlerEdit,
    editImg,
    saveMd,
    deleteBlog,
    getChangeBlog
} = require('../module/blog_user/handleRoot')
const upload = require('../module/plugin_vue/multer')
const multer = require('multer')
const fs = require('fs')
// 初始化
router.get('/', (req, res) => {
    InitRoot()
    res.send("初始化成功")
})

// 登录
router.post('/rootlogin', async (req, res) => {
    let result = await rootLogin(req.body)
    res.send(result)
})

// 修改密码
router.post("/changepass", async (req, res) => {
    let result = await changeRootPass(req.body)
    res.send(result)
})
// 上传文档
router.post('/articlemd', async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // 上传错误
            res.send({
                code: 0,
                value: "上传错误！"
            })
        } else if (err) {
            // 未知错误
            res.send({
                code: 201,
                value: "未知错误！"
            })
        }
        let path = req.file.path
        let url = "/file/" + req.file.filename
        res.send({
            code: 200,
            data: {
                path,
                url
            },
            value: "上传成功！"
        })
    })
})
// 删除已上传的文档
router.post('/deleteMd', (req, res) => {
    if (!req.body.filName.path) return res.send({
        code: 201,
        value: "文件不存在！"
    });
    fs.unlinkSync(req.body.filName.path)
    res.send({
        code: 200,
        value: "删除成功！"
    })
})
// 上传封面
router.post('/uploadImg', (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // 上传错误
            res.send({
                code: 0,
                value: "上传错误！"
            })
        } else if (err) {
            // 未知错误
            res.send({
                code: 201,
                value: "未知错误！"
            })
        }
        let path = req.file.path
        let url = "/userimg/" + req.file.filename
        res.send({
            code: 200,
            data: {
                path,
                url
            },
            value: "上传成功！"
        })
    })
})
// 上传博客
router.post('/storebloginfo', async (req, res) => {
    let result = await storebloginfo(req.body)
    res.send(result)
})
// 获取博客信息
router.get('/getbloginfo', async (req, res) => {
    let result = await getBlogInfo()
    res.send(result)
})
// 点击编辑修改标题和描述
router.post('/handleredit',async (req,res)=>{
    let result = await handlerEdit(req.body)
    res.send(result)
})
// 修改封面图片
router.post('/editimg',async (req,res)=>{
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // 上传错误
            console.log("上传错误！")
        } else if (err) {
            // 未知错误
            console.log("未知错误！");
        }
        let {
            id,articleImg
        } = req.body
        let path = '/userimg/' + req.file.filename
        let result = await editImg(id, path,articleImg)
        res.send({
            code: 200,
            value: "修改成功",
            data: path
        })
        // 一切都好
    })
})
// 修改blog文档
router.post('/savemd',async (req,res)=>{
    let result = await saveMd(req.body)
    res.send(result)
})
// 删除博客
router.post('/deleteblog',async (req,res)=>{
    let result = await deleteBlog(req.body)
    res.send(result)
})
// 页数改变获取博客信息
router.post('/getchangeblog',async (req,res)=>{
    let result = await getChangeBlog(req.body)
    res.send(result)
})

module.exports = router