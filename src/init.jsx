import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar.jsx';

const App = (props) => {
  const { channels, messages, currentChannelId } = props;
  render(
    <Navbar channels={channels} />,
    //   <Provider store={store}>
    //   <AppRegistration />
    // </Provider>,
    document.getElementById('chat'),
  );
};

export default App;
