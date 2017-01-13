import axios from 'axios';
import * as type from '../constants/ActionTypes';
const apiKey = '306bd1f9dda87b11475c98f9d47e3862';

export function getNowPlayingList(page){
  console.log(page, 'page num')
  const request = axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${[page]}`);
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

export function getGenreData(){
  const request = axios.get(``);
  return {
    type: type.RETRIEVE_GENRE,
    payload: request
  }
}