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
            console.log("timer started");
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
            console.log("timer stopped");
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
            console.log("timer paused");
        }
    };
    Zeit.prototype.resumeTimer = function () {
        if (this.paused === false) {
            console.log("timer running");
        }
        else {
            var pausenzeit = Date.now() - this.startzeitpause;
            this.paused = false;
            console.log("timer resumed");
        }
    };
    Zeit.prototype.getTime = function () {
        return this.zeit;
    };
    return Zeit;
}());
function initTimer() {
    var timer01 = new Zeit();
    /*  console.log(timer01.arbeitsplatz,
                 timer01.arbeitkraft,
                 timer01.arbeitschritt,
                 timer01.sollmenge,
                 timer01.notiz,
                 timer01.istmenge
                 ); */
    return timer01;
}
function startStopButton(obj, button) {
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
var timerOBJ;
if (typeof window !== 'undefined') {
    var startbutton_1 = document.querySelector('#startbutton');
    var pausebutton_1 = document.querySelector('#pausebutton');
    if (startbutton_1 !== null) {
        startbutton_1.addEventListener("click", function () {
            if (startbutton_1.innerHTML === 'Start') {
                timerOBJ = initTimer();
                startStopButton(timerOBJ, startbutton_1);
                startbutton_1.innerHTML = 'Stop';
            }
            else if (startbutton_1.innerHTML === 'Stop') {
                //Object finished
                //zweitfrage einbauen - bist du sicher das du den timer stoppen willst?
                startStopButton(timerOBJ, startbutton_1);
                var Zeit_1 = timerOBJ.getTime();
                console.log(Zeit_1 / 1000);
                startbutton_1.innerHTML = 'Start';
                pausebutton_1.innerHTML = 'Pause';
            }
        });
    }
    if (pausebutton_1 !== null) {
        pausebutton_1.addEventListener("click", function () {
            if (startbutton_1.innerHTML === 'Stop') {
                pauseResumeButton(timerOBJ, pausebutton_1);
            }
        });
    }
}
else {
    console.log('You are on the server');
}
//export 
module.exports = timerOBJ;
