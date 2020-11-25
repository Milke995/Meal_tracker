import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AdminPage } from '../pages/AdminPage/AdminPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { ProfilePage } from '../pages/ProfilePage';

export const PrivateRouter = () => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
