import React, { useContext, useState,createContext,useEffect} from 'react';
import { Outlet } from 'react-router-dom';


function ViewBoxes(){
    return(
        <>
            <div>Kisten</div>
            <Outlet />
        </>
    )
}

export{
    ViewBoxes
}
