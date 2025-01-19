const express = require("express");
const router  = express.Router();
const { createPartenariat, getAllPartenariat} = require("../controllers/partController")
const  { auth, adminAuthorized } = require("../middleware/authMiddleware")

router.post("/create", createPartenariat)
router.get("/",getAllPartenariat)



module.exports = router;