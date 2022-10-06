class Data{
    arbeitsplatz: number = parseInt((<HTMLInputElement>document.querySelector('#Arbeitsplatz')).value);
    arbeitskraft: string = (<HTMLInputElement>document.querySelector("#Arbeitskraft")).value;
    arbeitschritt: string = (<HTMLInputElement>document.querySelector("#Arbeitsschritt-Code")).value;
    sollmenge: number = parseInt((<HTMLInputElement>document.querySelector('#SollMenge')).value);
    istmenge: number = parseInt((<HTMLInputElement>document.querySelector('#IstMenge')).value);
    notiz: string = (<HTMLInputElement>document.querySelector("#Fehler")).value;

    pause:boolean = false;
    stop: boolean = false;

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
function updateUI(){
    //get info if timer is running
    getArbeitsplatz();
    getInfo(arbeitsplatz);
    if(curData == "no Timer active"){
        startbutton.innerHTML = "Test";
    }
}


//button listeners
if(typeof window !== 'undefined' && startbutton !== null && pausebutton !== null){

    startbutton.addEventListener("click",function() {
        if(arbeitsplatzInput.validity.valid){
            const obj = new Data();
            if(startbutton.innerHTML == 'START'){
                if (window.confirm(`Timer ${arbeitsplatz} Starten?`)){
                    obj.stop == false;
                    postInfo(obj);
                }
            }else if(startbutton.innerHTML == 'STOP'){
                if (window.confirm(`Timer ${arbeitsplatz} Stoppen?`)){
                    obj.stop == true;
                    postInfo(obj);
                }
            }
                arbeitsplatzInput.value = '';
        }
    });

    pausebutton.addEventListener("click", () => {
        if(arbeitsplatzInput.validity.valid){
            if(pausebutton.innerHTML == 'PAUSE'){
                if (window.confirm(`Timer ${arbeitsplatz} Stoppen?`)){
                    curData
                    postInfo(curData);
                }
            }
            
            arbeitsplatzInput.value = '';
        }
    });

}

//todo update zeit
/* setInterval(()=>{
    let zeit:string = msToTime(timerCollection[arbeitsplatz].getTime());
    console.log(timerCollection[arbeitsplatz].getTime());
    let curinterface:any = document.getElementById(String(arbeitsplatz));
    curinterface.querySelectorAll("p")[1].textContent =  `Zeit: ${zeit} `;
},1000);


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
    stopbut.addEventListener('click',() => {
        if(timerCollection[id] != null){
            if (window.confirm(`Timer ${id} Stoppen?`)){
                startStopButton(timerCollection[id]);
                const Zeit = timerCollection[id].getTime();
                removeTimerInterface(arbeitsplatz);
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


function removeTimerInterface(id: any){
    let removeInterface:any = document.getElementById(id);
    removeInterface.remove();
}
 */

//send to Server
const baseUrl = '/';
//const baseUrl2 = '/';


async function postInfo(e:Data) {
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
    console.log(curData);
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
