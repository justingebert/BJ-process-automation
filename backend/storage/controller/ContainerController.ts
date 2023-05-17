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
        const sections = await Section.findAll({ where: { containerID: container.id } });
        if (!sections) {
            return res.status(404).json({ message: 'Container empty' });
          }
        const containerJson = container.toJSON();
        const sectionsJSON = sections.map((section:any) => section.toJSON());
        containerJson.sections = sectionsJSON;
        //console.log(containerJson);
        return res.json(containerJson);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};

async function createEmptyContainer(code:any) {
    const container = await Container.create({
        active: false,
        code: code,
     });
     return container
}

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

        if(sections.length > 0) {
          console.log(savedContainer.id)
          const savedSections = await Section.bulkCreate(sections.map((section:any) => (
           
            console.log({...section, containerID: savedContainer.id}),
            {...section, containerID: savedContainer.id }
          )));
          console.log("created with sections")
          console.log(savedSections)
        }
        else {
            //console.log("created without sections")
        }
        return res.json(savedContainer);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}


