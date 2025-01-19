const { User, Post , Comment} = require("../models")
const path = require("path")



const creatPost = async(req ,res )=>
{
     const {title , description } = req.body;
     const imagePath =  req.file? req.file.path:null;

     let imageFilePath = imagePath ? imagePath.replace(/\\/g, '/') : null;
     if (imageFilePath) {
         imageFilePath = imageFilePath.replace('public/', '/');
     }
 
     const userId = req.user.id 
     try {
        
        if(!title ||! description){
            return res.status(400).json({message: "All  fields required  to create a post "})
        }
        const newPost =  await Post.create({
            userId,
            title,
            description,
            image:imagePath ? imageFilePath : null, 
        })
        res.status(200).json({message:"Post Created !" , newPost})
     } catch (error) {
        
     }
}

const getAllpost = async (req , res )=>{
    try {
        const post  = await Post.findAll({
            include:[{
              model: User,
              as :"user",
              attributes:['username']
            }]
        })

        res.status(200).json({message:"Posts", post});
    } catch (error) {
        res.status(500).json({message:"Error occured to fectch  post"})
        
    }
}
const getPostById = async (req, res) =>{
    const {id} = req.params ;
    try {
         const post= await Post.findOne({where : {id},
        include:[{
            model :User,
            as :"user",
            attributes:['username']
        },
        {model: Comment,
            as: "comments",
            include:[
                {
                model: User,
                as: "user",
                attributes:['username']
                }
            ]
           

        }
    ]})

    if(!post){
        return res.status(404).json({message :"NO  post found"})
    }
    res.status(200).json({message: "Post ", post})
    } catch (error) {
         res.status(500).json({message: "Error occured while fetching posts",error: error.message})
    }
}

const updatePost = async (req , res) =>{
    try {
        const {id} = req.params;
        const userId = req.user.id;
        const imagePath =  req.file? req.file.path:null;

        let imageFilePath = imagePath ? imagePath.replace(/\\/g, '/') : null;
        if (imageFilePath) {
            imageFilePath = imageFilePath.replace('public/', '/');
        }
    
        const {title,description } = req.body;

        if(!title ||!description){
            return res.status(400).json({message: "All fields are required "})
        }

        const [update] = await Post.update({
            userId,
            title, 
            description,
            image:imagePath ? imageFilePath : null},
        
            {
                where:{id, userId}
            })
            if(update === 0){
             return res.status(404).json({message: "No post found "})
            }
            const updatePost =  await Post.findOne({where :{id}, 
            include:[
                {
                    model: User,
                    as : "user",
                    attributes:['username']
                }
            ]})


            res.status(200).json({message: "Post updated successfully ", updatePost})
        
    } catch (error) {
        res.status(500).json({message: "Error occured when updating post , try again."})
        
    }
}

const deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;  // Assuming the user's ID is in the JWT payload
      
      // Find the post by ID
      const post = await Post.findOne({ where: { id } });
      
      // If the post doesn't exist, return a 404 error
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Check if the authenticated user is the owner of the post
      if (post.userId !== userId) {
        return res.status(403).json({ message: "You are not authorized to delete this post" });
      }
  
      // Delete the post
      const deleted = await Post.destroy({ where: { id } });
      
      // If the post was successfully deleted
      if (deleted === 0) {
        return res.status(404).json({ message: "No post found to delete" });
      }
  
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error occurred", error: error.message });
    }
  };
  

module.exports ={
    creatPost,
    getAllpost,
    getPostById,
    updatePost,
    deletePost
}