import React from 'react';
import { Day } from './Day';

export const Meals = (props) => {
  let mappedMeals;
  let mappedByDate;
  let mappedByCalories;
  const meals = props.meals;
  const dateFilter = props.dateFilter;
  const setMeals = props.setMeals;
  const caloriesFilter = props.caloriesFilter;

  meals.sort((a, b) => (a.date < b.date ? 1 : -1));
  mappedMeals = meals.reduce((a, { date, title, ingredients, calories, id: mealid }) => {
    const foundDate = a.find(({ id }) => id === date);
    if (foundDate) foundDate.obroci.push({ title, ingredients, calories, mealid });
    else a.push({ id: date, obroci: [{ title, ingredients, calories, mealid }], sum: 0 });

    return a;
  }, []);
  mappedMeals.forEach((date) => {
    date.obroci.forEach((meal) => {
      date.sum = date.sum + meal.calories;
    });
  });

  if (caloriesFilter != Infinity) {
    mappedByCalories = mappedMeals.filter((date) => date.sum < caloriesFilter);
    if (!mappedByCalories) {
      return <div style={{ textAlign: 'center' }}>There are no meals :)</div>;
    } else {
      return (
        <div>
          {mappedByCalories.map((date) => {
            return <Day key={date.id} datestring={date.id} meals={date.obroci} total={date.sum} setMeals={setMeals} />;
          })}
        </div>
      );
    }
  }

  if (dateFilter != '0') {
    mappedByDate = mappedMeals.find((day) => day.id == dateFilter);
    if (!mappedByDate) {
      return <div style={{ textAlign: 'center' }}>There are no meals for that day :)</div>;
    } else {
      return (
        <Day
          key={mappedByDate.id}
          datestring={mappedByDate.id}
          meals={mappedByDate.obroci}
          total={mappedByDate.sum}
          setMeals={setMeals}
        />
      );
    }
  } else {
    mappedByDate = mappedMeals;

    return (
      <div>
        {mappedByDate.map((date) => {
          return <Day key={date.id} datestring={date.id} meals={date.obroci} total={date.sum} setMeals={setMeals} />;
        })}
      </div>
    );
  }
};
