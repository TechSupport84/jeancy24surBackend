const express = require("express")
const  router = express.Router()
const { register, loginUser, getAllUsers , getCurrentUser} = require("../controllers/User")
const {auth ,adminAuthorized} = require("../middleware/authMiddleware")


router.post("/register",register),



router.post("/login",loginUser)
router.get("/",auth,adminAuthorized, getAllUsers)
router.get("/me",auth,getCurrentUser)
router.get("/protected",auth,  (req, res) =>{
    res.status(200).json({message: "This is a protected router ", user:req.user})
})








module.exports = router