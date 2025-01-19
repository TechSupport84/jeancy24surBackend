const {Application} = require("../models")

const  createApplication  = async(req , res) =>{
    const {username, email, educationField, programmingLanguage, additionalField} =req.body;
    const resumeAndCoverFile = req.file;

    try {
        if(!username||!email||!educationField||!programmingLanguage||!resumeAndCoverFile)
        {
            return res.status(400).json({message:"All fields are required !"})
        }
        const newApplication =  await Application.create({
            username,
            email,
            educationField,
            programmingLanguage, 
            resumeAndCover:resumeAndCoverFile,
            additionalField :additionalField ||null
        })
        res.status(200).json({message:"New Application", newApplication})
    } catch (error) {
         res.status(500).json({message: "Error Occured while creating an Application try again."})
    }
}

const getAllApplication = async(req,  res) =>{
    try {
        const applications =  await Application.findAll();
        if(!applications)
        {
            return res.status(4040).json({message: "No  application  found ! "})
        }
        res.status(200).json({applications})
    } catch (error) {
        
        res.status(500).json({message: "Error occured while fetching the applications  "})
    }
}

const deleteApplication = async(req, res)=>{
     const {id} = req.params.id
     try {
        const deleted  =  await Application.findOne({where :{id}})
        if(!deleted)
        {
            return res.status(404).json({message: "NO Applicaton found"})
        }
        await Application.destroy({id})
        res.status(200).json({message:"Application  deleted successfully! "})
     } catch (error) {
        res.status(500).json({message:" Error occured why  deleting an Application"})
     }
}



module.exports = {
    createApplication,
    getAllApplication,
    deleteApplication
}