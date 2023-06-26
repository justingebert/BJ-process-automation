module.exports = (sequelize:any, DataTypes:any) => {
    const Order =   sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderID: {
            type: DataTypes.STRING,
        },
        customerID: {
            type: DataTypes.INTEGER,
            refrences:{
                model: 'Customer',
                key: 'customerID'
            }
        },
        orderDate: {
            type: DataTypes.DATE,
        },
        orderStatus: {
            type: DataTypes.STRING,
        }

    }, {
        timestamps: false
    });

    return Order;
}