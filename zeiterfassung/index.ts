import * as XLSX from 'xlsx';

import * as fs from 'fs';
XLSX.set_fs(fs);

import { Readable } from 'stream';
XLSX.stream.set_readable(Readable);
interface Zeit{
    
}

class Zeit{

    arbeitsplatz: number = document.getElementById();
    arbeitkraft: string;
    arbeitschritt: string;  
    sollmenge: number;
    istmenge: number;



    zeit: number;
    startzeit: number;
    startzeitpause: number;
    pausenzeit : number;
    running = false;

    constructor(arbeitsplatz:number, arbeitkraft: string, 
                arbeitschritt: string,sollmenge: number){
                    this.arbeitsplatz = arbeitsplatz;
                    this.arbeitkraft = arbeitkraft;
                    this.arbeitschritt = arbeitschritt;
                    this.sollmenge = sollmenge;

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
    
}

console.log(start);

document.getElementById("startbutton").addEventListener("click",initTimer);