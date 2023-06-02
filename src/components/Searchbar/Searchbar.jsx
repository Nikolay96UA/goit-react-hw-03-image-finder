import React from 'react';
import css from '../styles.module.css';

export default class Serchbar extends React.Component {
  state = {
    serchQuery: '',
  };

  handelQueryChenge = event => {
    this.setState({ serchQuery: event.currentTarget.value.toLowerCase() });
  };

  handelSubmit = event => {
    event.preventDefault();

    if (this.state.serchQuery.trim() === '') {
      return alert('Введите ваш запрос');
    }

    this.props.onSubmit(this.state.serchQuery);
    this.setState({ serchQuery: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handelSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handelQueryChenge}
          />
        </form>
      </header>
    );
  }
}
