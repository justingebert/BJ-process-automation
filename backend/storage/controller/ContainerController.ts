import { group } from "console";
import sequelize, { Op } from "sequelize";
import { setOriginalNode } from "typescript";

const { Container, Section } = require('../../db/models/');
//TODO implement correctly

const emptyContainer = (code:any) => {
    Container.create({
      active: false,
      code: code,
      status: "",
      location: "",
      procedure: null,
      description: ""
    })
}

async function createEmptyContainer(code:any) {
  const container = await Container.create({
      active: false,
      code: code,
   });
   console.log("created empty container with code:" + container.code)
   return container
}


exports.getAllContainers = async (req:any, res:any) => {
    try {
        const container = await Container.findByPk(1);
        if (!container) {
          return res.status(404).json({ message: 'Container not found' });
        }
        const sections = await Section.findAll({ where: { containerID: 1 } });
        if (!sections) {
            return res.status(404).json({ message: 'Container empty' });
          }
        const containerJson = container.toJSON();
        const sectionsJSON = sections.map((section:any) => section.toJSON());
        containerJson.sections = sectionsJSON;
        console.log(containerJson);
        return res.json(containerJson);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};

//TODO dont find all sections with old oner for container
exports.getContainerById = async (req:any, res:any) => {
    //console.log(req.params.code)
    try {
        let container = await Container.findOne({
            order: [['id', 'DESC']],
            where: { code: req.params.code }
        });
        if (!container) {
          container = await createEmptyContainer(req.params.code)
        }
        const containerJson = container.toJSON();

        const lastSection = await Section.findOne({
          order: [['id', 'DESC']]
        })
        if(!lastSection) {
          containerJson.sections = [];
          return res.json(containerJson);
        }

        const sectionNum = lastSection.section
        
        const sections = await Section.findAll({ 
          order: [['id', 'DESC']],
          where: {
            section: {[Op.between]: [1, sectionNum]},
            containerID: req.params.code,
           },
           limit: sectionNum
        });

        sections.reverse();
        const sectionsJSON = sections.map((section:any) => section.toJSON());
        containerJson.sections = sectionsJSON;

        return res.json(containerJson);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};

exports.createContainer = async (req:any, res:any) => {
    try {
        const container = req.body
        
        const savedContainer = await Container.create({
          code: container.code
        });
        console.log("created empty Controller with code: " + container.code)
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}

exports.updateContainer = async (req:any, res:any) => {
  console.log("updating container")
  console.log(req.body)
    try {
        const sections = req.body.sections
        delete req.body.sections
        const container = req.body
        
        Container.update(req.body, {where: {code: req.params.code}});

        const savedContainer = await Container.findOne({
          order: [['id', 'DESC']],
          where: { code: req.params.code }
        });
        
        //not good - deletes unchanged sections400
        await Section.destroy({ where: { containerID: savedContainer.id } });

        if(sections.length > 0) {
          console.log(savedContainer.id)
          
          const savedSections = await Section.bulkCreate(sections.map((section:any) => (
            delete section.id,
            console.log(section),
            section.containerID == null ? {...section, containerID: savedContainer.id } : {...section}
          )));
          console.log(savedSections)
          console.log("created with sections")
          //console.log(savedSections)
        }
        else {
            console.log("updated without sections")
        }
        return res.json(savedContainer);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}

exports.deleteContainer = async (req:any, res:any) => {
  const sections = req.body.sections

    try {
        const container = await Container.findByPk(req.params.id);
        if (!container) {
          return res.status(404).json({ message: 'Container not found' });
        }

        const savedContainer = await Container.findOne({
          order: [['id', 'DESC']],
          where: { code: req.params.code }
        });
        
        //not good - deletes unchanged sections
        await Section.destroy({ where: { containerID: savedContainer.id } });

        await container.destroy();
        return res.json({ message: 'Container with Sections deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}

exports.clearContainer = async (req:any, res:any) => {
  const savedContainer = await Container.findOne({
    order: [['id', 'DESC']],
    where: { code: req.params.code }
  });
  
  //not good - deletes unchanged sections
  await Section.destroy({ where: { containerID: savedContainer.id } });
  return res.json({ message: 'Sections deleted successfully' });
}