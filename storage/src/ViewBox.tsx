import React, { useContext, useState,createContext } from 'react';
const BoxContext = createContext(null);


function ViewBox(){
    
}


function LookUpCode(){
    const [boxData, setBoxData] = useState(null);


    const fetchBox = async () => {
        const res = await fetch("/",{
            method: 'GET'
        });
        const dataBox = await res.json();
        setBoxData(dataBox);
    }

    return(
        <>
        <input type="text" placeholder='code' />
        <button>Lookup</button>
        </>
    );
}

function BoxInfo(){
    return(
        <>
        <div>
            <p>Status:</p><p></p>
            <p>Menge:</p><p>150</p>
            <p>Ort:</p><p>ZM-R8-07</p>
            <p>Arbeitschritt:</p><p>150</p>
            <p>Beschreinung:</p><p>NXL Messenger Blau innen</p>
        </div>
        </>
    );
}

function EditBoxButtons(){
    return(
        <>
        <div>
            <button>Edit</button>
            <button>New</button>
            <button>Clear</button>
        </div>
        </>
    );
}

function SectionTable(){
    const [BoxCode , Sections] = useState();
    return(
        <>
        <div>
            <SectionTableHeader />
        </div>
        </>
    );
}

function SectionTableHeader(){
    return(
        <>
        <div>
            <p>A</p>
            <p>AuftragsNr</p>
            <p>ArtikelNr</p>
            <p>#</p>
        </div>
        </>
    );
}

function SectionTableRow(props:any){
    return(
        <>
        <div>
            <p>{section}</p>
            <p>{orderID}</p>
            <p>{itemID}</p>
            <p>{quantity}</p>
        </div>
        </>
    );
}



export {
    LookUpCode,
    BoxInfo,
    EditBoxButtons,
    SectionTable
}