module.exports = (sequelize:any, DataTypes:any) => {
    const OrderItems = sequelize.define('Order_Items', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Orders',
                key: 'id'
            }
        },
        itemID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Items',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
        }
    }, {
        timestamps: false
    });
    return OrderItems;
};