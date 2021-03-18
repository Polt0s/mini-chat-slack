import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Button, InputGroup } from 'react-bootstrap';
import Message from './Messages.jsx';
import postSendingMessage from '../../requestServer/sendingMessage.js';
import Context from '../../ReactContext.jsx';

const MessagesBox = () => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const userName = useContext(Context);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const { message } = values;
      const messageData = { nickname: userName, body: message };
      await postSendingMessage(messageData, currentChannelId);
      resetForm(values);
    },
  });

  return (
    <div className=" col h-100">
      <div className="d-flex flex-column h-100">
        <Message />
        <div className="mt-auto">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  id="message"
                  name="message"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.message}
                />
                <Button variant="primary" type="submit">Submit</Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MessagesBox;
