import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import themeReducer from './themeReducer';
import sidebarReducer from './sidebarReducer';
import streamReducer from './streamReducer';

export default combineReducers({
  form: reduxFormReducer,
  theme: themeReducer,
  sidebar: sidebarReducer,
  streams: streamReducer
});
