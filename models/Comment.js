module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',  
                key: 'id'
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Posts',  
                key: 'id'
            }
        },
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Comment.associate = (models) => {
     
        Comment.belongsTo(models.Post, {
            foreignKey: 'postId',
            as: 'post', 
            onDelete: 'CASCADE' 
        });


        Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user', 
            onDelete: 'CASCADE' 
        });
    };

    return Comment;
};
