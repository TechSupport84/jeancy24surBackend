module.exports = (sequelize, DataTypes) => {
    const Learn = sequelize.define("Learn", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        level: {
            type: DataTypes.ENUM,
            values: ['beginner', 'intermediate', 'advanced'],
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        publishedDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP') // Ensures the current timestamp is used
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive', 'archived'],
            allowNull: false,
            defaultValue: 'active'
        }
    });

    Learn.associate = (models) => {
        // Each Learn can have many LearnMaterials
        Learn.hasMany(models.LearnMaterial, {
            as: 'materials',
            foreignKey: 'learnId',
            onDelete: 'CASCADE'
        });
    };

    return Learn;
};
