import styles from './MovieCard.module.css';
import { IMG_URL, DEFAULT_TITLE } from '../../constants/constants';
import { MdOutlineImageNotSupported } from 'react-icons/md';

const MovieCard = ({ data: { poster_path, title } }) => {
  return (
    <div className={styles.movieContent}>
      {poster_path ? (
        <img
          className={styles.moviePoster}
          src={IMG_URL + poster_path}
          alt={'avatar ' + title || DEFAULT_TITLE}
          loading="lazy"
        />
      ) : (
        <p className={styles.noImg}>
          <MdOutlineImageNotSupported size="30px" />
          No Image
        </p>
      )}

      <h3 className={styles.movieTitle}>{title || DEFAULT_TITLE}</h3>
    </div>
  );
};

export default MovieCard;
