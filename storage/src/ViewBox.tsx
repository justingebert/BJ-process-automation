import React, { useContext, useState,createContext,useEffect} from 'react';
const BoxContext = createContext(null);


function ViewBox(){
    return(
        <>
        LookupCode
        </>
    );
}


function LookUpCode(){
    const [boxCode, setBoxCode] = useState("");

    const fetchBox = async () => {
        const res = await fetch("http://192.168.178.110:50056/info/"+boxCode, {
            method: 'GET'
        });
        const dataBox = await res.json();
        console.log(dataBox);
        setBoxCode(dataBox);
    }

    return(
        <>
        <input type="text" placeholder='code' value={boxCode} onChange={e => setBoxCode(e.target.value)}/>
        <button onClick={fetchBox}>Lookup</button>
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
/*
function SectionTable(props:any){
    //const [BoxCode , Sections] = useState();
    const sectionrows = sections.map(section => 
        <SectionTableRow 
        section={section.id}
        orderID={section.orderId}
        itemID={section.itemID}
        quantity={section.quantity}
        />
        )
    return(
        <>
        <SectionTableHeader />
        {sectionrows}
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

function SectionTableRow({section,orderID,itemID,quantity}){
    return(
        <>
        <div className='TableRow'>
            <p>{section}</p>
            <p>{orderID}</p>
            <p>{itemID}</p>
            <p>{quantity}</p>
        </div>
        </>
    );
}

*/

export {
    LookUpCode,
    BoxInfo,
    EditBoxButtons,
    //SectionTable
}