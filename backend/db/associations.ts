import { Sequelize } from "sequelize";
const Container = require('./models/Container');
const Section = require('./models/Section');



function apply(sequalize:Sequelize){
    Container.hasMany(Section,{
        foreignKey: 'sectionID'
    })
    Section.belongsTo(Container, {
        foreignKey: 'boxID',
        targetKey: 'boxID'
    });
}


module.exports = {apply}