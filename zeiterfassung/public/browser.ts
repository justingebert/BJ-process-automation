class Zeit{
    arbeitsplatz: number = parseInt((<HTMLInputElement>document.querySelector('#Arbeitsplatz')).value);
    arbeitskraft: string = (<HTMLInputElement>document.querySelector("#Arbeitskraft")).value;
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
    if(curData == "no Timer active"){
        startbutton.innerHTML = "START";
        pausebutton.innerHTML = "PAUSE";
    }else{
        startbutton.innerHTML = "STOP";
        if(curData.paused){
            pausebutton.innerHTML + "RESUME";
        }else{
            pausebutton.innerHTML + "PAUSE";
        }    
    }
}


//button listeners
if(typeof window !== 'undefined' && startbutton !== null && pausebutton !== null){

    startbutton.addEventListener("click",async function() {
        if(arbeitsplatzInput.validity.valid){
            if(startbutton.innerHTML == 'START'){
                if (window.confirm(`Timer ${arbeitsplatz} Starten?`)){
                    const obj = new Zeit();
                    obj.stop = false;
                    obj.interface = true;
                    await postInfo(obj);
                }
            }else if(startbutton.innerHTML == 'STOP'){
                if (window.confirm(`Timer ${arbeitsplatz} Stoppen?`)){
                    await getInfo(arbeitsplatz)
                    const obj =  timerCollection[arbeitsplatz]
                    obj.stop = true;
                    obj.interface = false;
                    await postInfo(obj);
                    startbutton.innerHTML = "START";
                }
            }
                arbeitsplatzInput.value = '';
        }
    });

    pausebutton.addEventListener("click", () => {
        if(arbeitsplatzInput.validity.valid){
            if(pausebutton.innerHTML == 'PAUSE'){
                if (window.confirm(`Timer ${arbeitsplatz} Stoppen?`)){

                    postInfo(timerCollection[arbeitsplatz]);
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
        let hasInterface:any = document.getElementById(obj.arbeitsplatz);
        if(obj !== null && obj.interface === false){
            const id = obj.arbeitsplatz;
            await createTimerInferface(id);
            obj.interface = true;
            await postInfo(obj);
        }else if(hasInterface){
            await removeTimerInterface(i);
            obj.interface = false;
            await postInfo(obj);
        }
    }
},10000);
 

function msToTime(s: number):string{
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

    //make seprate function Code used twice also in main Stop button
    //todo get info from interface data 
    stopbut.addEventListener('click',() => {
        const obj = timerCollection[id];
        if (window.confirm(`Timer ${arbeitsplatz} Stoppen?`)){
                    obj.stop == true;
                    postInfo(obj);
                    startbutton.innerHTML = "START";
                }
    })

    pausebut.addEventListener("click", () => {
        if(pausebutton.innerHTML == 'PAUSE'){
            if (window.confirm(`Timer ${arbeitsplatz} Stoppen?`)){
                curData
                postInfo(curData);
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
    timerCollection = data
    console.log(timerCollection);
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
