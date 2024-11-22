import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';
import logger from './middleware/logger';

// Create the store with only middleware applied
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger) // Only apply thunk and logger as middleware
);

export default store;
