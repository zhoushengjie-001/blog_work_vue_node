const mongooLink = require('../mongoose/mongooLink')

const handleLink = async ({ruleForm},id)=>{
    let bol = await mongooLink.findOne({about:id})
    if(!bol){
        await mongooLink.create({
            blogName:ruleForm.blogName,
            blogOrigin:ruleForm.blogOrigin,
            blogLogo:ruleForm.blogLogo,
            blogMessage:ruleForm.blogMessage,
            blogDate:Date.now() + 1000*8*60*60,
            about:id
        })
    }else{
        await mongooLink.updateOne({about:id},{
            blogName:ruleForm.blogName,    
            blogOrigin: ruleForm.blogOrigin,  
            blogLogo: ruleForm.blogLogo,  
            blogMessage:ruleForm.blogMessage,
        })
    }
    return {
        code: bol ? 0 : 200 ,
        data: await mongooLink.findOne({about:id}) ,
        value:  bol ? "修改成功" : "新增成功" ,
    }
}

// 删除友链
const deleteLink = async ({id})=>{
    let bol = await mongooLink.deleteOne({_id:id})
    if(!bol)return{code:0,value:"删除失败！"}
    return{code:200,value:"删除成功！",data:bol}
}

module.exports = {
    handleLink,
    deleteLink
}