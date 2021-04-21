import io from 'socket.io-client';

const socket = io();

const withAcknowledgement = (socketFunction) => (...args) => new Promise((resolve, reject) => {
  socketFunction(...args, (result, err) => {
    if (err) reject(err);
    resolve(result);
  });
});

const api = {
  sendMessage: withAcknowledgement((...args) => socket.emit('newMessage', ...args)),
  createChannel: withAcknowledgement((...args) => socket.emit('newChannel', ...args)),
  removeChannel: withAcknowledgement((...args) => socket.emit('removeChannel', ...args)),
  renameChannel: withAcknowledgement((...args) => socket.emit('renameChannel', ...args)),
};

export default api;
