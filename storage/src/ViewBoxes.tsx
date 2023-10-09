import React, { useContext, useState,createContext,useEffect} from 'react';
import { Outlet } from 'react-router-dom';


function ViewBoxes(){

    const [boxes, setBoxes] = useState(null);

    useEffect(()=>{
        const dataFetch = async () => {
            const res = await fetch(`http://localhost:50056/info/all`, {
                method: 'GET'
            });
            const dataBoxes = await res.json();
            //console.log(dataBox);
            setBoxes(dataBoxes);

        };
        dataFetch();
    }, [])

    return(
        <>
            <div>Kisten</div>
            <Outlet />
        </>
    )
}

function TableBoxes(){
    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>Box Code</th>
                        <th>Location</th>
                        <th>Procedure</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <BoxRows />
                </tbody>
            </table>
        </>
    )
}

function BoxRows(){
    const [boxes, setBoxes] = useState(null);

    useEffect(()=>{
        const dataFetch = async () => {
            const res = await fetch(`http://localhost:50056/info/all`, {
                method: 'GET'
            });
            const dataBoxes = await res.json();
            //console.log(dataBox);
            setBoxes(dataBoxes);

        };
        dataFetch();
    }, [])

    return(
        <>
            {boxes && boxes.map((box:any) => (
                <tr key={box.boxCode}>
                    <td>{box.boxCode}</td>
                    <td>{box.location}</td>
                    <td>{box.procedure}</td>
                    <td>{box.description}</td>
                </tr>
            ))}
        </>
    )
}

export{
    ViewBoxes
}
