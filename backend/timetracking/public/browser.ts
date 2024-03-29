
//todo arbeitsschritt sollzeit ???
//todo richtzeit in interface ???
// * TIMER OBJECT TEMPLATE
class Zeit {
    arbeitsplatz: number = parseInt((<HTMLInputElement>document.querySelector('#Arbeitsplatz')).value);
    arbeitskraft: string = (<HTMLInputElement>document.querySelector("#Arbeitskraft")).value;
    auftragsnummer: string = (<HTMLInputElement>document.querySelector("#Auftragsnummer")).value;
    modellnummer: string = (<HTMLInputElement>document.querySelector("#Modellnummer")).value;
    arbeitschritt: number = parseInt((<HTMLInputElement>document.querySelector("#Arbeitsschritt-Code")).value);
    sollmenge: number = parseInt((<HTMLInputElement>document.querySelector('#SollMenge')).value);
    istmenge: number = parseInt((<HTMLInputElement>document.querySelector('#IstMenge')).value);
    notiz: string = (<HTMLInputElement>document.querySelector("#fehler")).value;
    sollzeit: any = (<HTMLInputElement>document.querySelector('#SollZeit')).value;

    zeit!: number;
    startzeit!: number;
    startzeitpause!: number;
    pausenzeit: number = 0;
    running = false;
    paused = false;

    pause: boolean = false;
    stop: boolean = false;
    interface: boolean = false;
}

// * ELEMENTS
const startbutton: any = document.querySelector('#startbutton');
const pausebutton: any = document.querySelector('#pausebutton');

const repabutton: HTMLButtonElement | null = document.querySelector("#repaButton");
const musterbutton: HTMLButtonElement | null = document.querySelector("#musterButton");
const sonsitgesbutton: HTMLButtonElement | null = document.querySelector("#sonstigesButton");

//const downloadbutton: any = document.querySelector("#downloadbutton");

const arbeitsplatzInput = <HTMLInputElement>document.querySelector('#Arbeitsplatz');
const arbeitskraftInput: HTMLInputElement | any = document.getElementById('Arbeitskraft');
const auftragsnummerInput: HTMLInputElement | any = document.getElementById('Auftragsnummer');
const artikelnummerInput: HTMLInputElement | any = document.getElementById('Modellnummer');
const arbeitsschrittInput: HTMLInputElement | any = document.getElementById('Arbeitsschritt-Code');
const sollZeitInput: HTMLInputElement | any = document.getElementById('SollZeit');
const sollMengeInput: HTMLInputElement | any = document.getElementById('SollMenge');
const notizInput: HTMLInputElement | any = document.querySelector("#fehler");



const istMengeInput: HTMLInputElement | any = document.getElementById('IstMenge');
const form: any = document.getElementById('formwinputs');
const user = document.getElementById('zeit');
const sollZeit: HTMLElement | any = document.getElementById('soll');

const inputArray = [auftragsnummerInput,artikelnummerInput,arbeitsschrittInput,sollZeitInput,sollMengeInput,notizInput];


// * VARIALBES
let arbeitsplatz: number;

let curData: any;

let timerCollection: any = [];

const url = getCurURL();

const baseUrl = '';
const baseUrlLocal = 'https://localhost';


// * FUNCTIONS (DATA)
//get current arbeitsplatzinput if empty set 0 - public
function getArbeitsplatz(): void {
    if (arbeitsplatzInput !== null) {
        arbeitsplatz = parseInt(arbeitsplatzInput.value);
    } else {
        arbeitsplatz = 0;
    }
}

//get current URL
function getCurURL() {
    return window.location.href;
}

//TODO check if inputs are vaild eg with AA in beginning
function inputsValid() {

}

async function updateInputs() {
    await getArbeitsplatz();
    await getInfo(arbeitsplatz);
    const curTimer = timerCollection[arbeitsplatz]
    if (curTimer != null) {
        arbeitskraftInput.value = curTimer.arbeitskraft;
        auftragsnummerInput.value = curTimer.auftragsnummer
        artikelnummerInput.value = curTimer.modellnummer
        arbeitsschrittInput.value = curTimer.arbeitschritt
        sollMengeInput.value = curTimer.sollmenge
    }
}

//update Buttons for current input
async function updateUI() {
    //get info if timer is running
    await getArbeitsplatz();
    await getInfo(arbeitsplatz);
    const curTimer = timerCollection[arbeitsplatz]
    if (curTimer == null) {
        startbutton.innerHTML = "START";
        pausebutton.innerHTML = "PAUSE";
    } else {
        startbutton.innerHTML = "STOP";
        if (curTimer.paused) {
            pausebutton.innerHTML = 'RESUME';
        } else if (!curTimer.paused) {
            pausebutton.innerHTML = 'PAUSE';
        }
    }
}

