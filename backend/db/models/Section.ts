import { Sequelize, DataTypes } from 'sequelize';
const Container = require('./Container');

module.exports = (sequelize:Sequelize, DataTypes:any) => {
    const Section = sequelize.define('Section', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        num:{
            type: DataTypes.INTEGER,
        },  
        boxID: {
            type: DataTypes.INTEGER,
            references: {
                model: Container,
                key: 'boxID'
            }
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