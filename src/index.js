// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import io from 'socket.io-client';
import { render } from 'react-dom';

import '../assets/application.scss';

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

render(
  init(socket),
  document.getElementById('chat'),
);
