import React, { useState } from 'react';
import { generatePath, useLocation } from 'react-router-dom';
import './home.css';
import EduModal from './EduModal'



function Home() {
  const location = useLocation();
  return (
    <section id='home'>
      <div className='education-header'>
        <h1>{location.state.name}'s education page</h1>

        <EduModal></EduModal>
      </div>

      <div className='education-wrapper'>
        <div className='side-bar'>test</div>
        <div className='ed-item'>
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

