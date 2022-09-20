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
            console.log("timer started")
        }     
    }

    stopTimer(): void{
        if(this.running === false){
            console.log("no timer running");
        }else{
            let zeit = Date.now() - this.startzeit - this.pausenzeit;
            this.zeit = zeit;
            this.running = false;
            console.log("timer stopped")
        }    
    }

    pauseTimer(): void{
        if(this.paused === true){
            console.log("timer not running")
        }else{
            let pausestart = Date.now();
            this.startzeitpause = pausestart;
            this.paused = true;
            console.log("timer paused")
        } 
    }

    resumeTimer(): void{
        if(this.paused === false){
            console.log("timer running")
        }else{
            let pausenzeit = Date.now() - this.startzeitpause;
            this.paused = false;
            console.log("timer resumed")
        }
    }

    getTime(): number{
        return this.zeit
    }
}

function initTimer():any{
    let timer01 = new Zeit();
    //console.log("Objekt erzeugt"); 
   /*  console.log(timer01.arbeitsplatz,
                timer01.arbeitkraft,
                timer01.arbeitschritt,
                timer01.sollmenge,
                timer01.notiz,
                timer01.istmenge
                ); */
    return timer01;
}


function startStopButton(obj: any, button:Element){
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

let timerOBJ: any;


if (typeof window !== 'undefined') {

    const startbutton: any = document.querySelector('#startbutton');
    const pausebutton: any = document.querySelector('#pausebutton');

    if (startbutton !== null) {
        startbutton.addEventListener("click", () => {
            if (startbutton.innerHTML === 'Start') {
                timerOBJ = initTimer();
                startStopButton(timerOBJ, startbutton);
                startbutton.innerHTML = 'Stop';
            }
            else if (startbutton.innerHTML === 'Stop') {
                //Object finished
                //zweitfrage einbauen - bist du sicher das du den timer stoppen willst?
                startStopButton(timerOBJ, startbutton);
                const Zeit = timerOBJ.getTime();
                console.log(Zeit/1000)
                startbutton.innerHTML = 'Start';
                pausebutton.innerHTML = 'Pause'
            }
        });
    }
    if (pausebutton !== null) {
        pausebutton.addEventListener("click", () => {
            if(startbutton.innerHTML === 'Stop'){
                pauseResumeButton(timerOBJ, pausebutton);
            }
        });
    }
}
else {
    console.log('You are on the server');
}


//export 
module.exports = timerOBJ;

