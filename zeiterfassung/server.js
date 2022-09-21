"use strict";
exports.__esModule = true;
var XLSX = require("xlsx");
var timerOBJ = require('./browser');
console.log(timerOBJ.zeit / 1000);
//check if website is requested -> if event stop pressed send object or json to server
//put data into table /caculate values
var Arbeitskraefte = new Map([
    ['name01', 'xx01'],
    ['name02', 'xx02'],
    ['name03', 'xx03'],
    ['name04', 'xx04'],
]);
//start template Excel Datei - Erste Reihe
var data = [
    ["Arbeitsplatz", "Arbeitskraft", "Arbeitsschritt", "SollMenge", "IstMenge", "Notiz"],
    []
];
function createFirstXLSX() {
    var workbook01 = XLSX.utils.book_new();
    var worksheet = XLSX.utils.aoa_to_sheet(data);
    var Arbeitskraft = Arbeitskraefte.get('xx01');
    XLSX.utils.book_append_sheet(workbook01, worksheet, Arbeitskraft);
    XLSX.writeFile(workbook01, "Erfassung.xlsx");
    console.log("passt");
}
//createFirstXLSX();
//const workbook01 = XLSX.utils.book_new();
//const worksheet = 
//XLSX.writefile(workbook01, "testfile01.xlsx")
