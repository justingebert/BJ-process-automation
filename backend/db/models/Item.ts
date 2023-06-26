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
                model: 'Items',
                key: 'id'
            }
        },
        layer: {
            type: DataTypes.INTEGER,
        }
    }, {
        timestamps: false
    });
    return Item;
};
