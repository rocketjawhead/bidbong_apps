import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {reducer} from '../reducers';

export const store = createStore(
  reducer,
  // composeWithDevTools(applyMiddleware(thunk, logger))
  composeWithDevTools(applyMiddleware(thunk)),
);
