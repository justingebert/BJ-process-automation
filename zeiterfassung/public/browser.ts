import * as qrcode from 'html5-qrcode';

class Zeit{
    arbeitsplatz: number = parseInt((<HTMLInputElement>document.querySelector('#Arbeitsplatz')).value);
    arbeitskraft: string = (<HTMLInputElement>document.querySelector("#Arbeitskraft")).value;
    auftragsnummer: string = (<HTMLInputElement>document.querySelector("#Auftragsnummer")).value;
    modellnummer: string = (<HTMLInputElement>document.querySelector("#Modellnummer")).value;
    arbeitschritt: string = (<HTMLInputElement>document.querySelector("#Arbeitsschritt-Code")).value;
    sollmenge: number = parseInt((<HTMLInputElement>document.querySelector('#SollMenge')).value);
    istmenge: number = parseInt((<HTMLInputElement>document.querySelector('#IstMenge')).value);
    notiz: string = (<HTMLInputElement>document.querySelector("#Fehler")).value;


    zeit!: number;
    startzeit!: number;
    startzeitpause!: number;
    pausenzeit: number = 0;
    running = false;
    paused = false;

    pause:boolean = false;
    stop: boolean = false;
    interface: boolean = false;
}



//todo auftragsnummer + modellnummer (welcher endartikel?)
//todo arbeitsschritt sollzeit
//todo richtzeit in interface 

const startbutton: any = document.querySelector('#startbutton');
const pausebutton: any = document.querySelector('#pausebutton');

const arbeitsplatzInput = <HTMLInputElement>document.querySelector('#Arbeitsplatz');
arbeitsplatzInput.addEventListener('change',updateUI);
let arbeitsplatz:number;

let curData: any;

function getArbeitsplatz(): void{
    if(arbeitsplatzInput !== null){
        arbeitsplatz = parseInt(arbeitsplatzInput.value);
    }
}

//update Buttons for current Timer
async function updateUI(){
    //get info if timer is running
    await getArbeitsplatz();
    await getInfo(arbeitsplatz);
    if(curData == null){
        startbutton.innerHTML = "START";
        pausebutton.innerHTML = "PAUSE";
    }else{
        startbutton.innerHTML = "STOP";
        console.log(curData);   
        if(curData.paused){
            pausebutton.innerHTML = 'RESUME';
        }else if(!curData.paused){
            pausebutton.innerHTML = 'PAUSE';
        }    
    }
}

//todo stop stays when arbeitsplatz is empty
//todo when stopped on interface mainbutton doesnt change 

//button listeners
if(typeof window !== 'undefined' && startbutton !== null && pausebutton !== null){

    startbutton.addEventListener("click",async function() {
        if(arbeitsplatzInput.validity.valid){
            if(startbutton.innerHTML == 'START'){
                if (window.confirm(`Timer ${arbeitsplatz} Starten?`)){
                    const obj = new Zeit();
                    obj.stop = false;
                    await postInfo(obj);
                }
            }else if(startbutton.innerHTML == 'STOP'){
                if (window.confirm(`Timer ${arbeitsplatz} Stoppen?`)){
                    await getInfo(arbeitsplatz)
                    const obj =  timerCollection[arbeitsplatz]
                    obj.stop = true;
                    await postInfo(obj);
                    startbutton.innerHTML = "START";
                }
            }
                arbeitsplatzInput.value = '';
        }
    });

    pausebutton.addEventListener("click", () => {
        if(arbeitsplatzInput.validity.valid){
            const obj:Zeit = timerCollection[arbeitsplatz];
            if(pausebutton.innerHTML == 'PAUSE'){
                if (window.confirm(`Timer ${arbeitsplatz} Pausieren?`)){
                    obj.pause = true; 
                    postInfo(obj);
                    pausebutton.innerHTML = 'RESUME';
                }
            }else if(pausebutton.innerHTML == 'RESUME'){
                if (window.confirm(`Timer ${arbeitsplatz} Fortsetzen?`)){
                    obj.pause = false; 
                    postInfo(obj);
                    pausebutton.innerHTML = 'PAUSE';
                }
            }
            arbeitsplatzInput.value = '';
        }
    });
}

//todo update zeit

let timerCollection: any = [];
//todo interrate over intefaceData and create interfaceses ++ update Time
 setInterval(async()=>{
    await getInfo(0);
    for(let i = 1; i<timerCollection.length; i++){
        const obj = timerCollection[i];
        
        let hasInterface:any = document.getElementById(String(i)); 
        if(obj != null && obj.interface == true && hasInterface == null){
            const id = obj.arbeitsplatz;
            await createTimerInferface(id);
            obj.interface = true;
            await postInfo(obj);
        }
        if(obj != null && hasInterface){
            const zeit = msToTime(obj.zeit);
            hasInterface.querySelectorAll("p")[1].textContent = `Zeit: ${zeit}`;
            if(obj.paused){
                hasInterface.querySelectorAll("button")[1].innerHTML = "RESUME";
            }else if(!obj.paused){
                hasInterface.querySelectorAll("button")[1].innerHTML = "PAUSE";
            }
        }
        if(obj == null && hasInterface){
            await removeTimerInterface(i);
        }
        
    }
},5000);
 
//todo fix ms not / 1000

function padTo2Digits(num:any) {
    return num.toString().padStart(2, '0');
  }

function msToTime(ms: number):string{
    let sec = Math.floor(ms / 1000);
    let min = Math.floor(sec / 60);
    let h = Math.floor(min/60);

    sec = sec % 60;
    min = min % 60;

    return `${padTo2Digits(h)}:${padTo2Digits(min)}:${padTo2Digits(sec)}`;
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

    //make seprate function Code used twice also in main Stop button
    //todo get info from interface data 
    const obj = timerCollection[id];

    stopbut.addEventListener('click',async() => {
        if (window.confirm(`Timer ${id} Stoppen?`)){
                    await getInfo(id)
                    const obj =  timerCollection[id]
                    console.log(id);
                    obj.stop = true;
                    await postInfo(obj);
                }
    })

    pausebut.addEventListener("click", () => {
        if(pausebut.innerHTML == 'PAUSE'){
            if (window.confirm(`Timer ${id} Pausieren?`)){
                obj.pause = true; 
                postInfo(obj);
                pausebut.innerHTML = 'RESUME';
            }
        }else if(pausebut.innerHTML == 'RESUME'){
            if (window.confirm(`Timer ${id} Fortsetzen?`)){
                obj.pause = false; 
                postInfo(obj);
                pausebut.innerHTML = 'PAUSE';
            }
        }
    });

    area.appendChild(clone);
}


function removeTimerInterface(id: any){
    let removeInterface:any = document.getElementById(id);
    removeInterface.remove();
}


//send to Server
const baseUrl = '/';
//const baseUrl2 = '/';


async function postInfo(e:Zeit) {
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

async function getInfo(e:any) {

    const res = await fetch(baseUrl + e,{
        method: 'GET'
    });
    const data = await res.json();
    curData = data;
    if(e == 0){
        timerCollection = data
    }else{
        timerCollection[e] = data;
    }
    console.log(timerCollection);
}


let resultContainer = document.getElementById('qr-reader-results');
let lastResult = 0;
let countResults = 0;

function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
        ++countResults;
        lastResult = decodedText;
        // Handle on success condition with the decoded message.
        console.log(`Scan result ${decodedText}`, decodedResult);
    }
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);
//not used
