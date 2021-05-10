import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import InputElements from './InputElements.jsx';
import ChatPage from '../ChatPage.jsx';
import sendingDataSignUpForm from '../../requestServer/sendingDataSignUpForm.js';
import useAuth from '../../hooks/useAuth.js';

const SignUpForm = () => {
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
              confirmPassword: '',
            }}
            validationSchema={
              yup.object({
                username: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
                password: yup.string().min(6, 'не менее 6 символов').required('Обязательное поле'),
                confirmPassword: yup.string().when('password', {
                  is: (check) => (check && check.length > 0),
                  then: yup.string().oneOf(
                    [yup.ref('password')],
                    'Пароли должны совпадать',
                  ),
                }),
              })
            }
            onSubmit={(values, { resetForm }) => {
              const { username, password } = values;
              sendingDataSignUpForm(username, password)
                .then((user) => {
                  auth.setUser(user);
                  history.push('/');
                  return (
                    <ChatPage />
                  );
                })
                .catch(() => {
                  changeIsError(t('signUp.userAlreadyExists'));
                });
              resetForm(values);
            }}
            validateOnMount
          >
            {(formik) => (
              <Form className="p-3">
                <div className="form-group">
                  <InputElements
                    placeholder={t('signUp.placeholderUsername')}
                    label={t('signUp.username')}
                    id="username"
                    name="username"
                    type="text"
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <InputElements
                    placeholder={t('signUp.placeholderPassword')}
                    label={t('signUp.password')}
                    id="password"
                    name="password"
                    type="password"
                  />
                </div>
                <div className="form-group">
                  <InputElements
                    placeholder={t('signUp.placeholderConfirmPassword')}
                    label={t('signUp.confirmPassword')}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                  />
                  <div style={{ color: 'red', textAlign: 'center' }}>{isError}</div>
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-primary" disabled={!formik.isValid}>{t('signUp.signUpButton')}</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
