import React from 'react';
import { useSelector } from 'react-redux';
import Channels from './channels/Channels.jsx';
import MessagesBox from './messages/MessagesBox.jsx';
import ModalAddChannel from './modals/ModalAddChannel.jsx';
import ModalRemoveChannel from './modals/ModalRemoveChannel.jsx';
import ModalRenameChannel from './modals/ModalRenameChannel.jsx';

const modals = {
  addChannel: ModalAddChannel,
  removeChannel: ModalRemoveChannel,
  renameChannel: ModalRenameChannel,
};

const selectModal = (modalName) => modals[modalName];

const renderModal = ({ modalInfo }) => {
  if (!modalInfo.isOpened) {
    return null;
  }
  const Modal = selectModal(modalInfo.type);
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
