import { Link } from 'react-router-dom';
import styles from './GoBackBtn.module.css';
import { FaArrowLeft } from 'react-icons/fa';

const GoBackBtn = ({ to, children }) => {
  return (
    <Link to={to} className={styles.goBackBtn} aria-label="go Homepage">
      <FaArrowLeft className={styles.goBackBtnIcon} />
      {children}
    </Link>
  );
};

export default GoBackBtn;
