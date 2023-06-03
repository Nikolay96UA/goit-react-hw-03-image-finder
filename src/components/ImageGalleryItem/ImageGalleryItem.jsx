import css from '../styles.module.css';

export default function ImageGalleryItem({ images, hendleModal }) {
  return (
    <>
      {images &&
        images.map(image => {
          return (
            <li className={css.ImageGalleryItem} key={image.id}>
              <img
                className={css.ImageGalleryItemImage}
                src={image.webformatURL}
                alt={image.user}
                onClick={() => hendleModal(image)}
              />
            </li>
          );
        })}
    </>
  );
}
