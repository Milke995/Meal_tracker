import React, { useEffect } from 'react';
import { PublicRouter } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';
import fst from './Firebase';

export const AuthRouter = () => {
  const [currentUser, setCurrentUser] = React.useState(null);
  useEffect(() => {
    fst.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  if (currentUser === null) {
    return <PublicRouter />;
  } else {
    return <PrivateRouter />;
  }
};
