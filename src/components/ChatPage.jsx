import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Channels from './channels/Channels.jsx';
import MessagesBox from './messages/MessagesBox.jsx';
import ModalAddChannel from './modals/ModalAddChannel.jsx';
import ModalRemoveChannel from './modals/ModalRemoveChannel.jsx';
import ModalRenameChannel from './modals/ModalRenameChannel.jsx';
import {
  changeChannel,
  addChannel,
} from '../reducers/channels.js';
import { addMessage } from '../reducers/messages.js';
import sendingDataFromTheServer from '../requestServer/gettingDataServer.js';

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

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    sendingDataFromTheServer()
      .then((response) => {
        dispatch(changeChannel({ id: response.currentChannelId }));

        response.messages.map((message) => {
          dispatch(addMessage(message));
          return null;
        });

        response.channels.map((channel) => {
          dispatch(addChannel(channel));
          return null;
        });
      });
  }, [dispatch]);

  const modalInfo = useSelector((state) => state.modal);
  return (
    <div className="row h-100 pb-3">
      <Channels />
      <MessagesBox />
      {renderModal({ modalInfo })}
    </div>
  );
};

export default ChatPage;
