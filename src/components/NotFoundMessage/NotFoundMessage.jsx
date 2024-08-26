import styles from './NotFoundMessage.module.css';

const NotFoundMessage = ({ text }) => {
  return <div className={styles.noResult}>{text}</div>;
};

export default NotFoundMessage;
