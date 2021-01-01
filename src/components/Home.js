import React, { useState } from 'react';
import { generatePath, useLocation } from 'react-router-dom';
import './home.css';
import EduModal from './EduModal'


function Home() {
  const location = useLocation();
  const [eduList, setEduList] = useState([])


  return (
    <section id='home'>
      <div className='education-header'>
        <h1>{location.state.name}'s education page</h1>

        <EduModal setEduList={setEduList} eduList={eduList}></EduModal>
      </div>

      <div className='education-wrapper'>
        <div className='side-bar'>test</div>
        <div className='ed-item'>
            {eduList.map(eduItem => (
                <div>{eduItem.schoolName} {eduItem.degreeType} {eduItem.field}
                {eduItem.startDate} {eduItem.endDate} </div>
            ))}
          <div>test1</div>
          <div>test1</div>
          <div>test1</div>
          <div>test1</div>
          <div>test1</div>
          <div>test1</div>
          <div>test1</div>
        </div>
      </div>
    </section>
  );
}

export default Home;

