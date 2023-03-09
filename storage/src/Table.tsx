import React, { useContext, useState,createContext,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function SectionTableEdit(props:any){
    const [sectionNum, setSectionNum] = useState(props.data.sections.length);
    const [sections, setSections] = useState(props.data.sections)
    const [editSection, setEditSection] = useState(0);

    const fillInput = () => {

    }

    const sectionrows = props.data.sections.map((section: { section: any; orderID: any; itemID: any; quantity: any; }) => 
        <SectionTableRowEdit 
        key={section.section}
        section={section.section}
        orderID={section.orderID}
        itemID={section.itemID}
        quantity={section.quantity}
        editSection={false}
        />
        )
    return(
        <>
        <div id='Table'>
            <SectionTableHeader />
            {sectionrows}
            <EditSectionInfo sectionObject={}/>
        </div>
        
        </>
    );
}

function SectionTableInfo(props:any){
    //const [BoxCode , Sections] = useState();
    const sectionrows = props.data.sections.map((section: { section: any; orderID: any; itemID: any; quantity: any; }) => 
        <SectionTableRowInfo 
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
            <div className='headInfo'>
                A
            </div>
            <div className='headInfo'>
                AuftragsNr
            </div>
            <div className='headInfo'>
                ArtikelNr
            </div>
            <div className='headInfo'>
                #
            </div>
        </div>
        </>
    );
}

function SectionTableRowInfo({section, orderID, itemID, quantity}:any){
    return(
        <>
        <div className='TableRow'>
            <div className='rowInfo'>
                {section}  
            </div>
            <div className='rowInfo'>
                {orderID}
            </div>
            <div className='rowInfo'>
                {itemID}
            </div>
            <div className='rowInfo'>
                {quantity}
            </div>
        </div>
        </>
    );
}

function SectionTableRowEdit({section, orderID, itemID, quantity, editSection}:any){
    return(
        <>
        <div className='TableRow'>
            <div className='rowInfo'>
                {section}  
            </div>
            <div className='rowInfo'>
                {orderID}
            </div>
            <div className='rowInfo'>
                {itemID}
            </div>
            <div className='rowInfo'>
                {quantity}
            </div>
            <EditSectionButtons 
            section={section}
            itemID={itemID}
            orderID={orderID}
            quanitity={quantity}/>
        </div>
        </>
    );
}

function EditSectionInfo({section, itemID, orderID, quantity}:any){
    

    const postChanges = () => {

    }

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

function EditSectionButtons({section, itemID, orderID, quantity}:any){

    const EditSection = () => {
        
    }

    const deleteSection = () => {

    }

    return (
        <>
        <button onClick={EditSection} >Edit</button>
        <button onClick={deleteSection}>Trash</button>
        </>
    );
}

export{
    SectionTableInfo,
    SectionTableEdit
}