//copy object to Array
function copyData(obj: Zeit) {
    const newTimer: Zeit = timerCollection[obj.arbeitsplatz];
    if (newTimer != null) {
        newTimer.arbeitsplatz = obj.arbeitsplatz;
        newTimer.arbeitskraft = obj.arbeitskraft;
        newTimer.auftragsnummer = obj.auftragsnummer;
        newTimer.modellnummer = obj.modellnummer;
        newTimer.arbeitschritt = obj.arbeitschritt;
        newTimer.sollmenge = obj.sollmenge;
        newTimer.istmenge = obj.istmenge;
        newTimer.notiz = obj.notiz;
        newTimer.interface = obj.interface;
        newTimer.sollzeit = obj.sollzeit;
    }
    timerCollection[obj.arbeitsplatz] = newTimer;
}

//convert ms to Time Format
function padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
}
function msToTime(ms: number): string {
    let sec = Math.floor(ms / 1000);
    let min = Math.floor(sec / 60);
    let h = Math.floor(min / 60);

    sec = sec % 60;
    min = min % 60;

    return `${padTo2Digits(h)}:${padTo2Digits(min)}:${padTo2Digits(sec)}`;
}

//start & stop button with input checking
async function handleForm(event: Event) {
    event.preventDefault();
    if (startbutton.innerHTML == 'START') {
        if (window.confirm(`Timer ${arbeitsplatz} Starten?`)) {
            const obj = new Zeit();
            obj.stop = false;
            startbutton.innerHTML = "STOP";
            await postInfo(obj);
        }
    } else if (startbutton.innerHTML == 'STOP') {
        const istMengeValue = istMengeInput.value;

        if (istMengeValue != '') {
            if (window.confirm(`Timer ${arbeitsplatz} Stoppen?`)) {
                await getInfo(arbeitsplatz)
                const inputobj = new Zeit();
                copyData(inputobj);
                const obj = timerCollection[arbeitsplatz]
                obj.stop = true;
                await postInfo(obj);
                startbutton.innerHTML = "START";
            }
        } else {
            alert("Istmenge ausfüllen!");


        }
        //sollmenge nicht ausgefuellt? fehlermeldung 
    }

}


//* FUNCTIONS (MANIPULATE HTML)

//manipulate html
function createTimerInferface(id: any) {
    let temp: any = document.querySelector('#TimerInterface')
    let area: any = document.querySelector('#running');

    let clone = document.importNode(temp.content, true);
    clone.querySelector("p").textContent = `Arbeitsplatz: ${id} `;
    clone.querySelector("div").id = id;

    const stopbut = clone.getElementById("interfaceStopButton");
    const pausebut = clone.getElementById("interfacePauseButton");
    stopbut.id = `interface${id}StopButton`;
    pausebut.id = `interface${id}PauseButton`;

    //make seprate function Code used twice also in main Stop button
    //todo get info from interface data 
    const obj = timerCollection[id];

    stopbut.addEventListener('click', async () => {
        const istMengeValue = istMengeInput.value;

        if (istMengeValue != '') {
            if (window.confirm(`Timer ${id} Stoppen?`)) {
                await getInfo(id)
                const obj = timerCollection[id]
                console.log(id);
                obj.stop = true;
                await postInfo(obj);
            }
        } else {
            alert("Istmenge ausfüllen!");
        }
    })

    pausebut.addEventListener("click", async () => {
        await getInfo(arbeitsplatz)
        if (pausebut.innerHTML == 'PAUSE') {
            if (window.confirm(`Timer ${id} Pausieren?`)) {
                obj.pause = true;
                postInfo(obj);
                pausebut.innerHTML = 'RESUME';
            }
        } else if (pausebut.innerHTML == 'RESUME') {
            if (window.confirm(`Timer ${id} Fortsetzen?`)) {
                obj.pause = false;
                postInfo(obj);
                pausebut.innerHTML = 'PAUSE';
            }
        }
    });

    area.appendChild(clone);
}

function removeTimerInterface(id: any) {
    let removeInterface: any = document.getElementById(id);
    removeInterface.remove();
}

function removeAllInterfaces() {
    let removeInterface: any = document.getElementById('running');
    if (removeInterface != null) {
        removeInterface.innerHTML = '';
    }
}



//* EVENT LISTENERS

arbeitsplatzInput.addEventListener('change', updateInputs);

form.addEventListener('submit', handleForm);


//clear notiz for everything but AA -> notiz only required if timer is REPA/MUSTER/SOnSTIGES
auftragsnummerInput.addEventListener("change", () => {
    const auftragsnummer: string = auftragsnummerInput.value;
    const code = auftragsnummer.substring(0,2);
    if(code == 'AA'){
        notizInput.value = "-";
    }else{
        notizInput.value = "";
    }
})

