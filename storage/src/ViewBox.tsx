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
                <p >Status:{props.data.status}</p>
            </div>
            <div className='TextInfo' id='quantity'>
                <p >Menge:{props.data.quanitity}</p>
            </div>
            <div className='TextInfo' id='position'>
                <p >Ort:{props.data.position}</p>
            </div>
            <div className='TextInfo' id='procedure'>
                Arbeitschritt:{props.data.procedure}
            </div>
            <div className='TextInfo' id='description'>
                <p >Beschreinung:{props.data.description}</p>
            </div>

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
            <div className='rowInfo'>
                <p >A</p>
            </div>
            <div className='rowInfo'>
                <p >AuftragsNr</p>
            </div>
            <div className='rowInfo'>
                <p>ArtikelNr</p>
            </div>
            <div className='rowInfo'>
                <p>#</p>
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
                <p>{section}</p>  
            </div>
            <div className='rowInfo'>
                <p>{orderID}</p>
            </div>
            <div className='rowInfo'>
                <p>{itemID}</p>
            </div>
            <div className='rowInfo'>
                <p >{quantity}</p>
            </div>
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