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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const XLSX = require("xlsx");
const path = __importStar(require("path"));
const port = 8080;
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
/* app.get('/',(req:any,res:any)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
    //res.render('index.html');
    //res.download(excel file) send excel file to device
})  */
app.listen(port, () => { console.log(`live on http://localhost:${port}`); });
//const timerOBJ = require('./browser');
//console.log("test");
//console.log(timerOBJ.zeit/1000);
//check if website is requested -> if event stop pressed send object or json to server
//put data into table /caculate values
const Arbeitskraefte = new Map([
    ['name01', 'xx01'],
    ['name02', 'xx02'],
    ['name03', 'xx03'],
    ['name04', 'xx04'],
]);
//start template Excel Datei - Erste Reihe
const data = [
    ["Arbeitsplatz", "Arbeitskraft", "Arbeitsschritt", "SollMenge", "IstMenge", "Notiz"],
    []
];
function createFirstXLSX() {
    const workbook01 = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const Arbeitskraft = Arbeitskraefte.get('xx01');
    XLSX.utils.book_append_sheet(workbook01, worksheet, Arbeitskraft);
    XLSX.writeFile(workbook01, "Erfassung.xlsx");
    console.log("passt");
}
//createFirstXLSX();
//const workbook01 = XLSX.utils.book_new();
//const worksheet = 
//XLSX.writefile(workbook01, "testfile01.xlsx")
