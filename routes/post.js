const express = require("express")

const { creatPost, getAllpost, getPostById, updatePost, deletePost }  = require("../controllers/postController")
const { auth } = require("../middleware/authMiddleware")
const { upload } = require("../middleware/Upload")
const router = express.Router();



router.post("/create",upload.single("image"),auth, creatPost )

router.get("/",auth,getAllpost )

router.get("/:id", auth,getPostById )
router.put("/update/:id",upload.single("image"),auth,updatePost)
router.delete("/delete/:id", auth, deletePost)



module.exports = router;