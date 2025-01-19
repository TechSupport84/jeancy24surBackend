module.exports = (sequelize, DataTypes) => {
    const LearnMaterial = sequelize.define("LearnMaterial", {
        materialTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        materialDescription: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        materialLink: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    LearnMaterial.associate = (models) => {
        LearnMaterial.belongsTo(models.Learn, {
            foreignKey: 'learnId',
            onDelete: 'CASCADE'
        });
    };

    return LearnMaterial;
};
