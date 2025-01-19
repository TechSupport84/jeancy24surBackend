const express = require("express");
const router =  express.Router()
const { auth, adminAuthorized} =require("../middleware/authMiddleware")
const {createOrder , getOrders, deleteOrders} = require("../controllers/orderController")


router.post("/create",auth, createOrder)
router.get("/",auth,adminAuthorized,getOrders)
router.delete("/delete/:id",auth,deleteOrders)










module.exports = router;