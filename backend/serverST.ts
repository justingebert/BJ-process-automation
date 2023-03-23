import {box1} from "./Box"
import express from "express";
import { box } from "./Box";
const app = express();
const ip = require("ip");

const port = 50056;
const curIP = ip.address();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


let allBoxes:Array<box>; 


app.get("/info/:boxCode",(req,res) => {
    console.log(box1);
    res.json(box1);
})


app.post("/edit/:boxCode",(req,res) => {
    
})



app.listen(port, () => {console.log(`live on http://${curIP}:${port}`)})
