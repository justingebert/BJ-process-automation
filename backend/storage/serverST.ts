import express from "express";
import { box, Box } from "./Box";
const app = express();
const ip = require("ip");

const port = 50056;
const curIP = ip.address();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let numOfBoxes = 5;
let allBoxes:Array<Box> = [];
//let allBoxes:any = [];

for(let i = 0; i<numOfBoxes; i++){
    allBoxes[i] = new Box(i)
}



app.get("/info/:boxCode",(req,res) => {
    const {boxCode} = req.params;
    const boxCodeInt = parseInt(boxCode)
    let curBox;
    if(allBoxes[boxCodeInt] !== undefined){
        curBox = allBoxes[boxCodeInt]
    }else{
        curBox = allBoxes[boxCodeInt]
    }
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
    
    //console.log(data)

    allBoxes = allBoxes.map((box, index)=>{
        if(index === boxCodeInt){
            box.setParameters(data)
            return box
        }else{
            return box
        }
    })

    if (data.code > allBoxes.length){
        allBoxes = [
            ...allBoxes,
            data
        ]
    }

    //console.log(allBoxes)
})


app.post("/newVal/:boxCode",(req, res) => {
    console.log("test")
    const {boxCode} = req.params;
    const boxCodeInt = parseInt(boxCode)

    res.status(200).send({status: 'recieved'})


})

app.post("/clear/:boxCode",(req, res) => {
    const {boxCode} = req.params;
    const boxCodeInt = parseInt(boxCode)

    allBoxes = allBoxes.map((box, index)=>{
        if(index === boxCodeInt){
            box.setEmpty()
            return box
        }else{
            return box
        }
    })

    res.status(200).send({status: 'recieved'})
    res.json(allBoxes[boxCodeInt])

})

//write a fucntion to add a new box to the array of

app.listen(port, () => {console.log(`live on http://${curIP}:${port}`)})
