import { db } from '../Firebase';

export const deleteMeal = async (mealid) => {
  console.log(mealid);
  await db.collection('meals').doc(mealid).delete();
};
