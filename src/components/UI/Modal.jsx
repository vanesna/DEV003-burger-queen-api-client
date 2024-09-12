import React from 'react';
import Modal from 'react-modal';
import './Modal.css';

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
        className="react-modal-content"
      >
        <button
          onClick={() => handleModalState(false)}
          className="react-modal-close"
        >
          <i className="bi bi-x-circle"></i>{' '}
        </button>
        {children}
      </Modal>
    </div>
  );
}
export default OrderModal;
