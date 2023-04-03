import React, { useContext, useState,createContext,useEffect, useRef} from 'react';
import Head from './Header';
import { SectionTableEdit } from './Table';
import { useNavigate, useParams } from 'react-router-dom';
import "./styles/EditBox.css"
import { send } from 'process';
import { section , box , Box } from '../../backend/Box';


function EditBox(){

    const navigate = useNavigate();

    let box: any [] = [];

    const [loading, setLoading] = useState(true);
    const [boxCode, setBoxCode] = useState(useParams());
    const [boxData, setBoxData] = useState<box>();
    const [boxInfo, setBoxInfo] = useState<any>();
    const [sectionData, setSectionData] = useState<Array<section>>();
    const [submit, setSubmit] = useState(false) 

    const ipWork = '192.168.178.110';
    const ipHome = "192.168.178.32"
    const ipHome2 = "192.168.178.48"


    const postBox = async () => {
        const sendBox = await fetch(`http://${ipHome2}:50056/edit/`+boxCode.id,
        {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(boxData)
        })
        const content = await sendBox.json();
        console.log(boxData)

        if (window.confirm('Kiste Speichern?')){
            //console.log(boxCode)
            navigate(`/info/${boxCode.id}`)
        }
    }

    const onSectionSubmit = (sections: Array<section>) => {
        setSectionData(sections)
        let newBoxData = boxData;
        newBoxData!.sections = sections
        //console.log(newBoxData)
        setBoxData(newBoxData)
    }

    const onInfoChange = async (info:any) => {
        await setBoxInfo(info)
        let newBoxData = boxData;
        newBoxData!.position = info.position
        newBoxData!.procedure = info.procedure
        newBoxData!.description = info.description
        setBoxData(newBoxData)
    }

    useEffect(() => {
        const dataFetch = async () => {
            const res = await fetch(`http://${ipHome2}:50056/info/`+boxCode.id, {
                method: 'GET'
            });
            const dataBox = await res.json();
            //console.log(dataBox);
            setBoxData(dataBox);
            setSectionData(dataBox.sections)
            setBoxInfo({
                position: dataBox.position,
                procedure: dataBox.procedure,
                description: dataBox.description})
            setLoading(false);
        };
        dataFetch();
    }, []);
    

    return(
        <>
        { !loading ? 
                        (<>
                        <EditBoxInfo onInfoChange={onInfoChange} data={boxInfo}/>
                        <SectionTableEdit data={boxData} onSectionSubmit={onSectionSubmit}/>
                        <ViewButton submit={postBox} />
                        </>) : <p>loading</p>
            }
        
        </>
    );
}

function EditBoxInfo({data, onInfoChange}:any){

    const [position, setPosition] = useState(data.position)
    const [procedure, setProcedure] = useState(data.procedure)
    const [description, setDescription] = useState(data.description)

    const InputPosition:any = useRef(null);
    const InputProcedure:any = useRef(null);
    const InputDescription:any = useRef(null);


    useEffect(() => {
        const newData = {
            position: position,
            procedure: procedure,
            description: description
        }
        onInfoChange(newData)
      }, [position, procedure, description]); 

    const descriptionChange = async() => {
        await setDescription(InputDescription.current.value)
    }

    const procedureChange = async () => {
        await setProcedure(parseInt(InputProcedure.current.value))
    }

    const positionChange = async () => {
        await setPosition(InputPosition.current.value)
    }


    return(
        <>
        <div id='EditBoxInfoContainer'>
            <div className='BoxInfoInput' id='positionInput'>
                <label>Ort:</label>
                <input type="text" ref={InputPosition} value={position} onChange={positionChange}/>
            </div>
            <div className='BoxInfoInput' id='procedureInput'>
                <label>Arbeitschritt:</label>
                <input type="text" ref={InputProcedure} value={procedure} onChange={procedureChange}/>
            </div>
            <div className='BoxInfoInput' id='descriptionInput'>
                <label>Beschreibung:</label>
                <input type="text" ref={InputDescription} value={description} onChange={descriptionChange}/>
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