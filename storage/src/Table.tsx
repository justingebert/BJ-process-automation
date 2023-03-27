import React, { useContext, useState,createContext,useEffect, useCallback, useMemo, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {section} from "../../backend/Box"

//TODO LIFT UP EDIT DATA STATE TO TABLE

function SectionTableEdit(props:any){

    const empty = {
        section: '',
        orderID: '',
        itemID: '',
        quantity:''
    }

    function emptySection(index:number){
        const empty = {
            section: index,
            orderID: '',
            itemID: '',
            quantity:''
        }
        return empty
    }

    const [sectionNum, setSectionNum] = useState(props.data.sections.length);
    const [sections, setSections] = useState(props.data.sections)
    const [editSectionIndex, setEditSectionIndex] = useState(0);
    const [editSectionData, setEditSectionData] = useState(empty)


    function getSection (editSectionIndex:number):any{
        console.log(sections[editSectionIndex-1])
        if(editSectionIndex === 0) return empty
        else return sections[editSectionIndex-1]
        
    }

    //TODO array logic
    const handleDataSubmit = (data:section) =>  {
        let compositeData = sections.map((section:section, index:number) => {
            if(data.section-1 === index){
                return data
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
        
        console.log(compositeData)
        setSections(compositeData)
    }

    const handleDataDelete = (deleteIndex:number) =>  {
        let newData = sections.map((section:section, index:number) => {
            if(deleteIndex-1 === index){
                return emptySection(deleteIndex)
            }else{
                return section
            }
        })
        setSections(newData);
    }

    const provideEditData = () => {

    }

    //render only non empty elements
    const filteredArray = sections.filter((section:section) => section.orderID != '')

    const sectionrows = filteredArray.map((section: section) => 
            <SectionTableRowEdit 
            key={section.section}
            section={section.section}
            orderID={section.orderID}
            itemID={section.itemID}
            quantity={section.quantity}
            isEdited={editSectionIndex === section.section}
            onEdit={() => {setEditSectionIndex(section.section); setEditSectionData(sections[editSectionIndex])}}
            onDelete={() => {handleDataDelete(section.section)}}
        />
    )
        

    return(
        <>
        <div id='Table'>
            <SectionTableHeader />
            {sectionrows}
            { editSectionIndex === 0 ? 
            <EditSectionInfo data={editSectionData} editSectionIndex={editSectionIndex} onDataSubmit={handleDataSubmit}/>
            :
            <EditSectionInfo data={editSectionData} editSectionIndex={editSectionData} onDataSubmit={handleDataSubmit}/>
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
            <EditSectionButtons onEdit={onEdit} onDeleteBut={onDelete}/>
        </div>
        </>
    );
}

function EditSectionInfo({data, editSectionIndex, onDataSubmit}:any,){

    const [sectionIndex, setSectionIndex] = useState(data.section)
    const [sectionItemID, setSectionItemID] = useState(data.itemID)
    const [sectionOrderID, setSectionOrderID] = useState(data.orderID)
    const [sectionQuantity, setSectionQuantity] = useState(data.quantity)

    const [newSection, setNewSection] = useState(true);

    const inputSection:any = useRef(null);
    const inputItemID:any = useRef(null);
    const inputOrderID:any = useRef(null);
    const inputQuantity:any = useRef(null);

    const SectionChange = () => {
        setSectionIndex(inputSection.current.value)
    }
    const ItemIDChange = () => {
        setSectionItemID(inputItemID.current.value)
    }
    const OrderIDChange = () => {
        setSectionOrderID(inputOrderID.current.value)
    }
    const QuantityChange = () => {
        setSectionQuantity(inputQuantity.current.value)
    }

    function postChanges() {
    
        data.section = inputSection.current.value
        data.itemID = inputItemID.current.value
        data.orderID = inputOrderID.current.value
        data.quantity = inputQuantity.current.value

        onDataSubmit(data);
        
    }

    return(
        <>
         <div id='EditSectionInfoContainer'>
            <div className='SectionInfo' id='sectionInput'>
                <label>Abteil:</label>
                <input type="number" ref={inputSection} value={sectionIndex} onChange={SectionChange}/>
            </div>
            <div className='SectionInfo'id='itemIDInput'>
                <label>ArtikelNr:</label>
                <input type="number"  ref={inputItemID} value={sectionItemID} onChange={ItemIDChange}/>
            </div>
            <div className='SectionInfo' id='orderIDInput'>
                <label>AuftragsNr:</label>
                <input type="text"  ref={inputOrderID} value={sectionOrderID} onChange={OrderIDChange}/>
            </div>
            <div className='SectionInfo'id='quantityInput'>
                <label>Menge:</label>
                <input type="number"  ref={inputQuantity} value={sectionQuantity} onChange={QuantityChange}/>
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

function EditSectionButtons({onEdit,onDeleteBut}:any){

    return (
        <>
        <button onClick={onEdit} >Edit</button>
        <button onClick={onDeleteBut}>Trash</button>
        </>
    );
}

export{
    SectionTableInfo,
    SectionTableEdit
}