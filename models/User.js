module.exports = (sequelize ,DataTypes ) =>{
    const User = sequelize.define("User", {
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        country:{
            type: DataTypes.STRING,
            allowNull:false
        },
        role:{
            type: DataTypes.ENUM,
            values: ['client', 'admin'],
            allowNull: false,
            defaultValue: 'client'
        }
    });
    User.associate = (models) => {
        User.hasMany(models.Post, {
            foreignKey: 'userId',
            as: 'posts',
            onDelete: 'CASCADE'
        });
    };

    return User;
}