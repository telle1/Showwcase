import React, { useState, useEffect } from 'react';
import { generatePath, useLocation } from 'react-router-dom';
import './home.css';
import EduModal from './EduModal'
import moment from 'moment'


function Home() {
  const location = useLocation();
  const [name, setName] = useState("" || location.state.name)
  const [eduList, setEduList] = useState([])

  //Sort by newest education first
  eduList.sort((a,b) => {
    var c = new Date(a.endDate)
    var d= new Date(b.endDate)
    return d-c;
  }
  )

  console.log('eduList', eduList)

  if (location.state.name){
    localStorage.setItem(
        'name', location.state.name
      );
  }

  useEffect(() => {
    const eduListStored = localStorage.getItem('edu-list');
    if (eduListStored) {
      const getEduList = JSON.parse(eduListStored);
      setEduList(getEduList);
    }
    const nameStored = localStorage.getItem('name');
    if (nameStored) {
        const getName = nameStored
        setName(nameStored)
    }

  }, []);


  return (
    <section id='home'>
      <div className='education-header'>
        <h1>{name}'s education showcase</h1>

        <EduModal setEduList={setEduList} eduList={eduList}></EduModal>
      </div>

      <div className='education-wrapper'>
        <div className='side-bar'>
            <h2>My Education</h2>
            {eduList.map(eduItem => (
                    <p>{eduItem.schoolName}</p>
                ))}
        </div>
        <div className='ed-item'>
            {eduList.map((eduItem,i) => <EduEntry key={i} eduItem={eduItem} eduList={eduList} setEduList={setEduList}/>
            )}
        </div>
      </div>
    </section>
  );
}

export default Home;


function EduEntry({ eduItem, eduList, setEduList }){

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
        </p>
        <sup> <LocalTime date={eduItem.startDate}/> - <LocalTime date={eduItem.endDate}/> </sup>
        {eduItem.activities ? 
        <p>Activities: {eduItem.activities}</p>    
        : null }
    </div>
    )
}

function LocalTime ({date}){
  return moment.utc(date).format('MM/DD/YY')
}

