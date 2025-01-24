const { Application } = require("../models");
const {sendEmail} = require("../mails/application")
const path =  require("path")
const createApplication = async (req, res) =>{
    const{username , email,educationField, programmingLanguage, additionalField,link} = req.body;

    const image = req.file ? req.file.path.replace(/\\/g, '/') : null;
try {
    if(!username ||!email ||!educationField ||!programmingLanguage ||!image||!additionalField ||!link){
        return res.status(400).json({message: "All  fields are  required to continue ."})
       }
        const application = await Application.create({username, email, educationField, programmingLanguage, image:image ,additionalField,link})
        res.json({message: "Create ! ", application})
        sendEmail(email,application)
} catch (error) {
     res.status(500).json({message: "Error occured while create Application"})
}
 
}
   
const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.findAll();

        if (applications.length === 0) {
            return res.status(404).json({ message: "No applications found!" });
        }

        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: "Error occurred while fetching the applications.", error: error.message });
    }
};

const deleteApplication = async (req, res) => {
    const { id } = req.params;

    try {
        const application = await Application.findOne({ where: { id } });

        if (!application) {
            return res.status(404).json({ message: "No application found with the provided ID!" });
        }

        await Application.destroy({ where: { id } });

        res.status(200).json({ message: "Application deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error occurred while deleting the application.", error: error.message });
    }
};

module.exports = {
    createApplication,
    getAllApplications,
    deleteApplication,
};
