import React, { useContext, useState,createContext,useEffect} from 'react';
import  "./styles/ViewBox.css"
import Head from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import { SectionTableInfo } from './Table';

const ipWork = '192.168.178.110';
const ipHome = "192.168.178.32"
const ipHome2 = "192.168.178.48"
const ipUni = "141.45.33.70";

let ip = "";

let ipNum:number = 6;

switch (ipNum) {
    case 1:
        //work
        ip = '192.168.178.110';
        break;
    case 2:
        //home
        ip = "192.168.178.32";
        break;
    case 3:
        //home2
        ip = "192.168.178.48";
        break;
    case 4:
        //Uni
        ip = "141.45.33.70";
        break;
    case 5:
        //lasse
        ip = "192.168.178.33";
        break;
    case 6:
        ip = "localhost";
        break;
}

function ViewBox(){
    let {id} = useParams();

    return(
        <>
            <LookUpCode boxId={id} />
        </>
    )
}


function LookUpCode({boxId}:any){
    const [boxCode, setBoxCode] = useState(boxId);
    const [boxData, setBoxData] = useState(null);
    const [sectionData, setSectionData] = useState(null);


    let info = null;
    const navigate = useNavigate();

    useEffect(()=>{
        const dataFetch = async () => {
            const res = await fetch(`http://${ip}:50056/info/`+boxCode, {
                method: 'GET'
            });
            const dataBox = await res.json();
            //console.log(dataBox);
            setBoxData(dataBox);

        };
        dataFetch();
    }, [])

    const fetchBox = async () => {
        const res = await fetch(`http://${ip}:50056/info/`+boxCode,{
            method: 'GET'
        });
        navigate(`/info/${boxCode}`)
        const dataBox = await res.json();
        //console.log(dataBox);
        setBoxData(dataBox);
    }

    return(
        <>
        <div className='lookup'>
            <input id='CodeInput' type="text" placeholder='code' value={boxCode} onChange={e => setBoxCode(e.target.value)}/>
            <button className='ButtonMid' id='ButtonLookup' onClick={fetchBox}>Lookup</button>
        </div>
        {boxData && <BoxInfo data={boxData} />}
        <EditBoxButtons boxCode={boxCode} />
        {boxData && <SectionTableInfo data={boxData} />}
        </>
        
    );
}



function BoxInfo(props:any){
    const [quantity, setQuantity] = useState(props.data.quantity);

    useEffect(()=>{
        const sections = props.data.sections;
        let sum = sections.reduce((a:any, b:any) => a + b.quantity, 0);
        setQuantity(sum);
    }, [props])
    //const boxInfo = useContext(boxCode);
    return(
        <>
        <div id='BoxInfo'>
            <div className='TextInfo' id='status'>
                 Status:{props.data.status}
            </div>
            <div className='TextInfo' id='quantity'>
                 Menge:{quantity}
            </div>
            <div className='TextInfo' id='position'>
                 Ort:{props.data.location}
            </div>
            <div className='TextInfo' id='procedure'>
                Arbeitschritt:{props.data.procedure}
            </div>
            <div className='TextInfo' id='description'>
                 Beschreinung:{props.data.description}
            </div>

        </div>
        </>
    );
}

function EditBoxButtons({boxCode}:any){
    const [cleared, setCleared] = useState(false);

    const navigate = useNavigate();

    const clearBox = async () => {
        if (window.confirm('Kiste Leeren?')){
            const clearBox = await fetch(`http://${ip}:50056/clear/`+boxCode, {
            method: 'POST'
            });
        
            setCleared(true);
        }
        
    }

    const newValues = async () => {
        if(cleared){
            navigate(`/edit/${boxCode}`);
        }
    }

    const newStyleC = {
        backgroundColor: 'green'
    }

    const newStyle = {
        backgroundColor: 'darkgreen'
    }

    return(
        <>
        <div className='MainButtons'>
            <button className='ButtonMid' id='ButtonEdit' onClick={() => {navigate(`/edit/${boxCode}`)}} >Edit</button>
            {cleared ? 
            <button className='ButtonMid' id='ButtonNew' style={newStyleC} onClick={newValues} >New</button> 
            : 
            <button className='ButtonMid' id='ButtonNew' style={newStyle} >New</button>
            }

            <button className='ButtonMid' id='ButtonClear' onClick={clearBox}>Clear</button>
        </div>
        </>
    );
}

function EditButton({ onClick, children}:any){
    
}


export {
    ViewBox
}