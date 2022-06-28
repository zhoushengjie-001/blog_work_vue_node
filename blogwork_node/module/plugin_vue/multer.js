const multer  = require('multer')
const {resolve} = require('path')


// 磁盘存储引擎可以让你控制文件的存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.originalname.endsWith('.md')){
        cb(null, resolve(__dirname,"../../public/file"))
      }else{
        cb(null, resolve(__dirname,"../../public/userimg"))
      }
      
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now()+file.originalname)
    }
  })
  
module.exports = multer({ storage: storage }).single("file")