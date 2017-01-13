import * as type from '../constants/ActionTypes';

export function movieReducer(state = {}, action) {
  console.log(action.payload, ' payload!');
    switch (action.type) {

      case type.RETRIEVE_NOWPLAYING_LIST:
        return Object.assign({}, state, {
          movieList:action.payload.data.results
        });
      default:
          return state;
    }
}
