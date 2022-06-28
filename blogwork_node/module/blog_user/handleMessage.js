const mongooMessage = require('../mongoose/mongooMessage')

// 存储留言
const storeMessage = async ({inputMessage,id})=>{
    let bol = await mongooMessage.create({
        messageInfo:inputMessage,
        messageDate:new Date().toLocaleDateString().replace('/','年').replace('/','月')+'日',
        messageSort:Date.now(),
        about:id
    })
    let data = mongooMessage.findById(bol._id).populate("about",{userPass:0})
    return data
}
// 获取留言
const getStoreMessage = async ({skip})=>{
    return await mongooMessage.find({},{},{skip,limit:10,sort:{messageSort:-1}}).populate("about",{userPass:0})
}


module.exports = {
    storeMessage,
    getStoreMessage
}