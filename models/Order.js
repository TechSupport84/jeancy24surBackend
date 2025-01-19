module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        siteName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        siteDomain: {
            type: DataTypes.ENUM,
            values: ['no', 'yes'],
            allowNull: false,
            defaultValue: 'no'
        }
    });


    Order.associate = (models) => {
        Order.hasOne(models.Payment, {
            as: 'payments', 
            onDelete: "CASCADE"
        });
    };

    return Order;
};
