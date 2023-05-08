import path from 'path';
//import { Sequelize, DataTypes, Model, BuildOptions } from 'index';
const Sequelize = require('./index');
const Section = require('./Section');



module.exports = (sequelize:any, DataTypes:any) => {
    const Container = sequelize.define('Container', {
        boxID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        procedure: {
            type: DataTypes.INTEGER,
        },

        description:{
            type: DataTypes.STRING,
        }

    }, {
        timestamps: false
    });

    Container.associate = (models:any) => {
        Container.hasMany(models.Section,{
            foreignKey: 'sectionID'
        })
    }

    return Container;
}