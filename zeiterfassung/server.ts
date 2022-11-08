import express from 'express';
const app = express();
import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
const ip = require("ip");
const https = require("https");
import { json } from 'stream/consumers';

const port = 50055;
const curIP = ip.address();
//const os = require('os');
//const ip = os.networkInterfaces();

//let curIP = 'localhost';


const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert','cert.pem')),
},app)



//provide static html

//revcieve json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

sslServer.listen(port, curIP, () => {console.log(`live on https://${curIP}:${port}`)})




app.get('/arbeitsplatz/:id',function(req,res){
        let idAP = req.params.id;
        res.render('index',{user: idAP});
    
})
//req -new -key key.pem -out csr.pem

/* app.get('/download',function(req,res){
    console.log(req.body);
    const file = `${__dirname}/${pathExcel}`;
    console.log("works");
    res.download("index.html");
    res.send("hello")
}) */

let curData: any;

let timerCollection:any = [];

app.get('/:arbeitsplatz/data/:dynamic',(req:any,res:any)=>{
    //res.sendFile(path.join(__dirname,'public/index.html'));
    const {dynamic} = req.params;
    //console.log(dynamic);
    if(dynamic == 0){   
        //timerCollection.filter(x => x !== null);
        for(let i = 1;i<timerCollection.length;i++){
            if(timerCollection[i] != null){
                timerCollection[i].getCurTime();
            }
        }
        res.json(timerCollection);
    }else{
        if(timerCollection[dynamic] != null){
            timerCollection[dynamic].getCurTime();
            res.json(timerCollection[dynamic]);
        }else{
            res.json(null);
        }
    }

    //res.render('index.html');
    //res.download(excel file) send excel file to device
}) 


app.post('/:id', async (req:any,res:any) => {
    const parcel = req.body;
    if(!parcel){
        return res.status(400).send({status: 'failed'});
    }
    //res.status(200).send({status: 'recieved'})

    const timerID = parcel.arbeitsplatz;
    let obj:Zeit = timerCollection[timerID];
    
    if(obj == null && parcel.stop == false){
        obj = copyParameters(parcel);
        obj.startTimer();
        obj.interface = true;
        timerCollection[timerID] = obj;
        res.send({status: 'timer startet'});
    }else if(obj != null){ 
        if(parcel.stop){
            obj.stopTimer();
            obj.interface = false;
            //console.log(JSON.stringify(obj));
            obj = JSON.parse(JSON.stringify(obj))
            await prepareData(obj);
            curData = Object.values(obj);
            await createORappend(curData)
            res.send({status: 'timer stopped'});
            timerCollection[timerID] = null;
            //cleanArray(timerCollection);
            //todo clear array size
            
        }
        if(!obj.paused && parcel.pause){
            obj.pauseTimer();
            console.log("test");
            timerCollection[timerID] = obj;
        }
        if(obj.paused && !parcel.pause){
            obj.resumeTimer();
            timerCollection[timerID] = obj;
        }
    }
    //create zeit instance if Start otherwise stop -> Store in Array


    /* prepareData(parcel);
    curData = Object.values(parcel);
    createORappend(curData);
    console.log('recieved'); */
}) 

function cleanArray(arr: Array<Object>):void{
    let arrlen = arr.length;
            for(let i = arrlen-1;i>=0;i--){
                arr.splice(i,1);
            }
}

//timer setup
class Zeit{
    //get inputs
    arbeitsplatz!: number;
    arbeitskraft!: string;
    auftragsnummer!: string; 
    modellnummer!: string;
    arbeitschritt!: string; 
    sollmenge!: number;
    istmenge!: number; 
    notiz!: string;
    
    //caculate time
    zeit!: number;
    startzeit!: number;
    startzeitpause!: number;
    pausenzeit: number = 0;
    running = false;
    paused = false;

