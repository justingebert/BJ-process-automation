import {box1} from "./Box"
import express from "express";
const app = express();
const ip = require("ip");

const port = 50056;
const curIP = ip.address();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/Info/:boxCode",(req,res) => {
    res.json(box1);
})

app.listen(port, curIP, () => {console.log(`live on https://${curIP}:${port}`)})
