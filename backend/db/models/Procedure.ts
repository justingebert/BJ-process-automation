module.exports = (sequelize:any, DataTypes:any) => {
    const Procedure = sequelize.define('Procedure', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        materials: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        catergory: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
    return Procedure;
};