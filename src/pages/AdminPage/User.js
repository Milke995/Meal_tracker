import React from 'react';
import { deleteAllUsersMeals } from '../../api/deleteAllUsersMeals';
import { deleteUser } from '../../api/deleteUser';
import fst from '../../Firebase';

export const User = (props) => {
  const setAllUsers = props.setAllUsers;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: 'auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '300px',
          border: '2px solid black',
          height: '40px',
          paddingLeft: '10px',
        }}>
        {props.user.email}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '150px',
          border: '2px solid black',
          height: '40px',
          paddingLeft: '10px',
        }}>
        {props.user.FirstName} {props.user.LastName}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100px',
          border: '2px solid black',
          height: '40px',
          paddingLeft: '10px',
        }}>
        {props.user.role}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '150px',
          border: '2px solid black',
          height: '40px',
          paddingLeft: '10px',
        }}>
        <button onClick={() => deleteAllUsersMeals(props.user.userID)}>Delete user's meals</button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100px',
          border: '2px solid black',
          height: '40px',
          paddingLeft: '10px',
        }}>
        {props.user.userID === fst.auth().currentUser.uid ? null : (
          <button onClick={() => deleteUser(props.user.userID, setAllUsers)}>Delete user</button>
        )}
      </div>
    </div>
  );
};
