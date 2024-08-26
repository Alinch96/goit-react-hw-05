import { useState } from 'react';
import styles from './SearchForm.module.css';
import toast, { Toaster } from 'react-hot-toast';

const SearchForm = ({ handleSearchMovie, query }) => {
  const [search, setSearch] = useState(query ?? '');

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const onHandleSubmit = event => {
    event.preventDefault();
    if (search.trim() === '') {
      console.log(search);

      toast('Please enter your query!');
      return;
    }

    handleSearchMovie(search);
  };

  return (
    <form className={styles.searchForm} onSubmit={onHandleSubmit}>
      <input
        className={styles.searchInput}
        onChange={handleChange}
        type="search"
        name="query"
        value={search}
      />
      <button
        className={styles.searchButton}
        type="submit"
        aria-label="search button"
      >
        Search
      </button>
      <Toaster
        toastOptions={{
          duration: 1500,
          style: {
            border: '1px solid white',
            padding: '16px',
            fontSize: '24px',
            background: '#363636',
            color: '#fff',
            textAlign: 'center',
          },
        }}
      />
    </form>
  );
};

export default SearchForm;
