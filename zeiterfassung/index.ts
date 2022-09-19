import { writeXLSX } from "xlsx";

const XLSX = require("xlsx");
interface Zeit{
    
}

class Zeit{

    //arbeitsplatz: number = parseInt((<HTMLInputElement>document.querySelector('#Arbeisplatz')).value);
    arbeitkraft: string = (<HTMLInputElement>document.querySelector("#Arbeitskraft")).value;
    arbeitschritt: string = (<HTMLInputElement>document.querySelector("#Arbeitsschritt-Code")).value;
    sollmenge: number = parseInt((<HTMLInputElement>document.querySelector('#SollMenge')).value);
    istmenge!: number;
    notiz: string = (<HTMLInputElement>document.querySelector("#Fehler")).value;

    zeit!: number;
    startzeit!: number;
    startzeitpause!: number;
    pausenzeit!: number;
    running = false;

    constructor(){
                    

    }

    startTimer(): void{
        if(this.running === true){
            console.log("timer already running");
        }else{
            let start = Date.now();
            this.startzeit = start;
            this.running = true;
            console.log("timer started")
        }
        
    }

    stopTimer(): void{
        if(this.running === false){
            console.log("no timer running");
        }else{
            let zeit = Date.now() - this.startzeit - this.pausenzeit;
            this.zeit = zeit;
            console.log("timer stopped")
        }
        
    }

    pauseTimer(): void{
        if(this.running === false){
            console.log("timer not running")
        }else{
            let pausestart = Date.now();
            this.startzeitpause = pausestart;
            console.log("timer paused")
        }
        
    }

    resumeTimer(): void{
        if(this.running === true){
            console.log("timer running")
        }else{
            let pausenzeit = Date.now() - this.startzeitpause;
            console.log("timer resumed")
        }
    }

    getTime(): number{
        return this.zeit
    }
}

function initTimer(){
    let timer01 = new Zeit();
    console.log("hello");
}

let testDate = Date.now();

const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

testDate = testDate/hour;

console.log(testDate);

if (typeof window !== 'undefined') {
    const startbutton = document.querySelector('#startbutton');
    if(startbutton != null){
        startbutton.addEventListener("click",initTimer);
    }
} else {
    console.log('You are on the server')
}

const data = [
    ["Arbeitsplatz", "Arbeitskraft", "Arbeitsschritt", "SollMenge", "IstMenge", "Notiz"],
    []
];
const worksheet = XLSX.utils.aoa_to_sheet(data);
const workbook01 = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook01, worksheet, "Sheet1");
XLSX.writeFile(workbook01, "SheetJS.xlsx");

//const workbook01 = XLSX.utils.book_new();
//const worksheet = 

//XLSX.writefile(workbook01, "testfile01.xlsx")
