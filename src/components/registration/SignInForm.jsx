import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import InputElements from './InputElements.jsx';
import sendingDataSignInForm from '../../requestServer/sendingDataSignInForm.js';
import ChatPage from '../ChatPage.jsx';
import useAuth from '../../hooks/useAuth.js';

const SignInForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const auth = useAuth();
  const [isError, changeIsError] = useState('');

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={
              yup.object({
                username: yup.string().required(''),
                password: yup.string().required(''),
              })
            }
            onSubmit={(values, { resetForm }) => {
              const { username, password } = values;
              sendingDataSignInForm(username, password)
                .then((user) => {
                  auth.setUser(user);
                  history.push('/');
                  return (
                    <ChatPage />
                  );
                })
                .catch(() => {
                  changeIsError(t('singIn.incorrectLoginOrPassword'));
                });
              resetForm(values);
            }}
            validateOnMount
          >
            {(formik) => (
              <Form className="p-3">
                <div className="form-group">
                  <InputElements
                    placeholder="name"
                    label={t('singIn.username')}
                    id="username"
                    name="username"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <InputElements
                    placeholder="******"
                    label={t('singIn.password')}
                    name="password"
                    id="password"
                    type="password"
                  />
                  <div style={{ color: 'red', textAlign: 'center' }}>{isError}</div>
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-primary" disabled={!formik.isValid}>{t('singIn.signInbutton')}</button>
                <div className="d-flex flex-column align-items-center">
                  <span className="small mb-2">{t('singIn.notAccount')}</span>
                  <NavLink to="/signup">{t('singIn.registration')}</NavLink>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
