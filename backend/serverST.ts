import {box1} from "./Box"
import express from "express";
import { box } from "./Box";
const app = express();
const ip = require("ip");

const port = 50056;
const curIP = ip.address();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


let allBoxes:Array<box> = []; 
let boxCodes = new Map();


app.get("/info/:boxCode",(req,res) => {
    console.log(box1);
    res.json(box1);
})


app.post("/edit/:boxCode",(req,res) => {
    const {boxCode} = req.params;
    const data = req.body;
    
    if(!data){
        return res.status(400).send({status: 'failed'});
    }
    res.status(200).send({status: 'recieved'})
    
    allBoxes.map((boxes, index)=>{
        if()

    })
})



app.listen(port, () => {console.log(`live on http://${curIP}:${port}`)})
