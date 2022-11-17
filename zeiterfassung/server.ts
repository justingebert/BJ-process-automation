import express from 'express';
const app = express();
import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
const ip = require("ip");
const https = require("https");
import { json } from 'stream/consumers';

// * SERVER SETUP
//Server Data
const port = 50055;
const curIP = ip.address();
//let curIP = 'localhost';

//create https
const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert','cert.pem')),
},app)

//revcieve json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//provide static files
app.use(express.static(path.join(__dirname, "public")));

//render dynamic user Sites
app.set('views', path.join(__dirname, "views"));
app.set("view engine", "ejs");

//create/startup Server
sslServer.listen(port, curIP, () => {console.log(`live on https://${curIP}:${port}`)})



// * TIMER OBJECT TEMPLATE
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

//* VARIABLES

let curData: any;

let timerCollection:any = [];

const datatop = [
    ["Arbeitsplatz", "Arbeitskraft","Auftrags-NR", "Modell-NR","Arbeitsschritt", "Notiz","Zeit","Zeit pro Artikel","Datum"],
    ];

const pathExcelOriginal = '/excel/original/';
const pathExcelCopy = '/excel/ErfassungCopy.xlsx'


//* FUNCTIONS (DATA)

//remove elements at end to reduce traffic
function cleanArray(arr: Array<Object>):void{
    let arrlen = arr.length;
            for(let i = arrlen-1;i>=0;i--){
                arr.splice(i,1);
            }
}

//copy from obj to goal
function copyToInputs(obj:any,goal:Zeit){
    goal.arbeitsplatz = obj.arbeitsplatz;
    goal.arbeitskraft = obj.arbeitskraft;
    goal.auftragsnummer = obj.auftragsnummer;
    goal.modellnummer = obj.modellnummer;
    goal.arbeitschritt = obj.arbeitschritt;
    goal.sollmenge = obj.sollmenge;
    goal.istmenge = obj.istmenge;
    goal.notiz = obj.notiz;
    goal.interface = obj.interface;
}

//prepare data to be written in Excel sheet
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
    data.artikelzeit = msToTime(data.zeit/data.istmenge);
    
    data.zeit = msToTime(data.zeit);
    delete data.sollmenge;
    delete data.istmenge;
    data.date = new Date();
    //delte whats not in data top
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


//* FUNCTIONS (EXCEL)
//does the EXCEL exist?
function createORappend(data: any){
    fs.open(pathExcelOriginal, 'r',async (err, fd) => {//what is fd?
        if (err){
            await createXLSX(data);
        }else{
            await appendJSON(data);
        }
          });
}

//create Excel file
function createXLSX(data:any){
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(datatop);
    XLSX.utils.sheet_add_aoa(worksheet,[data],{origin: -1});
    const sheetname: string = String(data[1]);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetname);
    XLSX.writeFile(workbook, pathExcelOriginal);
    console.log("created");
}

//append prepared data to Excel
function appendJSON(data:any){
    const workbook01 = XLSX.readFile(pathExcelOriginal);
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
    XLSX.writeFile(workbook01, "/excel/Erfassung.xlsx");
    console.log("added");
}

//copy Excel file ever xx Seconds
/* setInterval(()=>{
    fs.copyFile("Erfassung.xlsx","../Erfassungcopy.xlsx",(err) => {
        if (err){
            throw err;
        }
        console.log('source.txt was copied to destination.txt');}
    )
},5000); */



//* SERVER ROUTES

//send dynamic Usersite with Arbeitsplatz filled
app.get('/arbeitsplatz/:id',function(req,res){
    let idAP = req.params.id;
    res.render('index',{user: idAP});
})

//send timer info to Frontend
app.get('/:arbeitsplatz/data/:dynamic',(req:any,res:any)=>{
    const {dynamic} = req.params;
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
}) 

//get Info/call to Action from Frontend 
app.post('/:id', async (req:any,res:any) => {
    const parcel = req.body;
    if(!parcel){
        return res.status(400).send({status: 'failed'});
    }
    res.status(200).send({status: 'recieved'})

    const timerID = parcel.arbeitsplatz;
    let obj:Zeit = timerCollection[timerID];

    //copy inputs and start timer
    if(obj == null && parcel.stop == false){
        obj = new Zeit();
        copyToInputs(parcel,obj);
        obj.startTimer();
        obj.interface = true;
        timerCollection[timerID] = obj;
    }
    //place has already been filled with data
    else if(obj != null){ 
        //stop timer

        if(parcel.stop){
            copyToInputs(parcel,obj);
            obj.stopTimer();
            obj.interface = false;
            obj = JSON.parse(JSON.stringify(obj))
            await prepareData(obj);
            curData = Object.values(obj);
            await createORappend(curData)
            timerCollection[timerID] = null;
            //cleanArray(timerCollection);
            //todo clear array size
        }
        //pause timer

        if(!obj.paused && parcel.pause){
            await obj.pauseTimer();
            timerCollection[timerID] = obj;

        }
        //resume timer
        
        if(obj.paused && !parcel.pause){
            await obj.resumeTimer();
            timerCollection[timerID] = obj;

        }
    }
}) 

//downlaod Excel -- not working
/* app.get('/download',function(req,res){
console.log(req.body);
const file = `${__dirname}/${pathExcel}`;
res.download("index.html");
res.send("hello")
}) */


//*not used 
/* function getJsonStructure(){
    let workbook = XLSX.readFile("test.xlsx");
    let worksheet = workbook.Sheets['Tabelle1'];
    let jsa = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsa);
}*/