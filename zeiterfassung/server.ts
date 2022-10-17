import express from 'express';
const app = express();
import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { json } from 'stream/consumers';

const port = 80;
//const ip = '192.168.178.110'; //arbeit
const ip = '192.168.2.117'; //Zuhause
//const ip = '141.45.32.146'; //uni

//provide static html
app.use(express.static(path.join(__dirname,'/public')))
//revcieve json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let curData: any;

let timerCollection:any = [];

let dataCollection:any = [];


app.get('/:dynamic',(req:any,res:any)=>{
    //res.sendFile(path.join(__dirname,'public/index.html'));
    const {dynamic} = req.params;
    console.log(dynamic);
    if(dynamic == 0){   
        timerCollection.filter(x => x !== null);
        res.json(timerCollection);
    }else{
        if(timerCollection[dynamic] != null){
            timerCollection[dynamic].getCurTime();
            res.json(timerCollection[dynamic]);
        }else{
            res.json("no Timer active");
        }
    }
    

    //res.render('index.html');
    //res.download(excel file) send excel file to device
}) 

app.post('/', async (req:any,res:any) => {
    const parcel = req.body;
    if(!parcel){
        return res.status(400).send({status: 'failed'});
    }
    //res.status(200).send({status: 'recieved'})

    const timerID = parcel.arbeitsplatz;

    if(timerCollection[timerID] == null){
        timerCollection[timerID] = copyParameters(parcel);
        timerCollection[timerID].startTimer();
        res.send({status: 'timer startet'});
    }else{
        timerCollection[timerID].stopTimer();
        //console.log(JSON.stringify(timerCollection[timerID]));
        timerCollection[timerID] = JSON.parse(JSON.stringify(timerCollection[timerID]))
        await prepareData(timerCollection[timerID]);
        curData = Object.values(timerCollection[timerID]);
        await createORappend(curData)
        res.send({status: 'timer stopped'});
    }
    //create zeit instance if Start otherwise stop -> Store in Array


    /* prepareData(parcel);
    curData = Object.values(parcel);
    createORappend(curData);
    console.log('recieved'); */
}) 




app.listen(port, ip, () => {console.log(`live on ${ip}:${port}`)})


//timer setup
class Zeit{
    //get inputs
    arbeitsplatz!: number;
    arbeitskraft!: string; 
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
            console.log("timer not running")
        }else{
            let pausestart = Date.now();
            this.startzeitpause = pausestart;
            this.paused = true;
            console.log("timer"+this.arbeitsplatz+"paused")
        } 
    }

    resumeTimer(): void{
        if(this.paused === false){
            console.log("timer running")
        }else{
            let pausenzeit = Date.now() - this.startzeitpause;
            this.paused = false;
            console.log("timer"+this.arbeitsplatz+"resumed")
        }
    }

    getCurTime(){
        this.zeit =Date.now() - this.startzeit;
    }

    getTime(): number{
        return this.zeit
    }

}

function copyParameters(obj:any): Zeit{
    const timer = new Zeit();
    timer.arbeitsplatz = obj.arbeitsplatz;
    timer.arbeitskraft = obj.arbeitskraft
    timer.arbeitschritt = obj.arbeitschritt;
    timer.sollmenge = obj.sollmenge;
    timer.istmenge = obj.istmenge;
    timer.notiz = obj.notiz;
    return timer;
}
//check if website is requested -> if event stop pressed send object or json to server
//put data into table /caculate values

//start template Excel Datei - Erste Reihe
const datatop = [
    ["Arbeitsplatz", "Arbeitskraft", "Arbeitsschritt", "Notiz","Zeit","Zeit pro Artikel"],
    ];

const pathExcel = 'Erfassung.xlsx';

const testData = [
    {
      arbeitsplatz: 99,
      arbeitskraft: 'xx02',
      arbeitschritt: 'xxx001',
      notiz: 'muster',
      zeit: 2.613,
      artikelzeit: 0.2613
    }
  ]

//console.log(Object.values(testData[0]));
//console.log(Object.keys(testData[0]).length);   //anzahl der attrtibute

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
    data.artikelzeit = msToTime(data.zeit/data.istmenge);
    data.zeit = msToTime(data.zeit);
    delete data.sollmenge;
    delete data.istmenge;
    //delte whats not in data top
}

function msToTime(s: any){
    let ms = s % 1000;
    s = (s-ms) /1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s / 60;
    let hrs = (s-mins) / 60;
    return hrs + ':' + mins + ':' + secs;
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