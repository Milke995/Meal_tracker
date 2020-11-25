import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import fst from '../../Firebase';

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  borderBottom: '5px solid black',
  width: 'fullwidth',
  padding: '20px',
  backgroundColor: 'aqua',
  height: '50px',
};

const AvSt = {
  display: 'inline-block',
  marginLeft: '10px',
  marginRight: '15px',
};

export const HomePageHeader = (props) => {
  const history = useHistory();

  const AdminHandler = () => {
    history.push('/admin');
  };

  const toProfileHandler = () => {
    // window.location.href = 'http://localhost:3000/profile';
    history.push('/profile');
  };

  return (
    <div style={style}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {props.userInfo && props.userInfo.role === 'admin' ? (
          <button onClick={() => AdminHandler()}>Manage all users</button>
        ) : (
          <div></div>
        )}
      </div>
      <HoverText onClick={() => toProfileHandler()}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center' }}>
          <div>{fst.auth().currentUser.displayName}</div>
          <Avatar style={AvSt} alt="Mislav Gillinger" src={fst.auth().currentUser.photoURL} />
          <button onClick={() => fst.auth().signOut()}>Sign out</button>
        </div>
      </HoverText>
    </div>
  );
};
