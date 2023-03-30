import React, { useContext, useState,createContext,useEffect} from 'react';
import Head from './Header';
import { SectionTableEdit } from './Table';
import { useNavigate, useParams } from 'react-router-dom';
import "./styles/EditBox.css"
import { send } from 'process';


function EditBox(){
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [boxCode, setBoxCode] = useState(useParams());
    const [boxData, setBoxData] = useState(null);
    const [EditSection, setEditSection] = useState(0);
    const [submit, setSubmit] = useState(false)

    const ipWork = '192.168.178.110';
    const ipHome = "192.168.178.32"


    const postBox = async () => {
        const sendBox = await fetch(`http://${ipWork}:50056/edit/`+boxCode,
        {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(boxData)
        })
        const content = await sendBox.json();
        
        if (window.confirm('Kiste Speichern?')){
            navigate(`/info/${boxCode}`)
        }
    }

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
                        <ViewButton submit={submit} />
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



function ViewButton({submit}:any){

    return(
        <>
        <button onClick={submit} id='viewButton' className='button' >Übersicht</button>
        </>
    );
}


export {
    EditBox
}