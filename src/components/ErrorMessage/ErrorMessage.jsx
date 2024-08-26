import styles from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.error}>
        E <span>r</span>ror
      </p>
      <p className={styles.code}>
        4<span>0</span>
        <span>4</span>
      </p>
    </div>
  );
};

export default ErrorMessage;
