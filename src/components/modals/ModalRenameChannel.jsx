import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  FormControl,
  Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import sendingRenameChannel from '../../requestServer/sendingRenameChannel.js';
import { closeModal } from '../../reducers/modal.js';
import getValidationSchema from '../../validateSchema.js';

const ModalRenameChannel = (props) => {
  const dispatch = useDispatch();
  const { modalInfo: { isOpened, extra } } = props;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      text: extra.name,
    },
    validationSchema: getValidationSchema(),
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
      <Modal.Header>
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
          <div className="d-flex justify-content-end">
            <Button className="mr-2" variant="secondary" disabled={formik.isSubmitting} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
