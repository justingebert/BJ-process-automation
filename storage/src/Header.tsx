import { Outlet } from "react-router-dom";
import "./styles/Header.css"

function Head(){
    return(
        <div className="Header" >
            <img src="logow.png" alt="" />
            <Outlet />
        </div>
        
    );
}

export default Head;