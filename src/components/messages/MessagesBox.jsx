import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Message from './Messages.jsx';
import useApi from '../../hooks/useApi.js';

const MessagesBox = () => {
  const { sendMessage } = useApi();
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const parseUser = JSON.parse(localStorage.getItem('user'));
  const userName = parseUser.username;

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const { message } = values;
      if (!message.trim()) {
        return null;
      }
      const messageData = { nickname: userName, body: message, currentChannelId };
      await sendMessage(messageData);
      resetForm(values);
      return null;
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
                <Button variant="primary" type="submit">{t('submitButton')}</Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MessagesBox;
