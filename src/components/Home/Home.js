import React, { useState, useEffect, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import './home.css';
import EduModal from '../EduModal/EduModal'
import SideBar from './Sidebar'
import EduEntry from './EduEntry'
import { EduListContext } from '../EduListContext'

function Home() {
  const location = useLocation();
  const [eduList, setEduList] = useState([])

  //Sort by newest education first
  eduList.sort((a,b) => {
    var c = new Date(a.endDate)
    var d= new Date(b.endDate)
    return d-c;
  }
  )

  console.log('eduList', eduList)

  useEffect(() => {
    const eduListStored = localStorage.getItem('edu-list');
    if (eduListStored) {
      const getEduList = JSON.parse(eduListStored);
      setEduList(getEduList);
    }
  }, []);


  return (
    <EduListContext.Provider value={{eduList, setEduList}}>
    <section id='home'>
      <div className='education-header'>
        <h1>{location.state.name}'s education showcase</h1>
        <EduModal/>
      </div>

      <div className='education-wrapper'>
        <div className='side-bar'>
          <SideBar/>
        </div>
        <div className='ed-item'>
          {eduList.map((eduItem,i) => 
          <EduEntry key={i} eduItem={eduItem}/>
          )}
        </div>
      </div>
    </section>
    </EduListContext.Provider>
  );
}

export default Home;

