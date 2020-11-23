import { db } from '../Firebase';

export const updateMeal = async (props) => {
  await db.collection('meals').doc(props.id).update({
    title: props.title,
    calories: props.calories,
    ingredients: props.ingredients,
  });
};
