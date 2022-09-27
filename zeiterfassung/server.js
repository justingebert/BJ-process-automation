"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express');
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const xlsx_1 = __importDefault(require("xlsx"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const port = 8080;
app.use(express_1.default.static(path.join(__dirname, '/public')));
app.use(express_1.default.json());
//use fetch to get put json object to server
/* app.get('/',(req:any,res:any)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
    //res.render('index.html');
    //res.download(excel file) send excel file to device
})  */
let curData;
app.post('/', (req, res) => {
    const parcel = req.body;
    //console.log(parcel);
    if (!parcel) {
        return res.status(400).send({ status: 'failed' });
    }
    res.status(200).send({ status: 'recieved' });
    prepareData(parcel);
    curData = [parcel];
    createORappend(curData);
    console.log(curData);
    console.log(curData[0].arbeitskraft);
});
app.listen(port, () => { console.log(`live on http://localhost:${port}`); });
//check if website is requested -> if event stop pressed send object or json to server
//put data into table /caculate values
//start template Excel Datei - Erste Reihe
const datatop = [
    ["Arbeitsplatz", "Arbeitskraft", "Arbeitsschritt", "Notiz", "Zeit", "Zeit pro Artikel"],
    []
];
const pathExcel = 'Erfassung.xlsx';
function createORappend(data) {
    fs.open(pathExcel, 'r', (err, fd) => {
        if (err) {
            createXLSX(data);
        }
        else {
            appendJSON(data);
        }
    });
}
//what is fd?
//solve with lodash omit?
function prepareData(data) {
    delete data.running;
    delete data.paused;
    delete data.startzeit;
    delete data.startzeit;
    data.zeit = data.zeit / 1000;
    data.artikelzeit = data.zeit / data.istmenge;
    delete data.sollmenge;
    delete data.istmenge;
}
function appendJSON(data) {
    const workbook01 = xlsx_1.default.readFile(pathExcel);
    const worksheet = workbook01.Sheets[data[0].arbeitskraft];
    const worksheetjson = xlsx_1.default.utils.sheet_add_json(worksheet, data);
    const sheetname = String(data[0].arbeitskraft);
    xlsx_1.default.utils.book_append_sheet(workbook01, worksheetjson, sheetname);
    xlsx_1.default.writeFile(workbook01, "Erfassung.xlsx");
    console.log("added");
}
function createXLSX(data) {
    const workbook = xlsx_1.default.utils.book_new();
    const worksheet = xlsx_1.default.utils.aoa_to_sheet(datatop);
    xlsx_1.default.utils.sheet_add_json(worksheet, data);
    const sheetname = String(data[0].arbeitskraft);
    xlsx_1.default.utils.book_append_sheet(workbook, worksheet, sheetname);
    xlsx_1.default.writeFile(workbook, "Erfassung.xlsx");
    console.log("created");
}
function getJsonStructure() {
    let workbook = xlsx_1.default.readFile("test.xlsx");
    let worksheet = workbook.Sheets['Tabelle1'];
    let jsa = xlsx_1.default.utils.sheet_to_json(worksheet);
    console.log(jsa);
}
//getJsonStructure();
