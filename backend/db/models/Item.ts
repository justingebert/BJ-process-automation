module.exports = (sequelize:any, DataTypes:any) => {
    const Item = sequelize.define('Item', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        parentID: {
            type: DataTypes.INTEGER,
            refrences: {
                model: 'Item',
                key: 'id'
            }
        },
        layer: {
            type: DataTypes.INTEGER,
        },
        procedures: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            refrences: {
                model: 'Procedure',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    });
    return Item;
};
