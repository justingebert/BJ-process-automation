import { Sequelize, DataTypes } from 'sequelize';
const Container = require('./Container');

module.exports = (sequelize:Sequelize, DataTypes:any) => {
    const Section = sequelize.define('Section', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        boxID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        orderID: {
            type: DataTypes.STRING,
        },
        itemID: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        }

    }, {
        timestamps: false
    });
    
    return Section;
}