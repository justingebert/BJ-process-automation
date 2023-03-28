import express from "express";
import { box, Box, box3 } from "./Box";
const app = express();
const ip = require("ip");

const port = 50056;
const curIP = ip.address();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


let allBoxes:Array<box> = []; 
//let box2 = new Box(3)
//console.log(box3)



app.get("/info/:boxCode",(req,res) => {
    const {boxCode} = req.params;
    const boxCodeInt = parseInt(boxCode)
    let curBox;
    try {
        allBoxes[boxCodeInt] = new Box(boxCodeInt)
        curBox = allBoxes[boxCodeInt]
        console.log(curBox)
        /* curBox = allBoxes.find(box => box.code === boxCodeInt)
        console.log(curBox) */
    } catch (error) {
        console.log(error)
    }
        
   
    //console.log(curBox);
    //console.log(allBoxes[boxCodeInt])
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
