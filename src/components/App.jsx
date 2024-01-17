import { Component } from 'react';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallary } from './ImageGallery/ImageGallery';
import { searchImages } from '../Service/api';
import { Button } from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';

export class App extends Component {
  state = {
    loading: false,
    search: '',
    error: null,
    images: [],
    page: 1,
    per_page: 12,
    totalPages: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { search, page, per_page, totalPages } = this.state;
    try {
      this.setState({
        loading: true,
      });

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

      this.setState(({ images }) => ({
        images: [...images, ...currentImages],
        totalPages: Math.ceil(data.totalHits / per_page),
      }));

      if (page === 1) {
        return toast.success(`Hooray! We found ${data.totalHits} images.`);
      }
      if (page !== 1 && page === totalPages) {
        return toast.info(
          `We are sorry, but you have reached the end of search results.`
        );
      }
    } catch (error) {
      this.setState({
        error: 'Oops! Something went wrong! Try reloading the page!',
      });
      return toast.error('Oops! Something went wrong! Try reloading the page!');
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  searchImages = searchDate => {
    this.setState({
      search: searchDate,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { loading, images, totalPages, page } = this.state;
    const { searchImages, loadMore } = this;

    return (
      <div className={css.App}>
        <ToastContainer position="top-center" autoClose={2000} />
        <Searchbar onSubmit={searchImages} />
        {images.length > 0 && <ImageGallary images={images} />}
        {loading && <Loader />}
        {images.length > 0 && !loading && totalPages !== page && (
          <Button onClick={loadMore} />
        )}
      </div>
    );
  }
}
