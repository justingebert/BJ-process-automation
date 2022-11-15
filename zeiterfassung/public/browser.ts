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

//todo arbeitsschritt sollzeit ???
//todo richtzeit in interface ???

const startbutton: any = document.querySelector('#startbutton');
const pausebutton: any = document.querySelector('#pausebutton');
//const downloadbutton: any = document.querySelector("#downloadbutton");

const arbeitsplatzInput = <HTMLInputElement>document.querySelector('#Arbeitsplatz');
//arbeitsplatzInput.addEventListener('change',updateUI);
let arbeitsplatz:number;

let curData: any;

let timerCollection: any = [];



function getArbeitsplatz(): void{
    if(arbeitsplatzInput !== null){
        arbeitsplatz = parseInt(arbeitsplatzInput.value);
    }else{
        arbeitsplatz = 0;
    }
}

function inputsValid(){
    
}

//update Buttons for current Timer
async function updateUI(){
    //get info if timer is running
        await getArbeitsplatz();
        await getInfo(arbeitsplatz);
        if(timerCollection[arbeitsplatz] == null){
           
            startbutton.innerHTML = "START";
            pausebutton.innerHTML = "PAUSE";
        }else{
            startbutton.innerHTML = "STOP";
            if(timerCollection[arbeitsplatz].paused){
                pausebutton.innerHTML = 'RESUME';
            }else if(!timerCollection[arbeitsplatz].paused){
                pausebutton.innerHTML = 'PAUSE';
            }    
        } 
}


function copyData(obj: Zeit){
    const sendtimer:Zeit = timerCollection[obj.arbeitsplatz];
    if(sendtimer != null){
        sendtimer.arbeitsplatz = obj.arbeitsplatz;
        sendtimer.arbeitskraft = obj.arbeitskraft;
        sendtimer.auftragsnummer = obj.auftragsnummer;
        sendtimer.modellnummer = obj.modellnummer;
        sendtimer.arbeitschritt = obj.arbeitschritt;
        sendtimer.sollmenge = obj.sollmenge;
        sendtimer.istmenge = obj.istmenge;
        sendtimer.notiz = obj.notiz;
        sendtimer.interface = obj.interface;
    }
    timerCollection[obj.arbeitsplatz] = sendtimer;
}

//convert ms to Time Format
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


//todo stop stays when arbeitsplatz is empty

//start & stop button with input checking
const istMengeInput:HTMLInputElement | any = document.getElementById('IstMenge');

const form:any = document.getElementById('formwinputs');
async function handleForm(event:Event) { 
    event.preventDefault(); 
    
    if(startbutton.innerHTML == 'START'){
        if (window.confirm(`Timer ${arbeitsplatz} Starten?`)){
            
            const obj = new Zeit();
            obj.stop = false;
            //console.log("hallo")
            startbutton.innerHTML = "STOP";
            await postInfo(obj);
            
            
        }
    }else if(startbutton.innerHTML == 'STOP'){
        const istMengeValue = istMengeInput.value;
        
        if(istMengeValue != ''){
            if (window.confirm(`Timer ${arbeitsplatz} Stoppen?`)){
                await getInfo(arbeitsplatz)
                const inputobj = new Zeit();
                copyData(inputobj); 
                const obj =  timerCollection[arbeitsplatz]
                obj.stop = true;
                await postInfo(obj);
                startbutton.innerHTML = "START";
            }
        }else{
            alert("Istmenge ausfüllen!");   
           
            
        }
        //sollmenge nicht ausgefuellt? fehlermeldung 
    }

} 
form.addEventListener('submit', handleForm);

//button listeners
if(typeof window !== 'undefined' && startbutton !== null && pausebutton !== null){
    pausebutton.addEventListener("click", async () => {
        if(arbeitsplatzInput.validity.valid){
            await getInfo(arbeitsplatz)
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
            //arbeitsplatzInput.value = '';
        }
    });
} 

//downloadbutton listneer
/* if(typeof window !== 'undefined' && downloadbutton !== null){
    downloadbutton.addEventListener("click", async() => { 
        await getExcel();
        console.log("test");
    })
} */


const user = document.getElementById('zeit');

//SITE WITH INTERFACES
if(user === null){

    //update interfaces and timercollection
    setInterval(async()=>{
        await getInfo(0);
        updateUI();
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
        if(timerCollection.length === 0){
            await removeAllInterfaces();
        }
    },2000);

}
//SITE WITHOUT INTERFACES
else{
    setInterval(async () => {
        await getInfo(0);
        await updateUI
        getArbeitsplatz();
        //console.log(timerCollection)
        //console.log(curData)
        if(timerCollection[arbeitsplatz] != null){
            const obj = timerCollection[arbeitsplatz];
        const zeit = msToTime(obj.zeit);
        user.innerHTML = `Zeit: ${zeit}`;
        }else{
            user.innerHTML = `Zeit: 00:00:00`;
        }
    },1000);
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
        const istMengeValue = istMengeInput.value;
        
        if(istMengeValue != ''){
            if (window.confirm(`Timer ${id} Stoppen?`)){
                    await getInfo(id)
                    const obj =  timerCollection[id]
                    console.log(id);
                    obj.stop = true;
                    await postInfo(obj);
            }
        }else{
            alert("Istmenge ausfüllen!");   
        }
    })

    pausebut.addEventListener("click", async () => {
        await getInfo(arbeitsplatz)
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

function removeAllInterfaces(){
    let removeInterface:any = document.getElementById('running');
    if(removeInterface != null){
        removeInterface.innerHTML = '';
    }
}

//send to Server
const baseUrl = '';
//const baseUrl2 = '/';

function getCurURL(){
    return window.location.href;
}

const url = getCurURL();
//console.log(url)

const baseUrl2 = 'https://localhost';

async function postInfo(e:Zeit) {
    const res = await fetch(baseUrl + '/e',
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

    const res = await fetch(baseUrl +'/arbeitsplatz/data/'+ e,{
        method: 'GET'
    });
    const data = await res.json();
    curData = data;
    if(e == 0){
        timerCollection = data
    }else{
        timerCollection[e] = data;
    }
    //console.log(timerCollection);
}

/* async function getExcel() {
    const res = await fetch(baseUrl + '/download',{
        method: 'GET'
    });
    let data = res;
    console.log(data);
}
 */

