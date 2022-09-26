"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Zeit {
    constructor() {
        //get inputs
        this.arbeitsplatz = parseInt(document.querySelector('#Arbeitsplatz').value);
        this.arbeitkraft = document.querySelector("#Arbeitskraft").value;
        this.arbeitschritt = document.querySelector("#Arbeitsschritt-Code").value;
        this.sollmenge = parseInt(document.querySelector('#SollMenge').value);
        this.istmenge = parseInt(document.querySelector('#IstMenge').value);
        this.notiz = document.querySelector("#Fehler").value;
        this.pausenzeit = 0;
        this.running = false;
        this.paused = false;
    }
    startTimer() {
        if (this.running === true) {
            console.log("timer already running");
        }
        else {
            let start = Date.now();
            this.startzeit = start;
            this.running = true;
            console.log("timer" + this.arbeitsplatz + "started");
        }
    }
    stopTimer() {
        if (this.running === false) {
            console.log("no timer running");
        }
        else {
            let zeit = Date.now() - this.startzeit - this.pausenzeit;
            this.zeit = zeit;
            this.running = false;
            console.log("timer" + this.arbeitsplatz + "stopped");
        }
    }
    pauseTimer() {
        if (this.paused === true) {
            console.log("timer not running");
        }
        else {
            let pausestart = Date.now();
            this.startzeitpause = pausestart;
            this.paused = true;
            console.log("timer" + this.arbeitsplatz + "paused");
        }
    }
    resumeTimer() {
        if (this.paused === false) {
            console.log("timer running");
        }
        else {
            let pausenzeit = Date.now() - this.startzeitpause;
            this.paused = false;
            console.log("timer" + this.arbeitsplatz + "resumed");
        }
    }
    getTime() {
        return this.zeit;
    }
}
const arbeitsplatzIn = document.querySelector('#Arbeitsplatz');
arbeitsplatzIn.addEventListener('change', updateArbeitsplatz);
let arbeitsplatz = getArbeitsplatz();
function updateArbeitsplatz() {
    if (arbeitsplatzIn !== null) {
        arbeitsplatz = parseInt(arbeitsplatzIn.value);
    }
}
function getArbeitsplatz() {
    const arbeitsplatz = parseInt(document.querySelector('#Arbeitsplatz').value);
    return arbeitsplatz;
}
function initTimer() {
    const timer = new Zeit();
    /*  console.log(timer01.arbeitsplatz,
                 timer01.arbeitkraft,
                 timer01.arbeitschritt,
                 timer01.sollmenge,
                 timer01.notiz,
                 timer01.istmenge
                 ); */
    return timer;
}
function startStopButton(obj) {
    if (obj.running === false) {
        obj.startTimer();
    }
    else if (obj.running === true) {
        obj.stopTimer();
    }
}
function pauseResumeButton(obj, button) {
    if (obj.paused === false) {
        obj.pauseTimer();
        button.innerHTML = 'Resume';
    }
    else {
        obj.resumeTimer();
        button.innerHTML = 'Pause';
    }
}
let timerCollection = [];
/* if (typeof window !== 'undefined') {

    const startbutton: any = document.querySelector('#startbutton');
    const pausebutton: any = document.querySelector('#pausebutton');

    if (startbutton != null) {
        const arbeitsplatz = getArbeitsplatz();
        if(timerCollection[arbeitsplatz] != null){
            startbutton.innerHTML = 'Stop';
        }
        startbutton.addEventListener("click", () => {
                if(timerCollection[arbeitsplatz] == null){
                    timerCollection[arbeitsplatz] = initTimer();
                    startStopButton(timerCollection[arbeitsplatz]);
                    //startbutton.innerHTML = 'Start';
                    //.log(timerCollection[arbeitsplatz].running);
                }else{
                    if (window.confirm('Timer Stoppen?')){
                        startStopButton(timerCollection[arbeitsplatz]);
                        const Zeit = timerCollection[arbeitsplatz].getTime();
                        console.log(Zeit/1000)
                        //pausebutton.innerHTML = 'Pause'
                    }
                }
        });
    }
    if (pausebutton !== null) {
        pausebutton.addEventListener("click", () => {
            if(startbutton.innerHTML === 'Stop'){
                pauseResumeButton(timerCollection[getArbeitsplatz()], pausebutton);
            }
        });
    }
}
else {
    console.log('You are on the server');
}   */
const startbutton = document.querySelector('#startbutton');
const pausebutton = document.querySelector('#pausebutton');
if (typeof window !== 'undefined' && startbutton !== null && pausebutton !== null) {
    arbeitsplatzIn.addEventListener('change', () => {
        if (timerCollection[arbeitsplatz] != null) {
            startbutton.innerHTML = 'Stop';
            if (timerCollection[arbeitsplatz].paused == false) {
                pausebutton.innerHTML = 'Pause';
            }
        }
        else if (timerCollection[arbeitsplatz] == null) {
            startbutton.innerHTML = 'Start';
        }
    });
    startbutton.addEventListener("click", function () {
        if (arbeitsplatzIn.validity.valid) {
            if (timerCollection[arbeitsplatz] == null) {
                timerCollection[arbeitsplatz] = initTimer();
                startStopButton(timerCollection[arbeitsplatz]);
            }
            else {
                if (window.confirm('Timer Stoppen?')) {
                    startStopButton(timerCollection[arbeitsplatz]);
                    const Zeit = timerCollection[arbeitsplatz].getTime();
                    console.log(Zeit / 1000);
                    startbutton.innerHTML = 'Start';
                    pausebutton.innerHTML = 'Pause';
                    const obj = timerCollection[arbeitsplatz];
                    postInfo(obj);
                    timerCollection[arbeitsplatz] = null;
                    //export object => clear arrayindex
                }
            }
            arbeitsplatzIn.value = '';
        }
    });
    pausebutton.addEventListener("click", () => {
        if (timerCollection[arbeitsplatz] != null) {
            pauseResumeButton(timerCollection[arbeitsplatz], pausebutton);
        }
    });
}
const baseUrl = 'http://localhost:8080';
function postInfo(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(baseUrl, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(e)
        });
        const content = yield res.json();
    });
}
//export 
//module.exports = timerOBJ;
