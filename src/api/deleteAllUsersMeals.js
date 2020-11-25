import { db } from '../Firebase';
import { deleteMeal } from './deleteMeal';

export const deleteAllUsersMeals = async (userID) => {
  const data = await db.collection('meals').where('userID', '==', userID).get();
  let a = [];
  data.docs.map((doc) => a.push({ ...doc.data(), mealid: doc.id }));
  a.forEach((meal) => deleteMeal(meal.mealid));
};
