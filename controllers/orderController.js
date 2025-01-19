const sendEmail = require("../mails/sendEmail");
const { Order ,User} = require("../models")




const createOrder = async(req , res) =>{
    const userId = req.user.id
    const {username, email,description , siteName, siteDomain} = req.body;
     try {
         if(!username ||! email ||!description||! siteName||(siteDomain && !['no','yes'].includes(siteDomain)))
         {
            return res.status(400).json({message: "All fields are required to continue"});
         }
         const newOrder = await Order.create({
            username,
            email,
            description,
            siteName,
            siteDomain
         })
         res.status(200).json({message: "Order created Successfully", newOrder})
         //send email
         const user = await User.findByPk(userId);
         if (user) {
           sendEmail(user);  
         } else {
           console.log("User not found.");
         }
     } catch (error) {
        res.status(500).json({message: "Error occured when try creating an order."})
     }

}

const getOrders = async(req ,res )=>{

    try {
        const orders =  await Order.findAll();
        if(orders.length === 0)
        {
            return res.status(404).json({message: "No orders found"})
        }
        res.status(200).json({message: "Orders ",orders})
    } catch (error) {
         res.status(500).json({message: "Error occrured when fectching orders"})
    }
}

const deleteOrders = async(req , res) =>{
   const {id} = req.params;
   try {
    const deleted = await Order.findOne({where :{id}})
    if(!deleted)
    {
        return res.status(404).json({message: "No order found with the current ID "})
    }
    await Order.destroy({where :{id}});
    res.status(200).json({message: "Orders deleted ! "})    
   } catch (error) {
     res.status(500).json({message: "Error occured !"})
   }
}



module.exports = {
    createOrder,
    getOrders,
    deleteOrders,
}