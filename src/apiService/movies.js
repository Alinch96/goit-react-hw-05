import Axios from 'axios';

const ACCESS_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDlmNjMxNDliMTQyMDExOTczYzc4MDljZTNlMzdjMiIsIm5iZiI6MTcyNDM0NjIxMS4yNzI2NzYsInN1YiI6IjY2Yzc2ZDQ4ZGYwYjVhN2QzMzE1OGMzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CGYF6KLrdJDiL0Oy5ZjaC9EvGYAVloiOUBB3scr76eU';

const axios = Axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${ACCESS_KEY}`,
    accept: 'application/json',
  },
});
const API_PATH = {
  trend: '/trending/movie/day?',
  movie: '/movie/',
  search: '/search/movie',
};

export const fetchTrendMovies = async () => {
  const { data } = await axios.get(API_PATH.trend, {});
  return data;
};

export const fetchSearchMovie = async (query, page = 1) => {
  const response = await axios.get(API_PATH.search, {
    params: {
      query,
      page,
    },
  });

  return response.data;
};

export const fetchMovieById = async id => {
  const response = await axios.get(API_PATH.movie + id + '?');
  return response.data;
};

export const fetchMovieCredits = async id => {
  const response = await axios.get(API_PATH.movie + id + '/credits?');
  return response.data;
};

export const fetchMovieReviews = async id => {
  const response = await axios.get(API_PATH.movie + id + '/reviews?');
  return response.data;
};
