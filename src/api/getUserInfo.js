import { db } from '../Firebase';

export const getUserInfo = async (userID) => {
  const user = await db.collection('users').where('userID', '==', userID).get();
  user.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  if (!user.docs[0]) {
    return 0;
  } else {
    return user.docs[0].data();
  }
};
