import React from 'react';
import { render } from 'react-dom';
import App from './containers/App/App';
import { store } from './containers/App/store';

render(<App store={store} />, document.getElementById('root'));
