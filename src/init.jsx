import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import io from 'socket.io-client';
import store from './reducers/index.js';
import App from './components/App.jsx';
import resources from './locales/index.js';
import { addMessage } from './reducers/messages.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './reducers/channels.js';

const init = () => {
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

  const socket = io();

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

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};

export default init;
