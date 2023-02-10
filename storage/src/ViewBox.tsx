import React, { useContext, useState,createContext,useEffect} from 'react';


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
        <input type="text" placeholder='code' value={boxCode} onChange={e => setBoxCode(e.target.value)}/>
        <button onClick={fetchBox}>Lookup</button>
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
        <div>
            <p>Status:{props.data.status}</p>
            <p>Menge:{props.data.quanitity}</p>
            <p>Ort:{props.data.position}</p>
            <p>Arbeitschritt:{props.data.procedure}</p>
            <p>Beschreinung:{props.data.description}</p>
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

function SectionTable(props:any){
    //const [BoxCode , Sections] = useState();
    const sectionrows = props.data.sections.map((section: { id: any; orderId: any; itemID: any; quantity: any; }) => 
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

function SectionTableRow({section, orderID,itemID,quantity}:any){
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