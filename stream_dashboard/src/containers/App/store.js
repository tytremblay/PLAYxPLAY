import { createStore, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import rootReducer from '../../redux/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

export const client = axios.create({
  baseURL: 'http://localhost:5000/api',
  responseType: 'json',
  returnRejectedPromiseOnError: true
});

const middleware = [thunk, axiosMiddleware(client)];

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default { store, client };
