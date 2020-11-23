import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from './HomePage';
import { Profile } from './Profile';

export const PrivateRouter = () => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
