var Zeit = /** @class */ (function () {
    function Zeit() {
        this.arbeitsplatz = parseInt(document.querySelector('#Arbeisplatz').value);
        this.arbeitkraft = document.querySelector("#Arbeitskraft").value;
        this.arbeitschritt = document.querySelector("#Arbeitsschritt-Code").value;
        this.sollmenge = parseInt(document.querySelector('#SollMenge').value);
        this.notiz = document.querySelector("#Fehler").value;
        this.running = false;
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
            console.log("timer stopped");
        }
    };
    Zeit.prototype.pauseTimer = function () {
        if (this.running === false) {
            console.log("timer not running");
        }
        else {
            var pausestart = Date.now();
            this.startzeitpause = pausestart;
            console.log("timer paused");
        }
    };
    Zeit.prototype.resumeTimer = function () {
        if (this.running === true) {
            console.log("timer running");
        }
        else {
            var pausenzeit = Date.now() - this.startzeitpause;
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
}
var testDate = Date.now();
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var year = day * 365;
testDate = testDate / hour;
console.log(testDate);
var startbutton = document.querySelector('#startbutton');
if (startbutton != null) {
    startbutton.addEventListener("click", initTimer);
}
