import { GalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallary.module.css';

export const ImageGallary = ({ images }) => {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <GalleryItem key={image.id} image={image} />
      ))}
    </ul>
  );
};

ImageGallary.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
