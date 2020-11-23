import { db } from '../Firebase';

export const deleteMeal = async (mealid) => {
  await db.collection('meals').doc(mealid).delete();
};
