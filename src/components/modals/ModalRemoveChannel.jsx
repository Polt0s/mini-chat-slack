import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import postDeleteChannel from '../../requestServer/sendingDeleteChannel.js';
import { closeModal } from '../../reducers/modal.js';

const ModalRemoveChannel = (props) => {
  const { modalInfo: { isOpened, extra } } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postDeleteChannel(extra.id);
    handleClose();
  };

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Channel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          Are you sure?
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="danger">
            Remove
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalRemoveChannel;
