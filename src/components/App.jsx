import React from 'react';
import { useSelector } from 'react-redux';
import Channels from './channels/Channels.jsx';
import MessagesBox from './messages/MessagesBox.jsx';
import ModalAddChannel from './modals/ModalAddChannel.jsx';

const modals = {
  addChannel: ModalAddChannel,
};

const openedModal = (modalName) => modals[modalName];

const renderModal = ({ modalInfo }) => {
  if (!modalInfo.isOpened) {
    return null;
  }

  const Modal = openedModal(modalInfo.type);
  return <Modal modalInfo={modalInfo} />;
};

const App = () => {
  const modalInfo = useSelector((state) => state.modal);
  return (
    <div className="row h-100 pb-3">
      <Channels />
      <MessagesBox />
      {renderModal({ modalInfo })}
    </div>
  );
};

export default App;
