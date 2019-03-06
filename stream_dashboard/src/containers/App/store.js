import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import rootReducer from '../../redux/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

export const client = axios.create({
  baseURL: 'http://firstinspires.tv:90/api',
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
