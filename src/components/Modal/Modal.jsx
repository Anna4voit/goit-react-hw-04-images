import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, largeImageURL, tags }) => {
  const closeModal = event => {
    if (event.code === 'Escape' || event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  });

  return createPortal(
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
