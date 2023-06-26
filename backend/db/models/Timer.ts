
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
                model: 'Containers',
                key: 'id'
            }
        },
        quantity_made:{
            type: DataTypes.INTEGER,
        },
        note:{
            type: DataTypes.STRING,
        },
        date:{
            type: DataTypes.DATE,
        },
        start_time:{
            type: DataTypes.DATE,
        },
        end_time:{
            type: DataTypes.DATE,
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
    }, {});

    return Timer;

}