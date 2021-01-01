import React, { useState, useEffect } from 'react';
import { generatePath, useLocation } from 'react-router-dom';
import './home.css';
import EduModal from './EduModal'


function Home() {
  const location = useLocation();
  const [name, setName] = useState("" || location.state.name)
  const [eduList, setEduList] = useState([])

  if (location.state.name){
    localStorage.setItem(
        'name', location.state.name
        // JSON.stringify([...nominations, movie])
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
        <h1>{name}'s education page</h1>

        <EduModal setEduList={setEduList} eduList={eduList}></EduModal>
      </div>

      <div className='education-wrapper'>
        <div className='side-bar'>
            {eduList.map(eduItem => (
                    <div>{eduItem.schoolName}</div>
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
    <div>
        <h2><strong>{eduItem.schoolName}</strong></h2>
        <p>{eduItem.degreeType} {eduItem.field}</p>
        <p>{eduItem.startDate} {eduItem.endDate}</p>
        <button onClick={deleteEduItem}>Delete</button>
    </div>
    )
}

