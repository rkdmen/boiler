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

      default:
          return state;
    }
}