    pause:boolean = false;
    stop: boolean = false;
    interface:boolean = false;

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
            console.log("timer is paused")
        }else{
            let pausestart = Date.now();
            this.startzeitpause = pausestart;
            this.paused = true;
            this.running = false;
            console.log("timer"+this.arbeitsplatz+"paused")
        } 
    }

    resumeTimer(): void{
        if(this.paused === false){
            console.log("timer running")
        }else{
            let pausenzeit = Date.now() - this.startzeitpause;
            this.paused = false;
            this.running = true;
            console.log("timer"+this.arbeitsplatz+"resumed")
        }
    }

    getCurTime(){
        if(this.paused){
            this.pausenzeit = Date.now() - this.startzeitpause;
        }
        this.zeit = Date.now() - this.startzeit - this.pausenzeit;
    }

    getTime(): number{
        return this.zeit
    }

}

function copyParameters(obj:any): Zeit{
    const timer = new Zeit();
    timer.arbeitsplatz = obj.arbeitsplatz;
    timer.arbeitskraft = obj.arbeitskraft;
    timer.auftragsnummer = obj.auftragsnummer;
    timer.modellnummer = obj.modellnummer;
    timer.arbeitschritt = obj.arbeitschritt;
    timer.sollmenge = obj.sollmenge;
    timer.istmenge = obj.istmenge;
    timer.notiz = obj.notiz;
    timer.interface = obj.interface;
    return timer;
}
//check if website is requested -> if event stop pressed send object or json to server
//put data into table /caculate values

//start template Excel Datei - Erste Reihe
const datatop = [
    ["Arbeitsplatz", "Arbeitskraft","Auftrags-NR", "Modell-NR","Arbeitsschritt", "Notiz","Zeit","Zeit pro Artikel"],
    ];

const pathExcel = 'Erfassung.xlsx';

function createORappend(data: any){
    fs.open(pathExcel, 'r',async (err, fd) => {//what is fd?
        if (err){
            await createXLSX(data);
        }else{
            await appendJSON(data);
        }
          });
}

//solve with lodash omit?
function prepareData(data:any){
    delete data.running;
    delete data.paused;
    delete data.startzeit;
    delete data.pausenzeit;
    delete data.startzeitpause;
    delete data.pause;
    delete data.stop;
    delete data.interface;
    if(data.istmenge != null){
        data.artikelzeit = msToTime(data.zeit/data.istmenge);
    }else{
        data.artikelzeit = msToTime(data.zeit/data.sollmenge);
    }
    data.zeit = msToTime(data.zeit);
    delete data.sollmenge;
    delete data.istmenge;
    //delte whats not in data top
}

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

function appendJSON(data:any){
    const workbook01 = XLSX.readFile(pathExcel);
    const worksheet:any = workbook01.Sheets[data[1]];
    if(worksheet == null){
        const worksheet = XLSX.utils.aoa_to_sheet(datatop);
        XLSX.utils.sheet_add_aoa(worksheet,[data],{origin: -1});
        const sheetname: string = String(data[1]);
        XLSX.utils.book_append_sheet(workbook01, worksheet, sheetname);
    }else{
        const range  = XLSX.utils.decode_range(worksheet['!ref'])
        //console.log((range.e.r));
        XLSX.utils.sheet_add_aoa(worksheet,[data],{origin: -1});
    }
    XLSX.writeFile(workbook01, "Erfassung.xlsx");
    console.log("added");
}

function createXLSX(data:any){
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(datatop);
    console.log([data]);
    XLSX.utils.sheet_add_json(worksheet,[data],{origin: -1});
    const sheetname: string = String(data[1]);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetname);
    XLSX.writeFile(workbook, "Erfassung.xlsx");
    console.log("created");
}

//not used 
/* 

function getJsonStructure(){
    let workbook = XLSX.readFile("test.xlsx");
    let worksheet = workbook.Sheets['Tabelle1'];
    let jsa = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsa);
}

 */