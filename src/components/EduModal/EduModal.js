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

function EduModal({ setEduList, eduList }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [schoolRes, setSchoolRes] = useState([]);
  const [eduInfo, setEduInfo] = useState({
    schoolName: '',
    degreeType: '',
    field: null,
    startDate: '',
    endDate: '',
    activities: null,
  });

  console.log('whats in eduinfo', eduInfo);

  useEffect(() => {
    fetch(`http://universities.hipolabs.com/search?name=${eduInfo.schoolName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.name);
        setSchoolRes(data);
      });
    // .catch((err) => setErrorMsg(err.message));
  }, [eduInfo.schoolName]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleEdu = (e) => {
    e.preventDefault();
    setEduList([...eduList, eduInfo]);
    localStorage.setItem('edu-list', JSON.stringify([...eduList, eduInfo]));
    closeModal();
    setEduInfo({
      schoolName: '',
      degreeType: '',
      field: '',
      startDate: '',
      endDate: '',
    });
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

        <form className='edu-form' onSubmit={handleEdu}>
          <div className='input-wrapper school-name'>
            <label htmlFor='school-name'> &nbsp; School Name &nbsp; </label>
            <input
              required
              type='text'
              placeholder='UCLA'
              value={eduInfo.schoolName}
              onChange={(e) => {
                setShowResults(true);
                setEduInfo({ ...eduInfo, schoolName: e.target.value });
              }}
            ></input>
          </div>

          {showResults && eduInfo.schoolName.length > 0 ? (
            <ul className='search-results'>
              {schoolRes.map((school) => (
                <li
                  onClick={(e) => {
                    setEduInfo({ ...eduInfo, schoolName: school.name });
                    setShowResults(false);
                  }}
                >
                  {school.name}
                </li>
              ))}
            </ul>
          ) : null}

          <div className='input-wrapper'>
            <label htmlFor='degree-type'> &nbsp; Degree Type &nbsp;</label>
            <select
              required
              name='degree-type'
              onChange={(e) =>
                setEduInfo({ ...eduInfo, degreeType: e.target.value })
              }
            >
              <option value=''> -- Select -- </option>
              <option value='Primary education' name='Primary education'>
                Primary Education
              </option>
              <option value='High School' name='HS'>
                High School
              </option>
              <option value='Associate Degree' name='AD'>
                Associate Degree
              </option>
              <option value='Bachelor Degree' name='BD'>
                Bachelor Degree
              </option>
              <option value='Master Degree' name='MD'>
                Master Degree
              </option>
              <option value='Doctorate Degree' name='DD'>
                Doctorate Degree
              </option>
              <option value='Other' name='other'>
                Other
              </option>
            </select>
          </div>

          <div className='input-wrapper'>
            <label htmlFor='field'> &nbsp; Field of Study &nbsp;</label>
            <input
              type='text'
              placeholder='Psychology'
              onChange={(e) =>
                setEduInfo({ ...eduInfo, field: e.target.value })
              }
            ></input>
          </div>

          <div className='input-wrapper'>
            <label className='activities' htmlFor='activites'>
              {' '}
              &nbsp; Activities &nbsp;{' '}
            </label>
            <textarea
              rows='4'
              placeholder='Club Tennis'
              onChange={(e) =>
                setEduInfo({ ...eduInfo, activities: e.target.value })
              }
            ></textarea>
          </div>

          <div className='edu-dates'>
            <div className='input-wrapper'>
              <label className='date' htmlFor='test'>
                {' '}
                &nbsp; From &nbsp;
              </label>
              <input
                required
                type='date'
                onChange={(e) =>
                  setEduInfo({ ...eduInfo, startDate: e.target.value })
                }
              ></input>
            </div>
            <div className='input-wrapper'>
              <label className='date' htmlFor='test'>
                {' '}
                &nbsp; To &nbsp;
              </label>
              <input
                required
                type='date'
                onChange={(e) =>
                  setEduInfo({ ...eduInfo, endDate: e.target.value })
                }
              ></input>
            </div>
          </div>

          <button type='submit'>Save</button>
        </form>
      </Modal>
    </React.Fragment>
  );
}

export default EduModal;
