const {Comment, Post , User} = require("../models")



const createComment  = async (req ,res)=>{
  const { commentBody} = req.body;
  const userId = req.user.id;
  const postId = req.params.postId;
  try {
    if(!commentBody){
        return res.status(404).json({message:"This  post has not comment "})
    }
    const newcomment  = await Comment.create({
        userId,
        postId,
        commentBody
    })
    res.status(200).json({newcomment})
  } catch (error) {
    res.status(500).json({message: "Error occured "})
  }
}

const getAllComment  = async(req , res)=>{
    const {postId } = req.params;
    const userId = req.user.id;
    try {
        const comments  =  await Comment.findAll({where :{postId :postId}, 
        include:[
            {
                model :User,
                as:"user",
                attributes:['username']
            },
            {
                model:Post,
                as :"post",
                attributes:['title','description'],
                include:[
                    {
                        model:User,
                        as:"user",
                        attributes:['username']
                    }
                ]
            }
        ]
        })
        res.status(200).json({comments})
    } catch (error) {
         res.status(500).json({message: "An error occurred while fetching comments." })
    }
}

module.exports  ={
    createComment,
    getAllComment
}