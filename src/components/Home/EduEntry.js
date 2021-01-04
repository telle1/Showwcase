import React, { useContext } from 'react';
import { EduListContext } from '../EduListContext'
import moment from 'moment'
import './eduentry.css'

function EduEntry({ eduItem }){

  const { eduList, setEduList } = useContext(EduListContext)

    const deleteEduItem = () => {
        const rmvItem = eduList.filter(eduEntry => eduEntry !== eduItem)
        setEduList(rmvItem)
        localStorage.setItem('edu-list', JSON.stringify(rmvItem))
    }

    return (
    <div className="ed-details">
        <div className='close' onClick={deleteEduItem}>
          <i className='fas fa-times'></i>
        </div>
        <h2>{eduItem.schoolName}</h2>
        <p>
          {eduItem.degreeType}
          {eduItem.field ? <span> in {eduItem.field}</span> : null}
          {eduItem.grade ? <span>, {eduItem.grade} </span> : null}

        </p>
        <sup> 
          <LocalTime date={eduItem.startDate}/> - <LocalTime date={eduItem.endDate}/>
        </sup>
        {eduItem.activities ? 
        <p>Activities: {eduItem.activities}</p>    
        : null }
    </div>
    )
}

function LocalTime ({date}){
  return moment.utc(date).format('MM/DD/YY')
}

export default EduEntry