const multer = require("multer")
const storage = multer.diskStorage({
    destination:(req, file , cb) =>{
        cb(null, "./public/Images")
    },
    filename:(req, file, cb)=>
    {
     cb(null, file.fieldname + "--" + Date.now() + file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
       
})



module.exports = {
    upload
}