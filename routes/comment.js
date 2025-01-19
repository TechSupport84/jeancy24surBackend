const express = require("express")
const { createComment, getAllComment} = require("../controllers/commentController")
const { auth} = require("../middleware/authMiddleware")
const router =  express.Router();



router.post("/:postId/newComment",auth, createComment)

router.get("/:postId/comments" ,auth, getAllComment)










module.exports = router;