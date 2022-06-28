const mongooRoot = require('../mongoose/mongooRoot')
const mongooBlog = require('../mongoose/mongooBlog')
const fs = require('fs')
const {resolve} = require('path')

// 初始化
const InitRoot = async () => {
    let bol = await mongooRoot.findOne({
        rootName: "root"
    })
    if (bol) return
    await mongooRoot.create({
        rootName: "root",
        rootPass: '081210'
    })

}
// 验证登录
const rootLogin = async ({
    rootName,
    rootPass
}) => {
    let bol = await mongooRoot.findOne({
        rootName,
        rootPass
    })
    if (!bol) return {
        code: 0,
        value: "登录失败~"
    }
    return {
        code: 200,
        value: "登录成功~",
        data: {
            rootName: bol.rootName
        }
    }
}
// 修改密码
const changeRootPass = async ({
    inputPass
}) => {
    let bol = await mongooRoot.updateOne({
        rootName: "root"
    }, {
        rootPass: inputPass
    })
    if (!bol) return {
        code: 0,
        value: "修改失败~"
    }
    return {
        code: 200,
        value: "修改成功~",
        data: bol
    }
}
// 上传博客
const storebloginfo = async ({
    ruleForm,
    imgName,
    mdName
}) => {
    if (!fs.existsSync(mdName.path)) return {
        code: 0,
        value: "文章不存在！"
    }
    let bol = await mongooBlog.create({
        articleName: ruleForm.name, // 博客名
        articleOrigin: mdName.url,
        articleMessage: ruleForm.desc,
        articleDate: Date.now(),
        articleImg: imgName.url
    })
    return {
        code: 200,
        value: bol,
        value: "创建完成！"
    }
}
// 获取博客内容
const getBlogInfo = async () => {
    let len = await (await mongooBlog.find()).length
    let data = await mongooBlog.find({}, {}, {limit:2,sort:{articleDate:-1}})
    return {
        code: 200,
        value: "获取成功~",
        data,
        len
    }
}
// 点击编辑修改标题和描述
const handlerEdit = async ({
    id,
    articleName,
    articleMessage
}) => {
    let bol = await mongooBlog.updateOne({
        _id: id
    }, {
        articleName,
        articleMessage
    })
    if (!bol) {
        return {
            code: 0,
            value: "修改失败"
        }
    } else {
        return {
            code: 200,
            data: bol,
            value: "修改成功"
        }
    }
}
// 编辑已上传的封面
const editImg = async (id, path,articleImg)=>{
    fs.unlinkSync(resolve(__dirname,"../../public"+articleImg))
    return await mongooBlog.updateOne({_id:id},{articleImg:path})
}
// 编辑文档
const saveMd = async({id,articleContent})=>{
    let bol = await mongooBlog.findById({_id:id})
    let url = resolve(__dirname,'../../public'+bol.articleOrigin)
    fs.writeFileSync(url,articleContent)
    return{code:200,value:"保存成功！"}
}
// 删除博客
const deleteBlog = async ({id})=>{
    let bol = await mongooBlog.findById(id)
    fs.unlinkSync(resolve(__dirname,'../../public'+bol.articleOrigin))
    fs.unlinkSync(resolve(__dirname,'../../public'+bol.articleImg))
    await mongooBlog.deleteOne({_id:id})
    return{code:200,value:"删除成功！"}
}
// 页数改变获取博客信息
const getChangeBlog = async ({skip})=>{
    let bol = await mongooBlog.find({},{},{skip,limit:2,sort:{articleDate:-1}})
    return{code:200,data:bol,value:"获取成功"}
}
// 获取所有的博客
const getAllBlog = async()=>{
    let data = await mongooBlog.find({},{},{sort:{articleDate:-1}})
    return{code:200,data,value:"获取成功！"}
}
module.exports = {
    InitRoot,
    rootLogin,
    changeRootPass,
    storebloginfo,
    getBlogInfo,
    handlerEdit,
    editImg,
    saveMd,
    deleteBlog,
    getChangeBlog,
    getAllBlog
}