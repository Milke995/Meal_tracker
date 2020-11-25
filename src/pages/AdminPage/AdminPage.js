import React from 'react';
import { getAllUsers } from '../../api/getAllUsers';
import { User } from './User';
import { useHistory } from 'react-router-dom';

export const AdminPage = () => {
  const [allUsers, setAllUsers] = React.useState([]);
  const history = useHistory();
  React.useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers();
      setAllUsers(users);
    };
    fetchData();
  }, []);
  const goHomeHandler = () => {
    history.push('/home');
  };
  const styleEmail = {
    display: 'flex',
    alignItems: 'center',
    width: '310px',
    border: '2px solid black',
    height: '40px',
    justifyContent: 'center',
  };
  const fullname = {
    display: 'flex',
    alignItems: 'center',
    width: '160px',
    border: '2px solid black',
    height: '40px',
    justifyContent: 'center',
  };
  const role = {
    display: 'flex',
    alignItems: 'center',
    width: '110px',
    border: '2px solid black',
    height: '40px',
    justifyContent: 'center',
  };
  const deleteUsersMeals = {
    display: 'flex',
    alignItems: 'center',
    width: '160px',
    border: '2px solid black',
    height: '40px',
    justifyContent: 'center',
  };
  const deleteUser = {
    display: 'flex',
    alignItems: 'center',
    width: '110px',
    border: '2px solid black',
    height: '40px',
    justifyContent: 'center',
  };

  return (
    <div>
      <h1>This is admin page</h1>
      <div>
        <button onClick={() => goHomeHandler()}>Home</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: 'auto' }}>
        <div style={styleEmail}>
          <b>email</b>
        </div>
        <div style={fullname}>
          <b>Full Name</b>
        </div>
        <div style={role}>
          <b>Role</b>
        </div>
        <div style={deleteUsersMeals}>
          <b>Delete user's meals</b>
        </div>
        <div style={deleteUser}>
          <b>Delete User</b>
        </div>
      </div>
      {allUsers.map((user) => {
        return <User key={user.userID} user={user} setAllUsers={setAllUsers} />;
      })}
    </div>
  );
};
