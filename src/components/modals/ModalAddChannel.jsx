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
import sendingAddChannel from '../../requestServer/sendingAddChannel.js';
import { closeModal } from '../../reducers/modal.js';
import getValidationSchema from '../../validateSchema.js';

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
    validationSchema: getValidationSchema(),
    onSubmit: async (values, { resetForm }) => {
      const { text } = values;
      const channelData = { name: text };
      await sendingAddChannel(channelData);
      resetForm(values);
      handleClose();
    },
  });

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
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
            <div className="d-flex justify-content-end">
              <Button className="mr-2" variant="secondary" disabled={formik.isSubmitting} onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
                Submit
              </Button>
            </div>
          </FormGroup>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default ModalAddChannel;
