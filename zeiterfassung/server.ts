//const express = require('express');
import express from 'express';
const app = express();
import XLSX from 'xlsx';

import * as fs from 'fs';
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

let curData: any;

app.post('/', (req:any,res:any) => {
    const parcel = req.body;
    //console.log(parcel);
    if(!parcel){
        return res.status(400).send({status: 'failed'});
    }
    res.status(200).send({status: 'recieved'})
    prepareData(parcel);
    curData = [parcel];
    createORappend(curData);
    console.log(curData);
    console.log(curData[0].arbeitskraft);
}) 

app.listen(port, () => {console.log(`live on http://localhost:${port}`)})

//check if website is requested -> if event stop pressed send object or json to server
//put data into table /caculate values

//start template Excel Datei - Erste Reihe
const datatop = [
    ["Arbeitsplatz", "Arbeitskraft", "Arbeitsschritt", "Notiz","Zeit","Zeit pro Artikel"],
    []
];

const pathExcel = 'Erfassung.xlsx';

function createORappend(data: any){
    fs.open(pathExcel, 'r', (err, fd) => {
        if (err){
            createXLSX(data);
        }else{
            appendJSON(data);
        }
          });
}
//what is fd?

//solve with lodash omit?
function prepareData(data:any){
    delete data.running;
    delete data.paused;
    delete data.startzeit;
    delete data.startzeit;
    data.zeit = data.zeit/1000
    data.artikelzeit = data.zeit/data.istmenge;
    delete data.sollmenge;
    delete data.istmenge;
}

function appendJSON(data:any){
    const workbook01 = XLSX.readFile(pathExcel);
    const worksheet = workbook01.Sheets[data[0].arbeitskraft];
    const worksheetjson = XLSX.utils.sheet_add_json(worksheet,data);
    const sheetname: string = String(data[0].arbeitskraft);
    XLSX.utils.book_append_sheet(workbook01, worksheetjson, sheetname);
    XLSX.writeFile(workbook01, "Erfassung.xlsx");
    console.log("added");
}

function createXLSX(data:any){
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(datatop);
    XLSX.utils.sheet_add_json(worksheet,data);
    const sheetname: string = String(data[0].arbeitskraft);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetname);
    XLSX.writeFile(workbook, "Erfassung.xlsx");
    console.log("created");
}


function getJsonStructure(){
    let workbook = XLSX.readFile("test.xlsx");
    let worksheet = workbook.Sheets['Tabelle1'];
    let jsa = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsa);

}

//getJsonStructure();