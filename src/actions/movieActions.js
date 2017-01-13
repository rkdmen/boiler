import axios from 'axios';
import * as type from '../constants/ActionTypes';
const apiKey = '306bd1f9dda87b11475c98f9d47e3862';

export function getNowPlayingList(){
  const request = axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
  return {
    type: type.RETRIEVE_NOWPLAYING_LIST,
    payload: request
  }
}