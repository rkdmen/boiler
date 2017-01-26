import * as type from '../constants/ActionTypes';

export function movieReducer(state = {}, action) {
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
        if(action.payload.data.results.length === 0){
          return Object.assign({}, state, {
          videoData: {name:'Trailer Not Available'}
        });
        }

        return Object.assign({}, state, {
          videoData:action.payload.data.results[0]
        });

      case type.RETRIEVE_REVIEW:
        return Object.assign({}, state, {
          reviewData:action.payload.data.results
        });

      case type.RETRIEVE_GENRE:
        return Object.assign({}, state, {
          genreData:action.payload.data.genres
        });

      case type.SEARCH_BY_GENRE:
        return Object.assign({}, state, {
          searchByGenre:action.payload.data.results
        });

      case type.RETRIVE_UPCOMING:
        return Object.assign({}, state, {
          upcomingData:action.payload.data.results
        });
      case type.SAVE_MOVIE:
      console.log(action.payload, ' SAVE_MOVIE reducer')
        return Object.assign({}, state, {
          saveMovie:action.payload.data
        });
      case type.RETRIVE_SAVED_MOVIE:
      console.log(action.payload, ' retrieve_saved reducer')
        return Object.assign({}, state, {
          savedMovieData:action.payload.data
        });

      default:
          return state;
    }

}


