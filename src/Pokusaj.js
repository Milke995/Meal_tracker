import React from 'react';
import { getMeals } from './api/getMeals';

export const Pokusaj = () => {
  const [meals, setMeals] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const meals = await getMeals(1);
      setMeals(meals);
    };
    fetchData();
  }, []);

  if (!meals) {
    return <></>;
  }

  return (
    <ul>
      {meals.map((meals) => (
        <li key={meals.id}>
          {meals.title} - {meals.ingredients}&emsp; {meals.calories}kcal .&emsp; Date: {meals.date}
        </li>
      ))}
    </ul>
  );
};
