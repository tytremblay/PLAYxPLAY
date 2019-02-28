import React, { Component, Fragment } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss';
import Router from './Router';
import ScrollToTop from './ScrollToTop';

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <Router />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
);

export default hot(module)(App);
