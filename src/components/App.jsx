import { useState, useEffect } from 'react';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallary } from './ImageGallery/ImageGallery';
import { searchImages } from '../Service/api';
import { Button } from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const per_page = 12;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const { data } = await searchImages(search, page, per_page);
        if (data.hits.length === 0) {
          // Если изображения не найдены, выводим сообщение
          return toast.info('Sorry image not found...');
        }
        const array = data.hits;
        const currentImages = array.map(
          ({ id, tags, webformatURL, largeImageURL }) => {
            return { id, tags, webformatURL, largeImageURL };
          }
        );

        setImages(prevImages => [...prevImages, ...currentImages]);
        setTotalPages(Math.ceil(data.totalHits / per_page));

        if (page === 1) {
          return toast.success(`Hooray! We found ${data.totalHits} images.`);
        }
        if (page !== 1 && page === totalPages) {
          return toast.info(
            `We are sorry, but you have reached the end of search results.`
          );
        }
      } catch (error) {
        return toast.error(
          'Oops! Something went wrong! Try reloading the page!'
        );
      } finally {
        setLoading(false);
      }
    };

    if (search) {
      fetchImages();
    }
  }, [search, page]);

  const searchImage = searchDate => {
    setSearch(searchDate);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => setPage(prevPage => prevPage + 1);

  return (
    <div className={css.App}>
      <ToastContainer position="top-center" autoClose={2000} />
      <Searchbar onSubmit={searchImage} />
      {images.length > 0 && <ImageGallary images={images} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && totalPages !== page && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
};
