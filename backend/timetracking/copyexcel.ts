import * as fs from 'fs';
import * as path from 'path';



const pathExcelOriginal = 'C:/Users/Remote-PC/Documents/ZE-Test/excel/ErfassungAuswertung.xlsx'
const pathExcelCopy = 'Z:/Planung/Produktionsplanung/DispositionArbeitszeitberechnung/Näherei/Zeiterfassung/excel/ErfassungAuswertung.xlsx'


setInterval(()=>{
    
    fs.open(pathExcelOriginal, 'r',async (err, fd) => {//what is fd?
        if (err){
           console.log("no file existing"); 
        }else{
            fs.copyFile(pathExcelOriginal,pathExcelCopy,(err) => {
                if (err){
                    console.log('skipping current');
                }else{
                    console.log('Erfassung.xlsx was copied to ErfassungCopy.xlsx');
                }
            }
            )
        }
          });

    
},60000); 