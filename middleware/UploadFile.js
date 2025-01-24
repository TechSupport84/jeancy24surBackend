
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./Images");
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const uploadFile = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only .pdf, .doc, and .docx files are allowed!"));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = {uploadFile } 