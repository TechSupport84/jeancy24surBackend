const { User } = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const sendEmail = require("../mails/sendEmail");



const register = async(req, res) =>{
    const {username, email , password, country ,role} =req.body;
 try {
    const existUser = await User.findOne({where:{email}})
    if(existUser){
        return res.status(400).json({message: "Another user with the same email  exists "})
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    if(!username || !email ||!password|| !country || (role && !['client','admin'].includes(role)))
    {
        return res.status(400).json({message: "All fields  required."})
    }

   const newUser= await User.create({
        username, 
        email,
        password: hashedPassword,
        country,
        role
    })

    res.status(200).json({message: "User registerd successfully !"})
    sendEmail(newUser)
 } catch (error) {
     res.status(500).json({message: "Error occured while registering user."})
 }
  
}
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }  
        });
        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error occurred while fetching users", error: error.message });
    }
};

const loginUser = async(req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({where : {email}});
        if (!user)
        {
            return res.status(404).json({message: "NO User found with this email or Password! "})
        }
        const isValidPassword  = bcrypt.compareSync(password, user.password )
        
        if(!isValidPassword){
            return res.status(400).json({message: "Username or Password incorrect "})
        }
   const token = jwt.sign(
    {id: user.id, email:user.email, role: user.role},process.env.JWT_SECRET,
    {expiresIn: "1h"})


    res.status(200).json({
        message:"Logged In successfully",
        token,
        user:{
            user: user.id,
            user:user.username,
            email: user.email,
            role: user.role
        }
    })
    } catch (error) {
         res.status(500).json({message: "Error occured while trying to log in! "})
    }
}


const getCurrentUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    //   user.image = user.image ? `${process.env.BASE_URL}/${user.image}` : null;
      res.json(user);
    } catch (err) {
      console.error('Get Current User Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
module.exports = {
    register,
    loginUser,
    getAllUsers,
    getCurrentUser
}