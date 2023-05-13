module.exports = (sequelize:any, DataTypes:any) => {
    const Pause = sequelize.define('Pause', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        timerID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Timers',
                key: 'id'
            }
        },
        start_time: {
            type: DataTypes.DATE,
        },
        end_time: {
            type: DataTypes.DATE,
        }
    }, {
        timestamps: false
    });
    return Pause;
}