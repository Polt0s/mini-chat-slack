import { configureStore, combineReducers } from '@reduxjs/toolkit';
import channelsReducer from './channels.js';
import messagesReducer from './messages.js';
import modalReducer from './modal.js';

const reducer = combineReducers({
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modal: modalReducer,
});

const store = configureStore({
  reducer,
});

export default store;
