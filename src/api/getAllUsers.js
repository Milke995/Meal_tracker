import { db } from '../Firebase';

export const getAllUsers = async () => {
  const allUsers = await db.collection('users').get();

  return allUsers.docs.map((doc) => ({ ...doc.data(), docid: doc.id }));
};