inputArray.forEach(function(elem){
    elem.addEventListener("change", () => {
        //this should update the timer and the database
        getArbeitsplatz();
        if (timerCollection[arbeitsplatz] != null) {
            getInfo(arbeitsplatz)
            const inputobj = new Zeit();
            copyData(inputobj);
            const obj = timerCollection[arbeitsplatz];
            postInfo(obj);
            console.log("attributes updated");
        }
    });
});

//button listeners

//POST pause/resume to server
pausebutton?.addEventListener("click", async () => {
    if (arbeitsplatzInput.validity.valid) {
        await getInfo(arbeitsplatz)
        const obj: Zeit = timerCollection[arbeitsplatz];
        if (pausebutton.innerHTML == 'PAUSE') {
            if (window.confirm(`Timer ${arbeitsplatz} Pausieren?`)) {
                obj.pause = true;
                console.log(obj)
                postInfo(obj);
                pausebutton.innerHTML = 'RESUME';
            }
        } else if (pausebutton.innerHTML == 'RESUME') {
            if (window.confirm(`Timer ${arbeitsplatz} Fortsetzen?`)) {
                obj.pause = false;
                console.log(obj)
                postInfo(obj);
                pausebutton.innerHTML = 'PAUSE';
            }
        }
        //arbeitsplatzInput.value = '';
    }
});

//fill inputs for repa
repabutton?.addEventListener("click", () => {
    auftragsnummerInput.value = "RR0000000";
    artikelnummerInput.value = "00000";
    arbeitsschrittInput.value = '000';
    sollZeitInput.value = "00:00";
    sollMengeInput.value = '000';
    istMengeInput.value = '000';
    notizInput.value = '';
});
//fill inputs for muster
musterbutton?.addEventListener("click", () => {
    auftragsnummerInput.value = "MM0000000";
    artikelnummerInput.value = "00000";
    arbeitsschrittInput.value = '000';
    sollZeitInput.value = "00:00";
    sollMengeInput.value = '000';
    istMengeInput.value = '000';
    notizInput.value = '';
})
//fill inputs for sonstiges
sonsitgesbutton?.addEventListener("click", () => {
    auftragsnummerInput.value = "SS0000000";
    artikelnummerInput.value = "00000";
    arbeitsschrittInput.value = '000';
    sollZeitInput.value = "00:00";
    sollMengeInput.value = '000';
    istMengeInput.value = '000';
    notizInput.value = '';
})


//downloadbutton listner
/*
    downloadbutton.addEventListener("click", async() => { 
        await getExcel();
        console.log("test");
    })
*/


//*UPDATE SITE 

//SITE WITH INTERFACES
if (user === null) {

    //update interfaces and timercollection
    setInterval(async () => {
        await getInfo(0);
        updateUI();
        for (let i = 1; i < timerCollection.length; i++) {
            const obj = timerCollection[i];

            let hasInterface: any = document.getElementById(String(i));
            if (obj != null && obj.interface == true && hasInterface == null) {
                const id = obj.arbeitsplatz;
                await createTimerInferface(id);

                obj.interface = true;
                await postInfo(obj);
            }
            if (obj != null && hasInterface) {
                const zeit = msToTime(obj.zeit);
                hasInterface.querySelectorAll("p")[1].textContent = `Zeit: ${zeit}`;
                if (obj.paused) {
                    hasInterface.querySelectorAll("button")[1].innerHTML = "RESUME";
                } else if (!obj.paused) {
                    hasInterface.querySelectorAll("button")[1].innerHTML = "PAUSE";
                }
            }
            if (obj == null && hasInterface) {
                await removeTimerInterface(i);
            }

        }
        if (timerCollection.length === 0) {
            await removeAllInterfaces();
        }
    }, 1000);

}
//SITE WITHOUT INTERFACES
else {

    setInterval(async () => {
        await getInfo(0);
        await updateUI
        getArbeitsplatz();
        //console.log(timerCollection)
        //console.log(curData)
        updateInputs();
        updateUI();
        if (timerCollection[arbeitsplatz] != null) {
            const obj = timerCollection[arbeitsplatz];
            const zeit = msToTime(obj.zeit);
            user.innerHTML = `Zeit: ${zeit}`;
            sollZeit.innerHTML = `SollZeit: ${obj.sollzeit}`;
        } else {
            user.innerHTML = `Zeit: 00:00:00`;
        }
    }, 1000);
}

// * SERVER FUNCTIONS (communication)

//send inputs to Server
async function postInfo(e: Zeit) {
    console.log(e);
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

//get timerData from Server
async function getInfo(e: any) {

    const res = await fetch(baseUrl + '/arbeitsplatz/data/' + e, {
        method: 'GET'
    });
    const data = await res.json();
    curData = data;
    if (e == 0) {
        timerCollection = data
    } else {
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

