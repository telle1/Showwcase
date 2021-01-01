import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './EduModal.css';

const customStyles = {
  overlay: {
    backgroundColor: 'rgb(40,40,40, 0.8)',
  },
  content: {
    padding: '50px',
    width: '50%',
    height: '55%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function EduModal() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [schoolName, setSchoolName] = useState();
  const [schoolRes, setSchoolRes] = useState([]);
  const [showRes, setShowRes] = useState(false);

  useEffect(() => {
    fetch(`http://universities.hipolabs.com/search?name=${schoolName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.name);
        setSchoolRes(data);
      });
    // .catch((err) => setErrorMsg(err.message));
  }, [schoolName]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={openModal}>Add new education</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Education Modal'
      >
        <h2>Education Information</h2>
        <div className='close' onClick={closeModal}>
          <i className='fas fa-times'></i>
        </div>

        <form className='edu-form'>
          <div className='input-wrapper school-name'>
            <label htmlFor='school-name'> &nbsp; School Name &nbsp; </label>
            <input
              type='text'
              placeholder='UCLA'
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            ></input>
          </div>

          {schoolName && schoolName.length > 0 ? (
            <ul className='search-results'>
              {schoolRes.map((school) => (
                <li onClick={(e) => setSchoolName(school.name)}>
                  {school.name}
                </li>
              ))}
            </ul>
          ) : null}

          <div className='input-wrapper'>
            <label htmlFor='degree-type'> &nbsp; Degree Type &nbsp;</label>
            <select name='degree-type'>
              <option disabled selected value>
                {' '}
                -- Select --{' '}
              </option>
              <option value='Primary education' name='Primary education'>
                Primary Education
              </option>
              <option value='HS' name='HS'>
                High School
              </option>
              <option value='AD' name='AD'>
                Associate Degree
              </option>
              <option value='BD' name='BD'>
                Bachelor Degree
              </option>
              <option value='MD' name='MD'>
                Master Degree
              </option>
              <option value='DD' name='DD'>
                Doctorate Degree{' '}
              </option>
              <option value='other' name='other'>
                Other
              </option>
            </select>
          </div>

          <div className='input-wrapper'>
            <label htmlFor='field'> &nbsp; Field of Study &nbsp;</label>
            <input type='text' placeholder='Psychology'></input>
          </div>

          <div className='edu-dates'>
            <div className='input-wrapper'>
              <label className='date' htmlFor='test'>
                {' '}
                &nbsp; From &nbsp;
              </label>
              <input type='date'></input>
            </div>
            <div className='input-wrapper'>
              <label className='date' htmlFor='test'>
                {' '}
                &nbsp; To &nbsp;
              </label>
              <input type='date'></input>
            </div>
          </div>

          <button type='submit'>Save</button>
        </form>
      </Modal>
    </React.Fragment>
  );
}

export default EduModal;
