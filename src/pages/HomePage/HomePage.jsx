import { useEffect, useState } from 'react';
import { fetchTrendMovies } from '../../apiService/movies';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';
import Heading from '../../components/Heading/Heading';

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoader(true);
        setError(false);
        const { results } = await fetchTrendMovies();
        setMovies(results);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoader(false);
      }
    };
    fetchMovies();
  }, []);
  console.log(movies);

  return (
    <section className="container">
      <Heading title={'Trending today'} />
      {isLoader && <Loader />}
      {error && <ErrorMessage />}
      {movies && <MovieList movies={movies} />}
    </section>
  );
};

export default HomePage;
