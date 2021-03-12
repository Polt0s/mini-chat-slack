import React from 'react';
import Channels from './channels/Channels.jsx';
import MessagesBox from './messages/MessagesBox.jsx';

const App = (gon) => {
  const { gon: { channels } } = gon;
  return (
    <div className="row h-100 pb-3">
      <Channels channels={channels} />
      <MessagesBox />
    </div>
  );
};

export default App;
