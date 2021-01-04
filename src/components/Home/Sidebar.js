import React, { useContext } from 'react';
import {EduListContext} from '../EduListContext'
import './sidebar.css'

function SideBar(){

    const {eduList} = useContext(EduListContext);
    
    return (
      <React.Fragment>
        <h2>My Education</h2>
        {eduList.map((eduItem, i) => (
                <p key={i}>{eduItem.schoolName}</p>
            ))}
      </React.Fragment>
    )
  }

  export default SideBar