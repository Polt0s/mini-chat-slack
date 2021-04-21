import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Form } from 'react-bootstrap';
import { closeModal } from '../../reducers/modal.js';
import useApi from '../../hooks/useApi.js';

const ModalRemoveChannel = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { removeChannel } = useApi();
  const processStatus = useSelector((state) => state.channelsInfo.status);
  const { modalInfo: { isOpened, extra: { id } } } = props;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const data = { id };

  const handleSubmit = async () => {
    await removeChannel(data);
    handleClose();
  };

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {t('modals.textSure')}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            {t('modals.buttonClose')}
          </Button>
          <Button disabled={processStatus === 'filling'} type="submit" variant="danger">
            {t('modals.buttonDelete')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalRemoveChannel;
