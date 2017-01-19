// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import promise from 'redux-promise';
import { Router, Route, browserHistory, IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import App from './App.jsx';
import Main from './components/Main';
import rootReducer from './reducers/index';
import MovieInfoContainer from './containers/MovieInfoContainer';
import UpcomingMovieContainer from './containers/UpcomingMovieContainer';


const Store = createStore(
  combineReducers({
    reducer: rootReducer,
    routing: routerReducer
  }),
    applyMiddleware(promise)
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, Store);



ReactDOM.render(
    <Provider store={Store}>
        <Router history={history}>
          <Route path="/" component={App}/>
          <Route path="/upcoming" component={UpcomingMovieContainer}/>
          <Route path="/info/:id" component={MovieInfoContainer}/>
        </Router>
    </Provider>,
    document.getElementById('react-root')
);
