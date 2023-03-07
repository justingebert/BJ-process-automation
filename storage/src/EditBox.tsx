import React, { useContext, useState,createContext,useEffect} from 'react';
import "./styles/ViewBox.css"
import Head from './Header';
import { useNavigate, useParams } from 'react-router-dom';

function EditBox(){
    const [loading, setLoading] = useState(true);
    const [boxCode, setBoxCode] = useState(useParams());
    const [boxData, setBoxData] = useState(null);

    const ipWork = '192.168.178.110';

    useEffect(() => {
        setLoading(true);
        const dataFetch = async () => {
            const res = await fetch(`http://${ipWork}:50056/info/`+boxCode, {
                method: 'GET'
            });
            const dataBox = await res.json();
            console.log(dataBox);
            setBoxData(dataBox);
            console.log(dataBox)
        };

        dataFetch();
        setLoading(false);
    }, []);
    

    return(
        <>
        { !loading ? 
                        (<>
                        <EditBoxInfo />
                        <EditSectionTable data={boxData}/>
                        <EditSectionInfo />
                        <ViewButton />
                        </>) : <p>loading</p>
            }
        
        </>
    );
}


function LookUpCode(){
    const [boxCode, setBoxCode] = useState("");
    const [boxData, setBoxData] = useState(null);
    const [sectionData, setSectionData] = useState(null);


    let info = null;


    const fetchBox = async () => {
        const res = await fetch("http://192.168.2.117:50056/info/"+boxCode, {
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
        {boxData && <EditSectionTable data={boxData} />}
        </>
        
    );
}


function EditSectionTable(props:any){
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

function EditBoxInfo({position, procedure, description}:any){
    return(
        <>
        <div>
            <div>
                <label>Ort:</label>
                <input type="text" value={position}/>
            </div>
            <div>
                <label>Arbeitschritt:</label>
                <input type="text" value={procedure}/>
            </div>
            <div>
                <label>Beschreibung:</label>
                <input type="text" value={description}/>
            </div>
        </div>
        </>
    );
}

function EditSectionInfo({section, itemID, orderID, quantity}:any){
    return(
        <>
         <div>
            <div>
                <label>Abteil:</label>
                <input type="number" value={section}/>
            </div>
            <div>
                <label>ArtikelNr:</label>
                <input type="number" value={itemID}/>
            </div>
            <div>
                <label>AuftragsNr:</label>
                <input type="text" value={orderID}/>
            </div>
            <div>
                <label>Menge:</label>
                <input type="number" value={quantity}/>
            </div>
        </div>

        <button>Add</button>
        </>
    );
}

function ViewButton(){

    const navigate = useNavigate();

    return(
        <>
        <button onClick={() => navigate("/info")}>Übersicht</button>
        </>
    );
}


export {
    EditBox
}