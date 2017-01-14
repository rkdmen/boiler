import * as type from '../constants/ActionTypes';

export function movieReducer(state = {}, action) {
  console.log(action.payload, ' payload!');
    switch (action.type) {

      case type.RETRIEVE_NOWPLAYING_LIST:
        return Object.assign({}, state, {
          movieList:action.payload.data.results
        });

      case type.RETRIEVE_MOVIE_DETAIL:
        return Object.assign({}, state, {
          movieData:action.payload.data
        });

      case type.RETRIEVE_VIDEO:
      console.log('retrieve video')
        return Object.assign({}, state, {
          videoData:action.payload.data.results[0]
        });

      case type.RETRIEVE_REVIEW:
      console.log('retrieve review')
        return Object.assign({}, state, {
          reviewData:action.payload.data.results
        });

      case type.RETRIEVE_GENRE:
      console.log('RETRIEVE_GENRE')
        return Object.assign({}, state, {
          genreData:action.payload.data.genres
        });

      case type.SEARCH_BY_GENRE:
      console.log('SEARCH_BY_GENRE')
        return Object.assign({}, state, {
          searchByGenre:action.payload.data.results
        });


      default:
          return state;
    }

}
