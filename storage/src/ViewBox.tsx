import React, { useContext, useState,createContext,useEffect} from 'react';
import "./styles/ViewBox.css"

function LookUpCode(){
    const [boxCode, setBoxCode] = useState("");
    const [boxData, setBoxData] = useState(null);
    const [sectionData, setSectionData] = useState(null);


    let info = null;


    const fetchBox = async () => {
        const res = await fetch("http://192.168.178.110:50056/info/"+boxCode, {
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
        <EditBoxButtons />
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

function EditBoxButtons(){
    return(
        <>
        <div className='MainButtons'>
            <button className='ButtonMid' id='ButtonEdit' onClick={}>Edit</button>
            <button className='ButtonMid' id='ButtonNew' onClick={}>New</button>
            <button className='ButtonMid' id='ButtonClear' onClick={}>Clear</button>
        </div>
        </>
    );
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

        <button></button>
        </>
    );
}



export {
    LookUpCode,
    BoxInfo,
    EditBoxButtons,
    //SectionTable
}