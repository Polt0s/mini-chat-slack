import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  FormControl,
  FormGroup,
  Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import sendingChannel from '../../requestServer/sendingChannel.js';
import { closeModal } from '../../reducers/modal.js';

const ModalAddChannel = (props) => {
  const { modalInfo: { isOpened } } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: yup.object({
      text: yup.string().min(3).max(20).required('Must be 3 to 20 characters'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { text } = values;
      const channelData = { name: text };
      await sendingChannel(channelData);
      resetForm(values);
      handleClose();
    },
  });

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
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
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
