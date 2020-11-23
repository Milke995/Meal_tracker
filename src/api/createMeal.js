import fst, { db } from '../Firebase';

export const createMeal = async (props) => {
  const { title, ingredients, calories, date } = props;
  await db.collection('meals').add({ title, ingredients, calories, date, userID: fst.auth().currentUser.uid });
};
