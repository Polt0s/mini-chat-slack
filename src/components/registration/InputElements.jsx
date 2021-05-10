/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const InputElements = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { id, name } = props;
  return (
    <>
      <label htmlFor={id || name}>{label}</label>
      <input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={false}
        className={
          meta.error && meta.touched
            ? 'form-control is-invalid'
            : 'form-control'
        }
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error" style={{ color: 'red' }}>{meta.error}</div>
      ) : null}
    </>
  );
};

InputElements.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default InputElements;
