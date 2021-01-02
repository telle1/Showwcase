import React from 'react';
import './sidebar.css'

function SideBar({ eduList }){
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