module.exports = (sequelize:any, DataTypes:any) => {
    const Container = sequelize.define('Container', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        active: {
            type: DataTypes.BOOLEAN,
        },
        code: {
            type: DataTypes.STRING,
        },
        status: {
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

    return Container;
}