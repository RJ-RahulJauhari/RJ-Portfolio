import React, { useState } from 'react'
import './SkillsTag.scss'
import { RxCross2 } from "react-icons/rx";

const SkillsTag = ({id,name,category,deleteFunc,updateFunc}) => {

    const [editMode,setEditMode] = useState(false);
    const [tag,setTag] = useState(name);

    const handleEdit = (event) => {
        if(event.key === 'Enter'){
            setTag(event.target.value);
            updateFunc(id,tag);
            setEditMode(false);
        }
    }

    const colorSelector = () => {
        if(category === 'framework'){
            return 'framework-bg' 
        }else if(category === 'frontend'){
            return 'frontend-bg'
        }else if(category === 'backend'){
            return 'backend-bg'
        }else if(category === 'programminglanguage'){
            return 'programminglanguage-bg'
        }else{
            return 'others-bg'
        }
    }

    const renderTag = () => {
        if(editMode){
            return (
                <div className={`tag ${colorSelector()}`}>
                    <input className='tag-field' value={tag} onKeyUp={(e) => handleEdit(e)} onChange={(e) => setTag(e.target.value)} type="text" placeholder='Skill Name' />
                </div>
            )
        }else{
            return (
                <div className={`tag ${colorSelector()} hoverable clickable`} onDoubleClick={() => setEditMode(true)}>
                    <p className='tag-text flex1'>{tag}</p>
                    <RxCross2 size={25} onClick={() => deleteFunc(id)}></RxCross2>
                </div>
            )
        }
    }

  return (
    renderTag()
  )
}

export default SkillsTag
