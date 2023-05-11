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
        },

        sections: {
            type: DataTypes.ARRAY(DataTypes.Section),
            references: {
                model: Section
            }
        }

    }, {
        timestamps: false
    });

    return Container;
}