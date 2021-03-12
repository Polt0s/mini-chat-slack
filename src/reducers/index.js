import { configureStore, combineReducers } from '@reduxjs/toolkit';
import channelsReducer from './channels.js';
import messagesReducer from './messages.js';

const reducer = combineReducers({
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
});

const store = configureStore({
  reducer,
});

export default store;
