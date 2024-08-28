import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';

import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import Heading from '../../components/Heading/Heading';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SubNavigation from '../../components/SubNavigation/SubNavigation';
import { fetchMovieById } from '../../apiService/movies';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const goBack = useRef(location?.state?.from ?? '/');

  useEffect(() => {
    if (!movieId) return;
    const handleMovieById = async () => {
      if (!movieId) return;
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await fetchMovieById(movieId);
        console.log(data.title);

        setMovieDetails(data);
      } catch (err) {
        console.log('catch', isError);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    handleMovieById();
  }, [movieId]);

  console.log('movieDetails', movieDetails);
  console.log('Error', isError);

  return (
    <section className="container">
      {movieDetails && <Heading title={movieDetails.title} />}

      <GoBackBtn to={goBack.current}>Go Back</GoBackBtn>

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {movieDetails && <MovieDetails movieDetails={movieDetails} />}

      {movieDetails && (
        <h2 className={styles.additionalTitle}>Additional information</h2>
      )}

      {movieDetails && <SubNavigation />}

      <Outlet />
    </section>
  );
};

export default MovieDetailsPage;
