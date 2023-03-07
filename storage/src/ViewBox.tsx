import React, { useContext, useState,createContext,useEffect} from 'react';
import "./styles/ViewBox.css"
import Head from './Header';
import { useNavigate, useParams } from 'react-router-dom';

const ipWork = '192.168.178.110';
const ipHome = "192.168.2.117"

function ViewBox(){
    let {id} = useParams();

    return(
        <>
            <LookUpCode boxId={id} />
        </>
    )
}


function LookUpCode({boxId}:any){
    const [boxCode, setBoxCode] = useState("");
    const [boxData, setBoxData] = useState(null);
    const [sectionData, setSectionData] = useState(null);


    let info = null;



    const fetchBox = async () => {
        const res = await fetch(`http://${ipWork}:50056/info/`+boxCode, {
            method: 'GET'
        });
        const dataBox = await res.json();
        console.log(dataBox);
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
        {boxData && <SectionTable data={boxData} />}
        </>
        
    );
}

function BoxInfo(props:any){
    //const boxInfo = useContext(boxCode);
    return(
        <>
        <div id='BoxInfo'>
            <div className='TextInfo' id='status'>
                 Status:{props.data.status}
            </div>
            <div className='TextInfo' id='quantity'>
                 Menge:{props.data.quanitity}
            </div>
            <div className='TextInfo' id='position'>
                 Ort:{props.data.position}
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

    const clear = async () => {
        const clearBox = await fetch(`http://${ipWork}:50056/clear/`+boxCode, {
            method: 'POST'
        });

        setCleared(true);
    }

    const newValues = async () => {
        if(cleared){
            const newValueBox = await fetch(`http://${ipWork}:50056/new/`+boxCode, {
            method: 'POST'
            });
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

            <button className='ButtonMid' id='ButtonClear' onClick={clear}>Clear</button>
        </div>
        </>
    );
}

function EditButton({ onClick, children}:any){
    
}

function SectionTable(props:any){
    //const [BoxCode , Sections] = useState();
    const sectionrows = props.data.sections.map((section: { section: any; orderID: any; itemID: any; quantity: any; }) => 
        <SectionTableRow 
        key={section.section}
        section={section.section}
        orderID={section.orderID}
        itemID={section.itemID}
        quantity={section.quantity}
        />
        )
    return(
        <>
        <div id='Table'>
            <SectionTableHeader />
            {sectionrows}
        </div>
        
        </>
    );
}

function SectionTableHeader(){
    return(
        <>
        <div className='TableHead'>
            <div className='headInfo'>
                A
            </div>
            <div className='headInfo'>
                AuftragsNr
            </div>
            <div className='headInfo'>
                ArtikelNr
            </div>
            <div className='headInfo'>
                #
            </div>
        </div>
        </>
    );
}

function SectionTableRow({section, orderID, itemID, quantity}:any){
    return(
        <>
        <div className='TableRow'>
            <div className='rowInfo'>
                {section}  
            </div>
            <div className='rowInfo'>
                {orderID}
            </div>
            <div className='rowInfo'>
                {itemID}
            </div>
            <div className='rowInfo'>
                {quantity}
            </div>
        </div>
        </>
    );
}

export {
    ViewBox
    //SectionTable
}