import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const GalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <>
      <li className={css.gallery_item}>
        <img
          className={css.gallery_item_image}
          src={image.webformatURL}
          alt={image.tag}
          onClick={toggleModal}
        />
        {showModal && (
          <Modal
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onClose={toggleModal}
          />
        )}
      </li>
    </>
  );
};

GalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
