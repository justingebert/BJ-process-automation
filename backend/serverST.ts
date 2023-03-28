import express from "express";
import { box, Box } from "./Box";
const app = express();
const ip = require("ip");

const port = 50056;
const curIP = ip.address();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


let allBoxes:Array<box> = []; 



app.get("/info/:boxCode",(req,res) => {
    const {boxCode} = req.params;
    console.log("hallo")
    const boxCodeInt = parseInt(boxCode)
    let curBox = allBoxes.find(box => box.code === boxCodeInt)
    if(curBox == undefined){
        allBoxes[boxCodeInt] = new Box(boxCodeInt)
        console.log("test")
    }
    //console.log(curBox);
    //console.log(allBoxes[boxCodeInt].toString())
    res.json(curBox);
})


app.post("/edit/:boxCode",(req,res) => {
    const {boxCode} = req.params;
    const boxCodeInt = parseInt(boxCode)
    const data = req.body;
    
    if(!data){
        return res.status(400).send({status: 'failed'});
    }
    res.status(200).send({status: 'recieved'})
    
    allBoxes.map((box, index)=>{
        if(box.code === boxCodeInt){
            return data
        }else{
            return box
        }
    })
    if (data.code > allBoxes.length){
        return [
            ...allBoxes,
            data
        ]
    }

})



app.listen(port, () => {console.log(`live on http://${curIP}:${port}`)})
