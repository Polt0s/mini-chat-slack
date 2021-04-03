import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, FormControl, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import sendingRenameChannel from '../../requestServer/sendingRenameChannel.js';
import { closeModal } from '../../reducers/modal.js';
import getValidationSchema from '../../validateSchema.js';
import RenderButton from './RenderButton.jsx';

const ModalRenameChannel = (props) => {
  const channels = useSelector((state) => state.channelsInfo.channels);
  const uniqueName = channels.map(({ name }) => name);
  const dispatch = useDispatch();
  const { modalInfo: { isOpened, extra } } = props;

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
      const data = { name: text };
      await sendingRenameChannel(extra.id, data);
      resetForm(values);
      handleClose();
    },
  });

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
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
