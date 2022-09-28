import express from 'express';
const app = express();
import XLSX from 'xlsx';

import * as fs from 'fs';
import * as path from 'path';

const port = 8080;

app.use(express.static(path.join(__dirname,'/public')))
app.use(express.json());

let curData: any;

app.post('/', (req:any,res:any) => {
    const parcel = req.body;
    if(!parcel){
        return res.status(400).send({status: 'failed'});
    }
    res.status(200).send({status: 'recieved'})
    prepareData(parcel);
    curData = Object.values(parcel);
    createORappend(curData);
    //console.log(curData);
}) 

app.listen(port, () => {console.log(`live on http://localhost:${port}`)})

//check if website is requested -> if event stop pressed send object or json to server
//put data into table /caculate values

//start template Excel Datei - Erste Reihe
const datatop = [
    ["Arbeitsplatz", "Arbeitskraft", "Arbeitsschritt", "Notiz","Zeit","Zeit pro Artikel"],
    ];

const pathExcel = 'Erfassung.xlsx';

const testData = [
    {
      arbeitsplatz: 99,
      arbeitskraft: 'xx02',
      arbeitschritt: 'xxx001',
      notiz: 'muster',
      zeit: 2.613,
      artikelzeit: 0.2613
    }
  ]

//console.log(Object.values(testData[0]));

//console.log(Object.keys(testData[0]).length);   //anzahl der attrtibute

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
    delete data.pausenzeit;
    data.zeit = data.zeit/1000
    data.artikelzeit = data.zeit/data.istmenge;
    delete data.sollmenge;
    delete data.istmenge;
    //delte whats not in data top
}

function appendJSON(data:any){
    const workbook01 = XLSX.readFile(pathExcel);
    const worksheet:any = workbook01.Sheets[data[1]];
    if(worksheet == null){
        const worksheetjson = XLSX.utils.aoa_to_sheet(data);
        const sheetname: string = String(data[1]);
        XLSX.utils.book_append_sheet(workbook01, worksheetjson, sheetname);
    }else{
        const range  = XLSX.utils.decode_range(worksheet['!ref'])
        console.log((range.e.r));
        console.log(data);
        XLSX.utils.sheet_add_aoa(worksheet,[data],{origin: -1});
        //XLSX.utils.sheet_add_json(worksheet,testData,{origin: -1});
    }
    XLSX.writeFile(workbook01, "Erfassung.xlsx");
    console.log("added");
}


function createXLSX(data:any){
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(datatop);
    XLSX.utils.sheet_add_aoa(worksheet,[data],{origin: -1});
    const sheetname: string = String(data[1]);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetname);
    XLSX.writeFile(workbook, "Erfassung.xlsx");
    console.log("created");
}




//not used 
/* 
app.get('/',(req:any,res:any)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
    //res.render('index.html');
    //res.download(excel file) send excel file to device
}) 


function getJsonStructure(){
    let workbook = XLSX.readFile("test.xlsx");
    let worksheet = workbook.Sheets['Tabelle1'];
    let jsa = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsa);
}

 */