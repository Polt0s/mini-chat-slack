import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  FormControl,
  FormGroup,
  Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { closeModal } from '../../reducers/modal.js';
import getValidationSchema from '../../validateSchema.js';
import RenderButton from './RenderButton.jsx';
import useApi from '../../hooks/useApi.js';

const ModalAddChannel = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { createChannel } = useApi();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const { modalInfo: { isOpened } } = props;
  const uniqueName = channels.map(({ name }) => name);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: getValidationSchema(uniqueName),
    onSubmit: async (values, { resetForm }) => {
      const { text } = values;
      const channelData = { name: text.trim() };
      await createChannel(channelData);
      resetForm(values);
      handleClose();
    },
  });

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <FormGroup>
            <FormControl
              name="text"
              className="mb-2"
              value={formik.values.text}
              onChange={formik.handleChange}
              isInvalid={formik.touched.text && formik.errors.text}
            />
            <div className="d-block mb-2 invalid-feedback" style={{ color: 'red' }}>
              {formik.touched.text && formik.errors.text ? (
                <div>{formik.errors.text}</div>
              ) : null}
            </div>
            <RenderButton formik={formik} handleClose={handleClose} />
          </FormGroup>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default ModalAddChannel;
