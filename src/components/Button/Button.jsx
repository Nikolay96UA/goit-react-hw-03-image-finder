import css from '../styles.module.css';

export default function LoadMore({ onClick }) {
  return (
    <button className={css.Button} type="button" onClick={onClick}>
      Load more
    </button>
  );
}
