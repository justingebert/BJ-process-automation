import React, { useContext, useState,createContext,useEffect, useCallback, useMemo} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function SectionTableEdit(props:any){
    const [sectionNum, setSectionNum] = useState(props.data.sections.length);
    const [sections, setSections] = useState(props.data.sections)
    const [editSectionIndex, setEditSectionIndex] = useState(0);

    const fillInputs = () => {
        setEditSectionIndex(editSectionIndex)
    }

    const sectionrows = props.data.sections.map((section: { section: any; orderID: any; itemID: any; quantity: any; }) => 
        <SectionTableRowEdit 
        key={section.section}
        section={section.section}
        orderID={section.orderID}
        itemID={section.itemID}
        quantity={section.quantity}
        isEdited={editSectionIndex === section.section}
        onEdit={() => {setEditSectionIndex(section.section)}}
        />
        )

    return(
        <>
        <div id='Table'>
            <SectionTableHeader />
            {sectionrows}
            <EditSectionInfo 
            section={sections[editSectionIndex-1].section}
            itemID={sections[editSectionIndex-1].itemID} 
            editSectionIndex={editSectionIndex}/>
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

function SectionTableRowEdit({section, orderID, itemID, quantity, isEdited, onEdit}:any){

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
            <EditSectionButtons onEdit={onEdit} />
        </div>
        </>
    );
}

function EditSectionInfo({section, itemID, orderID, quantity, editSectionIndex}:any,){
    const [sectionData, setSectionData] = useState({
        section,
        itemID,
        orderID,
        quantity
    })

    function postChanges(event:any) {
        console.log("posted")
    }

   useEffect( () => {
        setSectionData({section, itemID, orderID, quantity})
        console.log("test")
   },[editSectionIndex]);


    return(
        <>
         <div id='EditSectionInfoContainer'>
            <div className='SectionInfo' id='sectionInput'>
                <label>Abteil:</label>
                <input type="number" value={section} />
            </div>
            <div className='SectionInfo'id='itemIDInput'>
                <label>ArtikelNr:</label>
                <input type="number" value={itemID} />
            </div>
            <div className='SectionInfo' id='orderIDInput'>
                <label>AuftragsNr:</label>
                <input type="text" value={orderID} />
            </div>
            <div className='SectionInfo'id='quantityInput'>
                <label>Menge:</label>
                <input type="number" value={quantity} />
            </div>
            <p>{editSectionIndex}</p>
        </div>

        <button className='button' id='addSectionButton' onClick={postChanges} >Add</button>
        </>
    );
}

function EditSectionButtons({onEdit}:any){

    

    const deleteSection = () => {

    }

    return (
        <>
        <button onClick={onEdit} >Edit</button>
        <button onClick={deleteSection}>Trash</button>
        </>
    );
}

export{
    SectionTableInfo,
    SectionTableEdit
}