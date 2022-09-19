"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const XLSX = require("xlsx");
class Zeit {
    //arbeitsplatz: number = parseInt((<HTMLInputElement>document.querySelector('#Arbeisplatz')).value);
    arbeitkraft = document.querySelector("#Arbeitskraft").value;
    arbeitschritt = document.querySelector("#Arbeitsschritt-Code").value;
    sollmenge = parseInt(document.querySelector('#SollMenge').value);
    istmenge;
    notiz = document.querySelector("#Fehler").value;
    zeit;
    startzeit;
    startzeitpause;
    pausenzeit;
    running = false;
    constructor() {
    }
    startTimer() {
        if (this.running === true) {
            console.log("timer already running");
        }
        else {
            let start = Date.now();
            this.startzeit = start;
            this.running = true;
            console.log("timer started");
        }
    }
    stopTimer() {
        if (this.running === false) {
            console.log("no timer running");
        }
        else {
            let zeit = Date.now() - this.startzeit - this.pausenzeit;
            this.zeit = zeit;
            console.log("timer stopped");
        }
    }
    pauseTimer() {
        if (this.running === false) {
            console.log("timer not running");
        }
        else {
            let pausestart = Date.now();
            this.startzeitpause = pausestart;
            console.log("timer paused");
        }
    }
    resumeTimer() {
        if (this.running === true) {
            console.log("timer running");
        }
        else {
            let pausenzeit = Date.now() - this.startzeitpause;
            console.log("timer resumed");
        }
    }
    getTime() {
        return this.zeit;
    }
}
function initTimer() {
    let timer01 = new Zeit();
    console.log("hello");
}
let testDate = Date.now();
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;
testDate = testDate / hour;
console.log(testDate);
if (typeof window !== 'undefined') {
    const startbutton = document.querySelector('#startbutton');
    if (startbutton != null) {
        startbutton.addEventListener("click", initTimer);
    }
}
else {
    console.log('You are on the server');
}
const data = [
    ["Name", "Age", "Location"],
    ["Bob", 24, "NYC"],
    ["Jason", 30, "LA"]
];
const worksheet = XLSX.utils.aoa_to_sheet(data);
const workbook01 = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook01, worksheet, "Sheet1");
XLSX.writeFile(workbook01, "SheetJS.xlsx");
//const workbook01 = XLSX.utils.book_new();
//const worksheet = 
//XLSX.writefile(workbook01, "testfile01.xlsx")
