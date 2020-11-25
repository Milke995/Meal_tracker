import { db } from '../Firebase';
import { deleteAllUsersMeals } from './deleteAllUsersMeals';
import { getAllUsers } from './getAllUsers';

export const deleteUser = async (userID, setAllUsers) => {
  deleteAllUsersMeals(userID);
  const user = await db.collection('users').where('userID', '==', userID).get();
  let a = [];
  user.docs.map((doc) => a.push({ ...doc.data(), id: doc.id }));
  await db.collection('users').doc(a[0].id).delete();
  //admin.auth().deleteUser(userID);
  const users = await getAllUsers();
  setAllUsers(users);
};
