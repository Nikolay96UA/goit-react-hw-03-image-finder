import React from 'react';
import Serchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import css from './styles.module.css';
import Modal from 'components/Modal/Modal';
import { Oval } from 'react-loader-spinner';
import LoadMore from 'components/Button/Button';
import { getImages } from './APIService/APIService';

export default class App extends React.Component {
  state = {
    searchQuery: '',
    images: null,
    error: null,
    currentPage: 1,
    totalPages: 0,
    showModal: false,
    selectedImage: '',
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({
        images: [],
        currentPage: 1,
        error: null,
      });
    }

    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { currentPage, searchQuery } = this.state;
    this.setState({ isLoading: true, error: null }); // Додано обнулення помилки
  
    try {
      const data = await getImages({ searchQuery, currentPage });
  
      if (!data.hits) {
        throw new Error('No matches found');
      }
  
      if (data.hits.length > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          isLoading: false,
        }));
      } else {
        // Додано перевірку на пустий результат
        this.setState({ isLoading: false, error: 'No images found' });
      }
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };
  

  handleImageClick = image => {
    this.setState({ showModal: true, selectedImage: image.largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  handelOnSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ currentPage: prevState.currentPage + 1 }),
      () => {
        this.fetchImages();
      }
    );
  };

  render() {
    const { images, isLoading, error } = this.state;
  
    return (
      <>
        <Serchbar onSubmit={this.handelOnSubmit} />
        <div>
          <ImageGallery>
            <ImageGalleryItem
              images={this.state.images}
              hendleModal={this.handleImageClick}
            />
          </ImageGallery>
        </div>
        {isLoading && (
          <div className={css.LoaderContainer}>
            <Oval color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {error && (
          <div className={css.ErrorContainer}>{error}</div>
        )}
        {!isLoading && !error && images && (
          <LoadMore onClick={this.handleLoadMore} />
        )}
        {this.state.showModal && (
          <Modal
            image={this.state.selectedImage}
            onClose={this.handleCloseModal}
          />
        )}
      </>
    );
  }
  
  
  
}
