import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgb(40,40,40, 0.8)',
  },
  content: {
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
  const [modalIsOpen, setIsOpen] = React.useState(false);

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
            <button onClick={closeModal}>close</button>
            <form>
                <input type='text' placeholder='School'></input>
                <input type='text' placeholder='Degree'></input>
                <input type='text' placeholder='Field of Study'></input>
                Dates Attended
                <button type='submit'>Save</button>
            </form>
        </Modal>
    </React.Fragment>
  );
}

export default EduModal;
