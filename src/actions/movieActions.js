import axios from 'axios';
import * as type from '../constants/ActionTypes';
const apiKey = 'd330b017d2ee6e4d377e7641733ce77c';

export function getNowPlayingList(page){
  const request = axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`);
  return {
    type: type.RETRIEVE_NOWPLAYING_LIST,
    payload: request
  }
}

export function getMovieDetail(id){
  const request = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
  return {
    type: type.RETRIEVE_MOVIE_DETAIL,
    payload: request
  }
}

export function getVideo(id){
  const request = axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`);
  return {
    type: type.RETRIEVE_VIDEO,
    payload: request
  }
}

export function getReview(id){
  const request = axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`);
  return {
    type: type.RETRIEVE_REVIEW,
    payload: request
  }
}

export function searchByGenre(id){
  const request = axios.get(`https://api.themoviedb.org/3/genre/${id}/movies?api_key=${apiKey}&language=en-US&include_adult=false&sort_by=created_at.asc`);
  return {
    type: type.SEARCH_BY_GENRE,
    payload: request
  }
}

export function getGenreData(){
  const request = axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
);
  return {
    type: type.RETRIEVE_GENRE,
    payload: request
  }
}
