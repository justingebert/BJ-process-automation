
class Zeit{
    //get inputs
    arbeitsplatz: number = parseInt((<HTMLInputElement>document.querySelector('#Arbeitsplatz')).value);
    arbeitkraft: string = (<HTMLInputElement>document.querySelector("#Arbeitskraft")).value;
    arbeitschritt: string = (<HTMLInputElement>document.querySelector("#Arbeitsschritt-Code")).value;
    sollmenge: number = parseInt((<HTMLInputElement>document.querySelector('#SollMenge')).value);
    istmenge: number = parseInt((<HTMLInputElement>document.querySelector('#IstMenge')).value);
    notiz: string = (<HTMLInputElement>document.querySelector("#Fehler")).value;
    //caculate time
    zeit!: number;
    startzeit!: number;
    startzeitpause!: number;
    pausenzeit: number = 0;
    running = false;
    paused = false;

    constructor(){
                    
    }
    startTimer(): void{
        if(this.running === true){
            console.log("timer already running");
        }else{
            let start = Date.now();
            this.startzeit = start;
            this.running = true;
            console.log("timer"+this.arbeitsplatz+"started")
        }     
    }
    stopTimer(): void{
        if(this.running === false){
            console.log("no timer running");
        }else{
            let zeit = Date.now() - this.startzeit - this.pausenzeit;
            this.zeit = zeit;
            this.running = false;
            console.log("timer"+this.arbeitsplatz+"stopped")
        }    
    }
    pauseTimer(): void{
        if(this.paused === true){
            console.log("timer not running")
        }else{
            let pausestart = Date.now();
            this.startzeitpause = pausestart;
            this.paused = true;
            console.log("timer"+this.arbeitsplatz+"paused")
        } 
    }
    resumeTimer(): void{
        if(this.paused === false){
            console.log("timer running")
        }else{
            let pausenzeit = Date.now() - this.startzeitpause;
            this.paused = false;
            console.log("timer"+this.arbeitsplatz+"resumed")
        }
    }
    getTime(): number{
        return this.zeit
    }
}

const arbeitsplatzIn = <HTMLInputElement>document.querySelector('#Arbeitsplatz');
arbeitsplatzIn.addEventListener('change',updateArbeitsplatz);
let arbeitsplatz: number = getArbeitsplatz();

function updateArbeitsplatz(): void{
    if(arbeitsplatzIn !== null){
        arbeitsplatz = parseInt(arbeitsplatzIn.value);
    }
}

function getArbeitsplatz(){
    const arbeitsplatz: number = parseInt((<HTMLInputElement>document.querySelector('#Arbeitsplatz')).value);
    return arbeitsplatz;
}
function initTimer():any{
    const timer  = new Zeit();
   /*  console.log(timer01.arbeitsplatz,
                timer01.arbeitkraft,
                timer01.arbeitschritt,
                timer01.sollmenge,
                timer01.notiz,
                timer01.istmenge
                ); */
    return timer;
}
function startStopButton(obj: any){
    if(obj.running === false){
        obj.startTimer();
    }else if(obj.running === true){
        obj.stopTimer();  
    }
}
function pauseResumeButton(obj: any, button:Element){
    if(obj.paused === false){
        obj.pauseTimer();
        button.innerHTML = 'Resume';
    }else{
        obj.resumeTimer();
        button.innerHTML = 'Pause';
    }
}

let timerCollection:any = [];

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

const startbutton: any = document.querySelector('#startbutton');
const pausebutton: any = document.querySelector('#pausebutton');


if(typeof window !== 'undefined' && startbutton !== null && pausebutton !== null){
    arbeitsplatzIn.addEventListener('change',()=>{
        if(timerCollection[arbeitsplatz] != null){
            startbutton.innerHTML = 'Stop';
            if(timerCollection[arbeitsplatz].paused == false){
                pausebutton.innerHTML = 'Pause';
            }
        }else if(timerCollection[arbeitsplatz] == null){
            startbutton.innerHTML = 'Start';
        }
    });
    startbutton.addEventListener("click",function() {
        if(arbeitsplatzIn.validity.valid){
            if(timerCollection[arbeitsplatz] == null){
                timerCollection[arbeitsplatz] = initTimer();
                startStopButton(timerCollection[arbeitsplatz]);
            }
            else {
                if (window.confirm('Timer Stoppen?')){
                    startStopButton(timerCollection[arbeitsplatz]);
                    const Zeit = timerCollection[arbeitsplatz].getTime();
                    console.log(Zeit/1000);
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
        if(timerCollection[arbeitsplatz] != null){
            pauseResumeButton(timerCollection[arbeitsplatz], pausebutton);
        }
    });
}

const baseUrl = 'http://localhost:8080';

async function postInfo(e:any) {
    const res = await fetch(baseUrl,
    {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(e)
    })
    const content = await res.json();
}
//export 
//module.exports = timerOBJ;

