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
            <p className='TextInfo' id='status'>Status:{props.data.status}</p>
            <p className='TextInfo' id='quantity'>Menge:{props.data.quanitity}</p>
            <p className='TextInfo' id='position'>Ort:{props.data.position}</p>
            <p className='TextInfo' id='procedure'>Arbeitschritt:{props.data.procedure}</p>
            <p className='TextInfo' id='description'>Beschreinung:{props.data.description}</p>
        </div>
        </>
    );
}

function EditBoxButtons(){
    return(
        <>
        <div className='MainButtons'>
            <button className='ButtonMid' id='ButtonEdit'>Edit</button>
            <button className='ButtonMid' id='ButtonNew'>New</button>
            <button className='ButtonMid' id='ButtonClear'>Clear</button>
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
            <p>A</p>
            <p>AuftragsNr</p>
            <p>ArtikelNr</p>
            <p>#</p>
        </div>
        </>
    );
}

function SectionTableRow({section, orderID, itemID, quantity}:any){
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


export {
    LookUpCode,
    BoxInfo,
    EditBoxButtons,
    //SectionTable
}