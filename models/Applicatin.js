module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define("Application", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        educationField: {
            type: DataTypes.STRING,
            allowNull: false
        },
        programmingLanguage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resumeAndCover: {  
            type: DataTypes.STRING,
            allowNull: false
        },
        additionalField: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    });
    
    return Application;
};
