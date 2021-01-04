import React, { useState, useEffect, useCallback, useContext } from 'react';
import { EduListContext } from '../EduListContext';
import './EduModal.css';
import Modal from 'react-modal';
import _ from 'lodash';
const axios = require('axios');

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
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [schoolRes, setSchoolRes] = useState([]);
  const [debouncedSchoolName, setDebouncedSchoolName] = useState('');
  const { eduList, setEduList } = useContext(EduListContext);

  const [eduInfo, setEduInfo] = useState({
    schoolName: '',
    degreeType: '',
    field: null,
    startDate: '',
    endDate: '',
    grade: null,
    activities: null,
  });

  // console.log('whats in eduinfo', eduInfo);
  // console.log('whats in school res', schoolRes);
  // console.log('whats in debounce', debouncedSchoolName);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const getSchools = async () => {
    setLoading(true);
    setSchoolRes([]);
    try {
      const res = await axios.get(
        `http://universities.hipolabs.com/search?name=${debouncedSchoolName}`,
        { cancelToken: source.token }
      );
      setSchoolRes(res.data);
      setLoading(false);
      console.log('results', res.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Previous request cancelled', err.message);
      }
    }
  };

  useEffect(() => {
    if (eduInfo.schoolName.length > 0) {
      getSchools();
    }
    return () => {
      source.cancel('Axios request cancelled');
    };
  }, [debouncedSchoolName]);

  const debounce = useCallback(
    _.debounce((input) => setDebouncedSchoolName(input), 300),
    []
  );

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
            <label htmlFor='school-name'>
              {' '}
              &nbsp; School Name <span className='asterisk'>*</span> &nbsp;{' '}
            </label>
            <input
              required
              type='text'
              placeholder='UCLA'
              value={eduInfo.schoolName}
              onChange={(e) => {
                setShowResults(true);
                setEduInfo({ ...eduInfo, schoolName: e.target.value });
                debounce(e.target.value);
              }}
            ></input>
          </div>

          {showResults && eduInfo.schoolName.length > 0 ? (
            <ul className='search-results'>
              {loading ? <li>Loading...</li> : null}
              {schoolRes.map((school, i) => (
                <li
                  key={i}
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
            <label htmlFor='degree-type'>
              {' '}
              &nbsp; Degree Type <span className='asterisk'>*</span> &nbsp;
            </label>
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
            <label htmlFor='grade'> &nbsp; Grade &nbsp;</label>
            <input
              type='text'
              placeholder='3.9'
              onChange={(e) =>
                setEduInfo({ ...eduInfo, grade: e.target.value })
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
                &nbsp; From <span className='asterisk'>*</span> &nbsp;
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
                &nbsp; To <span className='asterisk'>*</span> &nbsp;
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

          <div className="required-indicator">
              <span className="asterisk">*</span> indicates required field
          </div>
          
          <button type='submit'>Save</button>
        </form>
      </Modal>
    </React.Fragment>
  );
}

export default EduModal;
