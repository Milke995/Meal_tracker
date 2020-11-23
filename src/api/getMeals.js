import { db } from '../Firebase';

export const getMeals = async (userID) => {
  const data = await db.collection('meals').where('userID', '==', userID).get();

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
