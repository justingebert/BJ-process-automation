import React, { useContext, useState,createContext,useEffect, useCallback, useMemo, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {section} from "../../backend/Box"

function SectionTableEdit(props:any){
    const [sectionNum, setSectionNum] = useState(props.data.sections.length);
    const [sections, setSections] = useState(props.data.sections)
    const [editSectionIndex, setEditSectionIndex] = useState(0);

    //TODO array logic
    const handleDataSubmit = (data:section) =>  {
        let compositeData = sections.map((section:section, index:number) => {
            if(data.section-1 === index){
                return section = data
            }else{
                return section
            }
        })

        if(data.section > sections.length){
            compositeData = [
                ...compositeData,
                data
            ]
        }
        

        setSections(compositeData)
    }

    const handleDataDelete = (index:number) =>  {
        let  sections.filter((s:section) => s.section != index)

    }

    const empty = {
        section: '',
        itemID: '',
        orderID:'',
        quantity:''
    }

    const sectionrows = sections.map((section: { section: any; orderID: any; itemID: any; quantity: any; }) => 
        <SectionTableRowEdit 
        key={section.section}
        section={section.section}
        orderID={section.orderID}
        itemID={section.itemID}
        quantity={section.quantity}
        isEdited={editSectionIndex === section.section}
        onEdit={() => {setEditSectionIndex(section.section)}}
        onDelete={}
        />
        )

    return(
        <>
        <div id='Table'>
            <SectionTableHeader />
            {sectionrows}
            { editSectionIndex === 0 ? 
            <EditSectionInfo data={empty} editSectionIndex={editSectionIndex} onDataSubmit={handleDataSubmit}/>
            :
            <EditSectionInfo data={sections[editSectionIndex-1]} editSectionIndex={editSectionIndex} onDataSubmit={handleDataSubmit}/>
            }
            
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

function SectionTableRowEdit({section, orderID, itemID, quantity, isEdited, onEdit, onDelete}:any){

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
            <EditSectionButtons onEdit={onEdit} onDelete={onDelete}/>
        </div>
        </>
    );
}

function EditSectionInfo({data, editSectionIndex, onDataSubmit}:any,){

    const [sectionData, setSectionData] = useState({data})
    const [newSection, setNewSection] = useState(true);

    const inputSection:any = useRef(null);
    const inputItemID:any = useRef(null);
    const inputOrderID:any = useRef(null);
    const inputQuantity:any = useRef(null);

    const getAbteil = () => {

    }

    function postChanges() {
    
        data.section = inputSection.current.value
        data.itemID = inputItemID.current.value
        data.orderID = inputItemID.current.value
        data.quantity = inputItemID.current.value

        onDataSubmit(data);
        
    }

    return(
        <>
         <div id='EditSectionInfoContainer'>
            <div className='SectionInfo' id='sectionInput'>
                <label>Abteil:</label>
                <input type="number" ref={inputSection} id='section' name='section' defaultValue={data.section} onChange={getAbteil}/>
            </div>
            <div className='SectionInfo'id='itemIDInput'>
                <label>ArtikelNr:</label>
                <input type="number"  ref={inputItemID} defaultValue={data.itemID} />
            </div>
            <div className='SectionInfo' id='orderIDInput'>
                <label>AuftragsNr:</label>
                <input type="text"  ref={inputOrderID} defaultValue={data.orderID} />
            </div>
            <div className='SectionInfo'id='quantityInput'>
                <label>Menge:</label>
                <input type="number"  ref={inputQuantity} defaultValue={data.quantity} />
            </div>
        </div>
        {data.section == "" ? 
        <button className='button' id='addSectionButton' onClick={postChanges} >Add</button>
        :
        <button className='button' id='saveSectionButton' onClick={postChanges} >Save</button>
        }
        
        </>
    );
}

function EditSectionButtons({onEdit,onDelete}:any){

    return (
        <>
        <button onClick={onEdit} >Edit</button>
        <button onClick={onDelete}>Trash</button>
        </>
    );
}

export{
    SectionTableInfo,
    SectionTableEdit
}