import React from 'react';
import { Button } from 'react-bootstrap';

const RenderButton = (props) => {
  const { formik, handleClose } = props;
  return (
    <div className="d-flex justify-content-end">
      <Button className="mr-2" variant="secondary" disabled={formik.isSubmitting} onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
        Submit
      </Button>
    </div>
  );
};

export default RenderButton;
