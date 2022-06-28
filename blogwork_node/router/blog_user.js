const express = require('express')
const router = express.Router()
const userLink = require('../module/mongoose/mongooLink')
const {handleLink,deleteLink} = require('../module/blog_user/handleInfo')
const {storeMessage,getStoreMessage} = require('../module/blog_user/handleMessage')
const {getAllBlog} = require('../module/blog_user/handleRoot')

// 设置友链
router.post('/userLink',async (req,res)=>{
    let result = await handleLink(req.body,req.session.userSession.data._id)
    res.send(result)
})
// 获取友链
router.get('/getlinks', async (req,res)=>{
    let result = await userLink.find()
    if(result){
        res.send({code:200,data:result,value:"获取成功！"})
        return
    }else if(result==''||result==null){
        res.send({code:200,data:result,value:"暂无数据！"})
        return
    }else{
        res.send({code:0,value:"出现异常！"})
        return
    }
})
// 设置留言
router.post('/setmessage',async (req,res)=>{
    let result = await storeMessage(req.body)
    res.send({code:200,data:result,value:"提交成功~"})
})
//获取留言
router.post('/getcommon',async (req,res)=>{
    let result = await getStoreMessage(req.body)
    res.send({code:200,data:result,value:"获取成功~"})
})
// 是否推荐友链
router.post('/changeLinkState',async (req,res)=>{
    let result = await userLink.updateOne({_id:req.body.id},{blogLinkHot:req.body.blogLinkHot})
    if(result){
        res.send({code:200,data:result,value:'状态修改成功！'})
    }else{
        res.send({code:0,value:"状态修改失败！"})
    }
})
// 删除友链
router.post('/deletelink',async (req,res)=>{
    let result = await deleteLink(req.body)
    res.send(result)
})
router.get('/getallblog',async (req,res)=>{
    let result = await getAllBlog()
    res.send(result)
})
module.exports = router