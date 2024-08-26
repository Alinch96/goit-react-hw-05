import { IMG_URL } from '../../constants/constants';
import styles from './CastCard.module.css';

const CastCard = ({ data: { profile_path, name, character } }) => {
  return (
    <>
      <img
        className={styles.avatarImg}
        src={
          profile_path !== null
            ? IMG_URL + profile_path
            : ' https://ec.europa.eu/info/funding-tenders/opportunities/portal/assets/img/user-icon.png'
        }
        alt={'avatar ' + name}
      />

      <div className={styles.cardContent}>
        <hr className={styles.hr} />
        <p className={styles.cardTitle}>{name}</p>
        <p className={styles.cardDescription}>{character}</p>
      </div>
    </>
  );
};

export default CastCard;
