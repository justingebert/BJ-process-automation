module.exports = (sequelize:any, DataTypes:any) => {
    const Customer = sequelize.define('Customer', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customerID: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        adress: {
            type: DataTypes.STRING,
        },

    }, {
        timestamps: false
    });

    return Customer;
}