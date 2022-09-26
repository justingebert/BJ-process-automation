const express = require('express');
const app = express();
const XLSX = require("xlsx");

import * as fs from 'fs';
import test from 'node:test';
import * as path from 'path';

const port = 8080;

app.use(express.static(path.join(__dirname,'/public')))
app.use(express.json());

//use fetch to get put json object to server

/* app.get('/',(req:any,res:any)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
    //res.render('index.html');
    //res.download(excel file) send excel file to device
})  */


//let curData: any;

app.post('/', (req:any,res:any) => {
    const parcel = req.body;
    console.log(parcel);
    if(!parcel){
        return res.status(400).send({status: 'failed'});
    }
    res.status(200).send({status: 'recieved'})
    const curData = JSON.parse(parcel);
    console.log()
    createFirstXLSX(curData);
}) 

app.listen(port, () => {console.log(`live on http://localhost:${port}`)})


//check if website is requested -> if event stop pressed send object or json to server
//put data into table /caculate values

//start template Excel Datei - Erste Reihe
const data = [
    ["Arbeitsplatz", "Arbeitskraft", "Arbeitsschritt", "SollMenge", "IstMenge", "Notiz"],
    []
];

function createFirstXLSX(data:any){
    const workbook01 = XLSX.utils.book_new();
    //const worksheet = XLSX.utils.aoa_to_sheet(data);
    //XLSX.utils.sheet_add_json(worksheet,curData);

    const worksheetjson = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook01, worksheetjson, 'Arbeitskraft');
    XLSX.writeFile(workbook01, "Erfassung.xlsx");
    console.log("passt");
}
