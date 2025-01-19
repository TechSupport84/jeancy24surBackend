module.exports = (sequelize, DataTypes) => {
    const Partenariat = sequelize.define("Partenariat", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bussinessDomain: {
            type: DataTypes.STRING,
            allowNull: false
        },
        goal: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
    });
    
    return Partenariat;
};
