import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  FormControl,
  Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import sendingRenameChannel from '../../requestServer/sendingRenameChannel.js';
import { closeModal } from '../../reducers/modal.js';

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
    validationSchema: yup.object({
      text: yup.string()
        .min(3, 'Must be 3 to 20 character')
        .max(20, 'Must be 3 to 20 character')
        .required('required'),
    }),
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
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <FormControl
            name="text"
            type="text"
            className="mb-2"
            value={formik.values.text}
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
            <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default ModalRenameChannel;
