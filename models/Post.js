module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });


    Post.associate = (models) => {
        Post.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE'
        });
        Post.hasMany(models.Comment, {
            foreignKey: 'postId',
            as: 'comments',
            onDelete: 'CASCADE'
        });
    };

    return Post;
};
