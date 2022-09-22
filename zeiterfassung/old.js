"use strict";
exports.__esModule = true;
var XLSX = require("xlsx");
var Zeit = /** @class */ (function () {
    function Zeit() {
        //arbeitsplatz: number = parseInt((<HTMLInputElement>document.querySelector('#Arbeisplatz')).value);
        this.arbeitkraft = document.querySelector("#Arbeitskraft").value;
        this.arbeitschritt = document.querySelector("#Arbeitsschritt-Code").value;
        this.sollmenge = parseInt(document.querySelector('#SollMenge').value);
        this.notiz = document.querySelector("#Fehler").value;
        this.running = false;
    }
    Zeit.prototype.startTimer = function () {
        if (this.running === true) {
            console.log("timer already running");
        }
        else {
            var start = Date.now();
            this.startzeit = start;
            this.running = true;
            console.log("timer started");
        }
    };
    Zeit.prototype.stopTimer = function () {
        if (this.running === false) {
            console.log("no timer running");
        }
        else {
            var zeit = Date.now() - this.startzeit - this.pausenzeit;
            this.zeit = zeit;
            console.log("timer stopped");
        }
    };
    Zeit.prototype.pauseTimer = function () {
        if (this.running === false) {
            console.log("timer not running");
        }
        else {
            var pausestart = Date.now();
            this.startzeitpause = pausestart;
            console.log("timer paused");
        }
    };
    Zeit.prototype.resumeTimer = function () {
        if (this.running === true) {
            console.log("timer running");
        }
        else {
            var pausenzeit = Date.now() - this.startzeitpause;
            console.log("timer resumed");
        }
    };
    Zeit.prototype.getTime = function () {
        return this.zeit;
    };
    return Zeit;
}());
function initTimer() {
    //let timer01 = new Zeit();
    console.log("hello");
}
var testDate = Date.now();
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var year = day * 365;
testDate = testDate / hour;
console.log(testDate);
var timer01 = new Zeit();
if (typeof window !== 'undefined') {
    var startbutton = document.querySelector('#startbutton');
    if (startbutton != null) {
        startbutton.addEventListener("click", createFirstXLSX);
    }
}
else {
    console.log('You are on the server');
}
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
    var Arbeitskraft = Arbeitskraefte.get(timer01.arbeitkraft);
    XLSX.utils.book_append_sheet(workbook01, worksheet, Arbeitskraft);
    XLSX.writeFile(workbook01, "Erfassung.xlsx");
    console.log("passt");
}
//createFirstXLSX();
//const workbook01 = XLSX.utils.book_new();
//const worksheet = 
//XLSX.writefile(workbook01, "testfile01.xlsx")
