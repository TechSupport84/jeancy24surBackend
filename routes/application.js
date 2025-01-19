const express = require("express");
const router = express.Router()
const {upload} = require("../middleware/Upload")
const {createApplication, getAllApplication, deleteApplication } = require("../controllers/applicationController")


router.post("/create",upload.single("resumeAndCover"), createApplication);
router.get("/",getAllApplication);
router.delete("/delete/:id",deleteApplication);









module.exports  = router;