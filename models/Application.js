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
        image: {  
            type: DataTypes.STRING,
            allowNull: true
        },
        additionalField: {
            type: DataTypes.TEXT,
            allowNull: false
        },
       link: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    });
    
    return Application;
};
