const {Partenariat} = require("../models")


const createPartenariat = async(req ,res )=>{
    const {username, email , bussinessDomain, goal} = req.body;
    try {
        if(!username ||!email ||! bussinessDomain ||!goal)
        {
            return res.status(400).json({message: "All fields are required !"})
        }
        const newPartenariat = await Partenariat.create({
            username, 
            email, 
            bussinessDomain,
            goal
        })
        res.status(200).json({message: 'Created! ',newPartenariat})
    } catch (error) {
        res.status(500).json({message: "Error occured when trying to create a parteneriat."})
    }

}


const getAllPartenariat = async(req , res )=>{
         try {
            const partenariats = await Partenariat.findAll();
            if(!partenariats)
            {
                return res.status(404).json({messge :"NO new partenariats  found ! "})
            }
            res.status(200).json({partenariats})
         } catch (error) {
            res.status(500).json({message: "Error occured while fetching datas"});
         }
}









module.exports = {
    createPartenariat ,
    getAllPartenariat
}