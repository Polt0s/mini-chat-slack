import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import store from './reducers/index.js';
import App from './components/App.jsx';
import { addMessage } from './reducers/messages.js';
import { changeChannel, addChannel, deleteChannel } from './reducers/channels.js';
import getRandomUserName from './getRandomUserName.js';
import Context from './ReactContext.jsx';

const init = (gon) => {
  const { channels, messages, currentChannelId } = gon;

  store.dispatch(changeChannel({ id: currentChannelId }));

  messages.map((message) => {
    const data = { attributes: message };
    store.dispatch(addMessage({ data }));
    return null;
  });

  channels.map((channel) => {
    const data = {
      id: channel.id,
      attributes: channel,
    };
    store.dispatch(addChannel({ data }));
    return null;
  });

  const socket = io();
  socket.on('newMessage', ({ data }) => {
    store.dispatch(addMessage({ data }));
  });
  socket.on('newChannel', ({ data }) => {
    store.dispatch(addChannel({ data }));
  });
  socket.on('deleteChannel', ({ data }) => {
    store.dispatch(deleteChannel({ data }));
  });

  render(
    <Provider store={store}>
      <Context.Provider value={getRandomUserName()}>
        <App />
      </Context.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default init;
