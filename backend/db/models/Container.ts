module.exports = (sequelize:any, DataTypes:any) => {
    const Container = sequelize.define('Container', {
        id: {
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

    return Container;
}