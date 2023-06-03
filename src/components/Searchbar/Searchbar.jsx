import React from 'react';
import css from '../styles.module.css';

export default class Serchbar extends React.Component {
  state = {
    searchQuery: '',
  };

  handelQueryChenge = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handelSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return alert('Введите ваш запрос');
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handelSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>S</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handelQueryChenge}
          />
        </form>
      </header>
    );
  }
}
