module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paymentAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        paymentStatus: {
            type: DataTypes.ENUM,
            values: ['pending', 'completed', 'failed'],
            allowNull: false,
            defaultValue: 'pending'
        },
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });
    Payment.associate = (models) => {
        Payment.belongsTo(models.Order, {
            as: 'orders',  
            foreignKey: 'orderId',
            onDelete: 'CASCADE'
        });
    };

    return Payment;
};
