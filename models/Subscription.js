module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define("Subscription", {
        subscriptionType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'expired', 'cancelled'],
            allowNull: false,
            defaultValue: 'active'
        },
        paymentStatus: {
            type: DataTypes.ENUM,
            values: ['pending', 'completed', 'failed'],
            allowNull: false,
            defaultValue: 'pending'
        }
    });

    Subscription.associate = (models) => {
        Subscription.belongsTo(models.Order, {
            as: 'orders',
            foreignKey: 'orderId',
            onDelete: 'CASCADE'
        });

        Subscription.hasOne(models.Payment, {
            as: 'payments',
            onDelete: 'CASCADE'
        });
    };

    return Subscription;
};
