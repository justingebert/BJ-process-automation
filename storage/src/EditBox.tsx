import React, { useContext, useState,createContext,useEffect} from 'react';
import "./styles/EditBox.css"
import Head from './Header';
import { SectionTableEdit } from './Table';
import { useNavigate, useParams } from 'react-router-dom';

function EditBox(){
    const [loading, setLoading] = useState(true);
    const [boxCode, setBoxCode] = useState(useParams());
    const [boxData, setBoxData] = useState(null);
    const [EditSection, setEditSection] = useState(0);

    const ipWork = '192.168.178.110';

    useEffect(() => {
        const dataFetch = async () => {
            const res = await fetch(`http://${ipWork}:50056/info/`+boxCode, {
                method: 'GET'
            });
            const dataBox = await res.json();
            console.log(dataBox);
            setBoxData(dataBox);
            setLoading(false);

        };
        dataFetch();
    }, []);
    

    return(
        <>
        { !loading ? 
                        (<>
                        <EditBoxInfo />
                        <SectionTableEdit data={boxData}/>
                        <EditSectionInfo />
                        <ViewButton />
                        </>) : <p>loading</p>
            }
        
        </>
    );
}

function EditBoxInfo({position, procedure, description}:any){
    return(
        <>
        <div id='EditBoxInfoContainer'>
            <div className='BoxInfoInput' id='positionInput'>
                <label>Ort:</label>
                <input type="text" value={position}/>
            </div>
            <div className='BoxInfoInput' id='procedureInput'>
                <label>Arbeitschritt:</label>
                <input type="text" value={procedure}/>
            </div>
            <div className='BoxInfoInput' id='descriptionInput'>
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
         <div id='EditSectionInfoContainer'>
            <div className='SectionInfo' id='sectionInput'>
                <label>Abteil:</label>
                <input type="number" value={section}/>
            </div>
            <div className='SectionInfo'id='itemIDInput'>
                <label>ArtikelNr:</label>
                <input type="number" value={itemID}/>
            </div>
            <div className='SectionInfo' id='orderIDInput'>
                <label>AuftragsNr:</label>
                <input type="text" value={orderID}/>
            </div>
            <div className='SectionInfo'id='quantityInput'>
                <label>Menge:</label>
                <input type="number" value={quantity}/>
            </div>
        </div>

        <button className='button' id='addSectionButton'>Add</button>
        </>
    );
}

function ViewButton(){

    const navigate = useNavigate();

    return(
        <>
        <button onClick={() => navigate("/info")} id='viewButton' className='button' >Übersicht</button>
        </>
    );
}


export {
    EditBox
}