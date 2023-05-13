module.exports = (sequelize:any, DataTypes:any) => {
    const Article_Procedures = sequelize.define('Article_Procedures', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        articleID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Items',
                key: 'id'
            }
        },
        procedureID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Procedures',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    });
    return Article_Procedures;
}