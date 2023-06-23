import React, { useContext, useState,createContext,useEffect, useCallback, useMemo, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {section} from "../Box"

//TODO LIFT UP EDIT DATA STATE TO TABLE

function SectionTableEdit({data, onSectionSubmit}:any){

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

    const [sectionNum, setSectionNum] = useState(data.sections.length);
    const [sections, setSections] = useState(data.sections)
    const [editSectionIndex, setEditSectionIndex] = useState(0);
    const [editSectionData, setEditSectionData] = useState(empty)

    function getSection (editSectionIndex:number):any{
        console.log(sections[editSectionIndex-1])
        if(editSectionIndex === 0) return empty
        else return sections[editSectionIndex-1]
        
    }

    const sendSectionDataToPage = (sections:Array<section>) => {
        onSectionSubmit(sections);
    }

    //TODO array logic replaces 0 when object is addedat back
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
        
        //console.log(compositeData)
        setSections(compositeData)
        sendSectionDataToPage(compositeData)
    }

    const handleDataDelete = (deleteIndex:number) =>  {
        let newData = sections.filter((section:section) => {
            return deleteIndex !== section.section;
          });
        setSections(newData);
        console.log(newData)
        sendSectionDataToPage(newData)
    }

    const provideEditData = () => {

    }

    const sectionrows = sections.map((section: section) => 
            <SectionTableRowEdit 
            key={section.section}
            section={section.section}
            orderID={section.orderID}
            itemID={section.itemID}
            quantity={section.quantity}
            isEdited={editSectionIndex === section.section}
            onEdit={() => {
                setEditSectionIndex(section.section); 
                setEditSectionData(sections[section.section-1])
            }}
            onDelete={() => {handleDataDelete(section.section)}}
        />
    )
        

    return(
        <>
        <div id='Table'>
            <SectionTableHeader />
            {sectionrows}
            <EditSectionInfo data={editSectionData} onDataSubmit={handleDataSubmit} sections={sections}/>
            
        </div>
        
        </>
    );
}

function SectionTableInfo(props:any){
    const [sections , setSections] = useState(props.data.sections);
    
    useEffect(() => {
        setSections(props.data.sections)
      }, [props]);

    const sectionrows = sections.map((section: section) => 
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
            <div className='RowData'>
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
            <EditSectionButtons onEdit={onEdit} onDeleteBut={onDelete}/>
        </div>
        </>
    );
}

function EditSectionInfo({data, onDataSubmit, sections}:any,){

    const [sectionIndex, setSectionIndex] = useState(data.section)
    const [sectionItemID, setSectionItemID] = useState(data.itemID)
    const [sectionOrderID, setSectionOrderID] = useState(data.orderID)
    const [sectionQuantity, setSectionQuantity] = useState(data.quantity)

    const [AvSections, setAvSections] = useState(availableSections(sections))
    const [newSection, setNewSection] = useState(true);

    const inputSection:any = useRef(null);
    const inputItemID:any = useRef(null);
    const inputOrderID:any = useRef(null);
    const inputQuantity:any = useRef(null);

    function availableSections(sections:Array<section>){
        let arr: any[] = [];
        sections.map((box,index) => {
            arr.push(box.section)
        })
        return arr;
    }

    useEffect(() => {
        setSectionIndex(data.section)
        setSectionItemID(data.itemID)
        setSectionOrderID(data.orderID)
        setSectionQuantity(data.quantity)
        setAvSections(availableSections(sections))
      }, [data]);

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
        
        const newData = {
            section: parseInt(sectionIndex),
            itemID: parseInt(sectionItemID),
            orderID: sectionOrderID,
            quantity: parseInt(sectionQuantity)
        }

        onDataSubmit(newData);
        
    }

    const clearInputs = () => {
        setSectionIndex('')
        setSectionItemID('')
        setSectionOrderID('')
        setSectionQuantity('')
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
        {!(AvSections.includes(sectionIndex)) ? 
        <button className='button' id='addSectionButton' onClick={postChanges} >Add</button>
        :
        <button className='button' id='saveSectionButton' onClick={postChanges} >Save</button>
        }
        <button className='button' id='clearSectionInputs' onClick={clearInputs} >clear</button>
        </>
    );
}

function EditSectionButtons({onEdit,onDeleteBut}:any){

    return (
        <>
        <button onClick={onEdit} className="editRowButton" >Edit</button>
        <button onClick={onDeleteBut} className="deleteRowButton">Trash</button>
        </>
    );
}

export{
    SectionTableInfo,
    SectionTableEdit
}