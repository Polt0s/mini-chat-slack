import React from 'react';
import { useSelector } from 'react-redux';

const Message = () => {
  const activeId = useSelector((state) => state.channelsInfo.currentChannelId);
  const messages = useSelector((state) => state.messagesInfo.messages.filter(
    ({ channelId }) => channelId === activeId,
  ));
  // console.log(messages)
  const renderMessage = () => (
    <>
      {messages.map((message) => (
        <div key={message.id} className="text-break">
          <b>
            {message.author}
            :
          </b>
          {message.text}
        </div>
      ))}
    </>
  );

  return (
    <div id="message-box" className="chat-messages overflow-auto mb-3">{renderMessage()}</div>
  );
};

export default Message;
