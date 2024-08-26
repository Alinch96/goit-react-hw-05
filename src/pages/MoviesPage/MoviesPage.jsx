import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './MoviesPage.module.css';
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';
import Heading from '../../components/Heading/Heading';
import { fetchSearchMovie } from '../../apiService/movies';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const queryValue = searchParams.get('query');
  const page = Number(searchParams.get('page'));

  useEffect(() => {
    if (!searchParams.has('query') && !searchParams.has('page')) return;
    const handleSearchMovie = async () => {
      setIsLoading(true);
      setIsError(false);
      //       setMovies(null);
      //       setSearch('');

      try {
        const { results } = await fetchSearchMovie(queryValue, page);
        if (results.length === 0) {
          toast('There are no results matching your query!');
          return;
        }
        setMovies(results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearchMovie();
  }, [queryValue, page, searchParams]);

  console.log('mov-page', movies);

  const handleSearchMovie = userQuery => {
    if (movies === null && queryValue === userQuery) {
      //У випадку якщо користувач повторно намагається засабмітити те саме значення поля, по якому після попереднього
      // сабміту не було знайдено жодних результатів. Функція ефекту в useEffect викликатися не буде, бо searchParams лишився той самий
      // а отже toast в ньому повторно не викличеться на той самий неправильний повторний запит
      toast('There are no results matching your query!');
      return;
    }
    setSearchParams({ query: userQuery, page: 1 });
    setMovies(null);
  };
  const handleClickNext = () => {
    setSearchParams(prevParam => ({
      query: queryValue,
      page: Number(prevParam.get('page')) + 1,
    }));
    mainEl.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleClickPrev = () => {
    setSearchParams(prevParam => ({
      query: queryValue,
      page: Number(prevParam.get('page')) - 1,
    }));
    mainEl.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  const mainEl = useRef();

  return (
    <section className="container" ref={mainEl}>
      <Heading title={'Searching movies'} />

      <SearchForm handleSearchMovie={handleSearchMovie} query={queryValue} />

      {movies && <MovieList movies={movies} />}

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}
      {movies && (
        <div className={styles.paginationContainer}>
          {page > 1 && (
            <button
              onClick={handleClickPrev}
              className={styles.paginationBtn}
              aria-label="Previous page"
            >
              <FaArrowLeft className={styles.icon} />
              Previous
            </button>
          )}

          {movies.length === 20 && (
            <button
              onClick={handleClickNext}
              className={styles.paginationBtn}
              aria-label="Next page"
            >
              Next
              <FaArrowRight className={styles.icon} />
            </button>
          )}
        </div>
      )}

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
    </section>
  );
};

export default MoviesPage;
