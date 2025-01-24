const express = require("express");
const router = express.Router()
const { uploadFile } = require("../middleware/UploadFile")
const { auth, adminAuthorized} = require("../middleware/authMiddleware")
const {createApplication, getAllApplications, deleteApplication } = require("../controllers/applicationController")


router.post("/create", uploadFile.single("image"),createApplication);
router.get("/",auth, adminAuthorized, getAllApplications);
router.delete("/delete/:id",auth, adminAuthorized, deleteApplication);









module.exports  = router;