import React, { useState } from 'react';

function LookUpCode(){
    return(
        <>
        <input type="text" placeholder='code' />
        <button>Lookup</button>
        </>
    );
}

function BoxInfo(){
    return(
        <>
        <div>
            <p>Status:</p><p></p>
            <p>Menge:</p><p>150</p>
            <p>Ort:</p><p>ZM-R8-07</p>
            <p>Arbeitschritt:</p><p>150</p>
            <p>Beschreinung:</p><p>NXL Messenger Blau innen</p>
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

function SectionTable(){
    return(
        <>
        <div>
            
        </div>
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

function SectionTableRow(props:any){
   

    return(
        <>
        <div>
            <p>{section}</p>
            <p>{orderID}</p>
            <p>{itemID}</p>
            <p>{quantity}</p>
        </div>
        </>
    );
}

interface Box {
    section: number;
    orderID: string;
    itemId: number;
    quantity: number;
}



export {
    LookUpCode,
    BoxInfo,
    EditBoxButtons,
    SectionTable
}