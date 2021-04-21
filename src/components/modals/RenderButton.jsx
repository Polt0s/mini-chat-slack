import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const RenderButton = (props) => {
  const { t } = useTranslation();
  const { formik, handleClose } = props;
  return (
    <div className="d-flex justify-content-end">
      <Button className="mr-2" variant="secondary" disabled={formik.isSubmitting} onClick={handleClose}>
        {t('modals.buttonClose')}
      </Button>
      <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
        {t('modals.buttonSend')}
      </Button>
    </div>
  );
};

export default RenderButton;
