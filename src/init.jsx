import React from 'react';
import { Provider } from 'react-redux';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import store from './reducers/index.js';
import App from './components/App.jsx';
import resources from './locales/index.js';
import { addMessage } from './reducers/messages.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './reducers/channels.js';

const init = (socket) => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',

      interpolation: {
        escapeValue: false,
      },
    });

  socket.on('newMessage', (data) => {
    store.dispatch(addMessage(data));
  });
  socket.on('newChannel', (data) => {
    store.dispatch(addChannel(data));
  });
  socket.on('removeChannel', (data) => {
    store.dispatch(removeChannel(data));
  });
  socket.on('renameChannel', (data) => {
    store.dispatch(renameChannel(data));
  });

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;
