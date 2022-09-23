var Zeit = /** @class */ (function () {
    function Zeit() {
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
    Zeit.prototype.startTimer = function () {
        if (this.running === true) {
            console.log("timer already running");
        }
        else {
            var start = Date.now();
            this.startzeit = start;
            this.running = true;
            console.log("timer" + this.arbeitsplatz + "started");
        }
    };
    Zeit.prototype.stopTimer = function () {
        if (this.running === false) {
            console.log("no timer running");
        }
        else {
            var zeit = Date.now() - this.startzeit - this.pausenzeit;
            this.zeit = zeit;
            this.running = false;
            console.log("timer" + this.arbeitsplatz + "stopped");
        }
    };
    Zeit.prototype.pauseTimer = function () {
        if (this.paused === true) {
            console.log("timer not running");
        }
        else {
            var pausestart = Date.now();
            this.startzeitpause = pausestart;
            this.paused = true;
            console.log("timer" + this.arbeitsplatz + "paused");
        }
    };
    Zeit.prototype.resumeTimer = function () {
        if (this.paused === false) {
            console.log("timer running");
        }
        else {
            var pausenzeit = Date.now() - this.startzeitpause;
            this.paused = false;
            console.log("timer" + this.arbeitsplatz + "resumed");
        }
    };
    Zeit.prototype.getTime = function () {
        return this.zeit;
    };
    return Zeit;
}());
var arbeitsplatzIn = document.querySelector('#Arbeitsplatz');
arbeitsplatzIn.addEventListener('change', updateArbeitsplatz);
var arbeitsplatz = getArbeitsplatz();
function updateArbeitsplatz() {
    if (arbeitsplatzIn !== null) {
        arbeitsplatz = parseInt(arbeitsplatzIn.value);
    }
}
function getArbeitsplatz() {
    var arbeitsplatz = parseInt(document.querySelector('#Arbeitsplatz').value);
    return arbeitsplatz;
}
function initTimer() {
    var timer = new Zeit();
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
var timerCollection = [];
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
var startbutton = document.querySelector('#startbutton');
var pausebutton = document.querySelector('#pausebutton');
if (typeof window !== 'undefined' && startbutton !== null && pausebutton !== null) {
    arbeitsplatzIn.addEventListener('change', function () {
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
                    var Zeit_1 = timerCollection[arbeitsplatz].getTime();
                    console.log(Zeit_1 / 1000);
                    startbutton.innerHTML = 'Start';
                    pausebutton.innerHTML = 'Pause';
                    //export object => clear arrayindex
                }
            }
            arbeitsplatzIn.value = '';
        }
    });
    pausebutton.addEventListener("click", function () {
        if (timerCollection[arbeitsplatz] != null) {
            pauseResumeButton(timerCollection[arbeitsplatz], pausebutton);
        }
    });
}
//export 
//module.exports = timerOBJ;
