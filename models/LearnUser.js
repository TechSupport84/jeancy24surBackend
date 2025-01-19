module.exports = (sequelize, DataTypes) => {
    const LearnUser = sequelize.define("LearnUser", {});

    LearnUser.associate = (models) => {
        LearnUser.belongsTo(models.Learn, {
            foreignKey: 'learnId',
            onDelete: 'CASCADE'
        });
        LearnUser.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };

    return LearnUser;
};
