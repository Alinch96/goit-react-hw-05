import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.moviesList}>
      {movies.map(({ id, ...rest }) => {
        return (
          <li key={id} className={styles.movieItem}>
            <Link
              className={styles.movieLink}
              to={`/movies/${id}`}
              state={{ from: location }}
            >
              <MovieCard data={rest} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
