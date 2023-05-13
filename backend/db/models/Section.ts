import { Sequelize, DataTypes } from 'sequelize';
const Container = require('./Container');

module.exports = (sequelize:Sequelize, DataTypes:any) => {
    const Section = sequelize.define('Section', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        num:{
            type: DataTypes.INTEGER,
        },  
        orderID: {
            type: DataTypes.STRING,
        },
        itemID: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        boxID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Containers",
                key: 'id'
            }
        } 

    }, {
        timestamps: false
    });
    
    return Section;
}