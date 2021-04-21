import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Nav } from 'react-bootstrap';
import SignInForm from './registration/SignInForm.jsx';
import SignUpForm from './registration/SignUpForm.jsx';
import ChatPage from './ChatPage.jsx';
import AuthContext from '../AuthContext.jsx';
import ApiContext from '../ApiContext.jsx';
import api from '../API.js';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => {
  const parseUser = JSON.parse(localStorage.getItem('user'));

  const [user, setUser] = useState(parseUser ? { username: parseUser.username } : null);

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const { t } = useTranslation();

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogOut }}>
      <ApiContext.Provider value={api}>
        <Router>
          <div className="d-flex flex-column h-100">
            <Nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
              {!user
                ? (
                  <NavLink to="/login" className="mr-auto navbar-brand">
                    {t('title')}
                  </NavLink>
                ) : (
                  <>
                    <NavLink to="/" className="mr-auto navbar-brand">
                      {t('title')}
                    </NavLink>

                    <NavLink to="/login">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleLogOut}
                      >
                        {t('signOut')}
                      </button>
                    </NavLink>
                  </>
                )}
            </Nav>

            <Switch>
              <Route exact path="/login" component={SignInForm} />
              <Route exact path="/signup" component={SignUpForm} />
              <PrivateRoute exact path="/"><ChatPage /></PrivateRoute>
            </Switch>
          </div>
        </Router>
      </ApiContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
