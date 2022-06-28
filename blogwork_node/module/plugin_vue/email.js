const nodemailer = require('nodemailer')


module.exports = ({userName,email,theme,emailInfo},callBack) => {
    // 创建邮件程序
    let transporter = nodemailer.createTransport({
        // 设置qq发送
        host: "smtp.qq.com",
        auth: {
            user: "3177162043@qq.com", // 发送邮件账号
            pass: "jatoosrpribydghi", // 邮件账号授权码
        },
    });

    let info = [
        // 发送给自己
        {
            from: '"博客中心"<3177162043@qq.com>', // sender address
            to: "3177162043@qq.com", // list of receivers
            subject: theme, // 主题
            text: userName +"先生(女士):"+ emailInfo, // 正文
        },
        //   发送给他人
        {
            from: '"博客中心"<3177162043@qq.com>', // sender address
            to: email, // list of receivers
            subject: theme, // Subject line
            text:emailInfo, // plain text body
        }
    ]

    // 发送邮件
    info.forEach((item,index)=>{
        transporter.sendMail(item,(err)=>{
            if(err){
                return callBack({code:0,title:"发送失败"})
            }
            if(index == 1){
                return callBack({code:200,title:'发送成功'})
            }
        })
    })
    
}