import express from "express";
import { box, Box } from "./Box";
const cors = require("cors");
const Sequelize = require("sequelize");
const dbConfig = require('../db/config/config.json');
const db = require("../db/models/");
const ContainerController = require("../storage/controller/ContainerController");

const app = express();
const ip = require("ip");

const port = 50056;
const curIP = ip.address();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const sequelize = new Sequelize(dbConfig.development)


sequelize.authenticate().then(() => {
    console.log("Connected to DB");
}).catch((err:any) => {
    console.log("Unable to connect to DB", err);
});



db.sequelize.sync().then(() => {
    console.log("tables created");
}).catch((err:any) => {
    console.log("Unable to create tables", err);
});


app.get("/info/all", ContainerController.getAllContainers);

app.get("/info/:code", ContainerController.getContainerById);

app.post("/edit/:code",ContainerController.updateContainer)
//create a new box
app.post("/clear/:code",ContainerController.clearContainer)

//send new box to edit
app.post("/new/:code",)

//write a fucntion to add a new box to the array of

app.listen(port, () => {console.log(`live on http://${curIP}:${port}`)})
