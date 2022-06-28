const mongoUser = require('../mongoose/mongoUser')
const fs = require('fs')
const {resolve} = require('path')

// 登录注册
const handleUser = async ({
    userName,
    userPass
}) => {
    let result = await mongoUser.findOne({
        userName
    })
    if (result) {
        if (result.userPass == userPass) {
            return {
                code: 200,
                value: "登录成功~",
                data: result
            }
        } else {
            return {
                code: 0,
                value: "登录失败"
            }
        }
    } else {
        let data = await mongoUser.create({
            userName,
            userPass
        })
        return {
            code: 200,
            value: '注册成功~',
            data
        }
    }
}

// 修改名字和密码
const change = async ({
    userName,
    userPass,
    id
}) => {
    let result = await mongoUser.findById(id)
    if (!result) return {
        code: 201,
        value: "不存在"
    }
    userName ? await mongoUser.updateOne({
        _id: id
    }, {
        userName
    }) : await mongoUser.updateOne({
        _id: id
    }, {
        userPass
    })
    userName ? result.userName = userName : result.userPass = userPass
    return {
        code: 200,
        value: "修改成功！",
        data:result
    }
}


// 修改头像地址
const changeImg = async (id,path,origin)=>{
    if(origin.startsWith('/userimg')){
        fs.unlink(resolve(__dirname,"../../public"+origin),()=>{})
    }
    await mongoUser.updateOne({_id:id},{userIcon:path})
    return await mongoUser.findById(id)
}

module.exports = {
    handleUser,
    change,
    changeImg
}