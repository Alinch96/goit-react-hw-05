import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import styles from './MovieReviews.module.css';
import { fetchMovieReviews } from '../../apiService/movies';
import NoFoundMessage from '../NotFoundMessage/NotFoundMessage';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const reviewsRef = useRef(null);

  useEffect(() => {
    if (!movieId) return;

    async function getReviews() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  useEffect(() => {
    if (reviews?.length > 0 && reviewsRef.current) {
      const { height } = reviewsRef.current.getBoundingClientRect();
      window.scrollBy({ top: height, behavior: 'smooth' });
    }
  }, [reviews]);

  return (
    <section className="container">
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {reviews && reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map(({ id, author, content }, index) => (
            <li
              key={id}
              className={styles.reviewCard}
              ref={index === 0 ? reviewsRef : null}
            >
              <p className={styles.reviewAuthor}>{author}</p>
              <p className={styles.reviewContent}>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <NoFoundMessage
          text={'Unfortunately, there are no reviews for this movie yet'}
        />
      )}
    </section>
  );
}
