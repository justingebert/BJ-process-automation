
import { Sequelize } from "sequelize"

module.exports = (sequelize:Sequelize, DataTypes:any) => {
    const Timer = sequelize.define('Timer', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        workspaceID:{
            type: DataTypes.INTEGER,
        },
        workerID:{
            type: DataTypes.INTEGER,
        },
        boxID:{
            type: DataTypes.INTEGER,
            references: {
                model: 'Container',
                key: 'boxID'
            }
        },
        quantity_done:{
            type: DataTypes.INTEGER,
        },
        note:{
            type: DataTypes.STRING,
        },
        time:{
            type: DataTypes.INTEGER,
        },
        start_time:{
            type: DataTypes.DATE,
        },
        end_time:{
            type: DataTypes.DATE,
        },
        breakTime:{
            type: DataTypes.INTEGER,
        },
        running:{
            type: DataTypes.BOOLEAN,
        },
        paused:{
            type: DataTypes.BOOLEAN,
        },
        finished:{
            type: DataTypes.BOOLEAN,
        }
    }, {
        timestamps: false
    });

    return Timer;

}