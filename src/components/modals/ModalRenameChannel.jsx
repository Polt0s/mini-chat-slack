import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, FormControl, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { closeModal } from '../../reducers/modal.js';
import getValidationSchema from '../../validateSchema.js';
import RenderButton from './RenderButton.jsx';
import useApi from '../../hooks/useApi.js';

const ModalRenameChannel = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { renameChannel } = useApi();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const { modalInfo: { isOpened, extra } } = props;
  const uniqueName = channels.map(({ name }) => name);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      text: extra.name,
    },
    validationSchema: getValidationSchema(uniqueName),
    onSubmit: async (values, { resetForm }) => {
      const { text } = values;
      const { id } = extra;
      const data = { id, name: text };
      await renameChannel(data);
      resetForm(values);
      handleClose();
    },
  });

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormControl
            name="text"
            value={formik.values.text}
            className="mb-2"
            onChange={formik.handleChange}
            isInvalid={formik.touched.text && formik.errors.text}
          />
          {formik.touched.text && formik.errors.text ? (
            <div className="d-block mb-2 invalid-feedback" style={{ color: 'red' }}>{formik.errors.text}</div>
          ) : null}
          <RenderButton formik={formik} handleClose={handleClose} />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
