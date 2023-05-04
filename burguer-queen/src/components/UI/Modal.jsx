import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    marginLeft: '25%',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function OrderModal({ children, modalIsOpen, setModalIsOpen }) {
  function handleModalState(state) {
    setModalIsOpen(state);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => handleModalState(false)}
        style={customStyles}
      >
        <button onClick={() => handleModalState(false)}>close</button>
        {children}
      </Modal>
    </div>
  );
}
export default OrderModal;
