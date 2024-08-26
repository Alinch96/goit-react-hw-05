import { useMemo } from 'react';
import styles from './MovieDetails.module.css';
import { DEFAULT_TITLE, IMG_URL } from '../../constants/constants';
import { MdOutlineImageNotSupported } from 'react-icons/md';

const MovieDetails = ({
  movieDetails: { backdrop_path, title, overview, vote_average, genres },
}) => {
  const genresList = useMemo(() => {
    if (!genres) return;
    const genresOfMovie =
      genres.length > 0 && genres.map(genre => genre.name).join(' ');
    return genresOfMovie;
  }, [genres]);

  return (
    <div className={styles.contentWrapper}>
      {backdrop_path ? (
        <img
          className={styles.posterImg}
          src={IMG_URL + backdrop_path}
          alt={'avatar ' + title || DEFAULT_TITLE}
          loading="lazy"
        />
      ) : (
        <p className={styles.noImg}>
          <MdOutlineImageNotSupported size="30px" />
          No Image
        </p>
      )}
      <div className={styles.content}>
        <span className={styles.score}>The Avarage Vote: {vote_average}</span>

        <div className={styles.overviewWrapper}>
          <span className={styles.overviewTitle}>Overview</span>
          <p className={styles.overviewText}>{overview}</p>
        </div>
        {genresList && (
          <div className={styles.genresWrapper}>
            <span className={styles.genresTitle}>Genres</span>
            <p className={styles.genresText}>{genresList}</p>{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
