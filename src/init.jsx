import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import store from './reducers/index.js';
import App from './components/App.jsx';
import { addMessage } from './reducers/messages.js';
import getRandomUserName from './getRandomUserName.js';
import Context from './ReactContext.jsx';

console.log(getRandomUserName());
const init = (gon) => {
  const { channels, messages, currentChannelId } = gon;
  // console.log(channels)
  messages.map((message) => {
    const data = { attributes: message };
    store.dispatch(addMessage({ data }));
    return null;
  });

  const socket = io();
  socket.on('newMessage', ({ data }) => {
    store.dispatch(addMessage({ data }));
  });

  render(
    <Provider store={store}>
      <Context.Provider value={getRandomUserName()}>
        <App gon={gon} />
      </Context.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default init;
