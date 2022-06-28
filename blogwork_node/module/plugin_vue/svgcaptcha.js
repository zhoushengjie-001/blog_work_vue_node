const svgCaptcha = require('svg-captcha')

module.exports = ()=>{
    let captcha = svgCaptcha.create({
        size:4,
        ignoreChars:'0o1i',
        noise:2,
        background:'#eee',
        width:100,
        height:40
    })
    return captcha
}