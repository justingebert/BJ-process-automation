class Zeit{
    //get inputs
    arbeitsplatz: number = parseInt((<HTMLInputElement>document.querySelector('#Arbeitsplatz')).value);
    arbeitskraft: string = (<HTMLInputElement>document.querySelector("#Arbeitskraft")).value;
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
        button.innerHTML = 'RESUME';
    }else{
        obj.resumeTimer();
        button.innerHTML = 'PAUSE';
    }
}

let timerCollection:any = [];

const startbutton: any = document.querySelector('#startbutton');
const pausebutton: any = document.querySelector('#pausebutton');


if(typeof window !== 'undefined' && startbutton !== null && pausebutton !== null){

    arbeitsplatzIn.addEventListener('change',()=>{
        if(timerCollection[arbeitsplatz] != null){
            startbutton.innerHTML = 'STOP';
            if(timerCollection[arbeitsplatz].paused == false){
                pausebutton.innerHTML = 'Pause';
            }
        }else if(timerCollection[arbeitsplatz] == null){
            startbutton.innerHTML = 'START';
        }
    });

    startbutton.addEventListener("click",function() {
        if(arbeitsplatzIn.validity.valid){
            if(timerCollection[arbeitsplatz] == null){
                if (window.confirm(`Timer ${arbeitsplatz} Starten?`)){
                    timerCollection[arbeitsplatz] = initTimer();
                startStopButton(timerCollection[arbeitsplatz]);
                }
            }
            else {
                if (window.confirm(`Timer ${arbeitsplatz} Stoppen?`)){
                    startStopButton(timerCollection[arbeitsplatz]);
                    const Zeit = timerCollection[arbeitsplatz].getTime();
                    console.log(Zeit/1000);
                    startbutton.innerHTML = 'START';
                    pausebutton.innerHTML = 'PAUSE';
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

function msToTime(s: any){
    let ms = s % 1000;
    s = (s-ms) /1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s / 60;
    let hrs = (s-mins) / 60;
    return hrs + ':' + mins + ':' + secs;
}

//manipulate html
function createTimerInferface(id:any){
    let temp:any = document.querySelector('#TimerInterface')
    let area:any = document.querySelector('#running');

    let clone = document.importNode(temp.content, true);
    clone.querySelector("p").textContent =  `Arbeitsplatz: ${id} `;
    clone.querySelector("div").id = id;

    const stopbut = clone.getElementById("interfaceStopButton");
    const pausebut = clone.getElementById("interfacePauseButton");
    stopbut.id = `interface${id}StopButton`;
    pausebut.id = `interface${id}PauseButton`;

    console.log(stopbut);
    console.log(pausebut);
    //make seprate function Code used twice also in main Stop button
    stopbut.addEventListener('click',() => {
        console.log('wortks');
        if(timerCollection[id] != null){
            if (window.confirm(`Timer ${id} Stoppen?`)){
                startStopButton(timerCollection[id]);
                const Zeit = timerCollection[id].getTime();
                console.log(Zeit/1000);
                startbutton.innerHTML = 'START';
                pausebutton.innerHTML = 'PAUSE';
                const obj = timerCollection[id];
                postInfo(obj);
                timerCollection[id] = null;
                //export object => clear arrayindex
            }
        }
    })

    pausebut.addEventListener("click", () => {
        if(timerCollection[id] != null){
            pauseResumeButton(timerCollection[id], pausebut);
        }
    });
    area.appendChild(clone);
}

async function interfaceEventListen(){

}

createTimerInferface(5);
createTimerInferface(56);

function removeTimerInterface(id: any){
    let removeInterface:any = document.getElementById(id);
    removeInterface.remove();
}





//send to Server
const baseUrl = '/';
//const baseUrl2 = '/';


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


//not used
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
