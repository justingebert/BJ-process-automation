import React, { useContext, useState,createContext,useEffect, useRef} from 'react';
import Head from './Header';
import { SectionTableEdit } from './Table';
import { useNavigate, useParams } from 'react-router-dom';
import "./styles/EditBox.css"
import { send } from 'process';
import { section , box , Box } from '../Box';


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
    const ipUni = "141.45.33.70";

    let ip = "";

    let ipNum:number = 6;

    switch (ipNum) {
        case 1:
            //work
            ip = '192.168.178.110';
            break;
        case 2:
            //home
            ip = "192.168.178.32";
            break;
        case 3:
            //home2
            ip = "192.168.178.48";
            break;
        case 4:
            //Uni
            ip = "141.45.33.70";
            break;
        case 5:
            //lasse
            ip = "192.168.178.33";
            break;
        case 6:
            ip = "localhost";
            break;
    }


    const postBox = async () => {
        
        const sendBox = await fetch(`http://${ip}:50056/edit/`+boxCode.id,
        {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(boxData)
        })
        console.log(boxData)

        if (window.confirm('Kiste Speichern?')){
            console.log(boxCode)
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
        newBoxData!.location = info.location
        newBoxData!.procedure = info.procedure
        newBoxData!.description = info.description
        setBoxData(newBoxData)
    }

    useEffect(() => {
        const dataFetch = async () => {
            const res = await fetch(`http://${ip}:50056/info/`+boxCode.id, {
                method: 'GET'
            });
            const dataBox = await res.json()
            delete dataBox.id
            //console.log(dataBox);
            setBoxData(dataBox);
            setSectionData(dataBox.sections)
            setBoxInfo({
                location: dataBox.location,
                procedure: dataBox.procedure,
                description: dataBox.description})
            setLoading(false);
        };
        dataFetch();
    }, []);
    

    return(
        <>
        <div className='styles'>

        
        { !loading ? 
                        (<>
                        <EditBoxInfo onInfoChange={onInfoChange} data={boxInfo}/>
                        <SectionTableEdit data={boxData} onSectionSubmit={onSectionSubmit}/>
                        <ViewButton submit={postBox} />
                        </>) : <p>loading</p>
            }
        </div>
        </>
    );
}

function EditBoxInfo({data, onInfoChange}:any){

    const [location, setlocation] = useState(data.location)
    const [procedure, setProcedure] = useState(data.procedure)
    const [description, setDescription] = useState(data.description)

    const Inputlocation:any = useRef(null);
    const InputProcedure:any = useRef(null);
    const InputDescription:any = useRef(null);


    useEffect(() => {
        const newData = {
            location: location,
            procedure: procedure,
            description: description
        }
        onInfoChange(newData)
      }, [location, procedure, description]); 

    const descriptionChange = async() => {
        if(InputDescription.current.value == undefined) setDescription("")
        else await setDescription(InputDescription.current.value)
        
    }

    const procedureChange = async () => {
        if(InputProcedure.current.value == undefined) setProcedure("")
        else await setProcedure(parseInt(InputProcedure.current.value))
    }

    const locationChange = async () => {
        if(Inputlocation.current.value == undefined) setlocation("")
        else await setlocation(Inputlocation.current.value)
    }


    return(
        <>
        <div id='EditBoxInfoContainer'>
            <div className='BoxInfoInput' id='locationInput'>
                <label>Ort:</label>
                <input type="text" ref={Inputlocation} value={location} onChange={locationChange}/>
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