import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchDate, setSearchDate] = useState('');

  const handleOnChange = event => {
    setSearchDate(event.currentTarget.value.trim().toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchDate);
    setSearchDate('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.button_label}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchDate"
          value={searchDate}
          onChange={handleOnChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
