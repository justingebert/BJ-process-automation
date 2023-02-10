import {box1} from "./Box"
import express from "express";
const app = express();
const ip = require("ip");

const port = 50056;
const curIP = ip.address();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/info/:boxCode",(req,res) => {
    console.log(box1);
    res.json(box1);
})

app.listen(port, () => {console.log(`live on http://${curIP}:${port}`)})
