import React, { useContext } from 'react';
import { EduListContext } from '../EduListContext';
import './sidebar.css';

function SideBar() {
  const { eduList } = useContext(EduListContext);

  return (
    <div>
      <h2>My Education</h2>
      {eduList.map((eduItem, i) => (
        <p key={i}>{eduItem.schoolName}</p>
      ))}
    </div>
  );
}

export default SideBar;
