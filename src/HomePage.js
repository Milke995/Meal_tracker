// @ts-nocheck
import React from 'react';
import { HomePageHeader } from './HomePageHeader';
import { Opcije } from './Opcije';
import { Meals } from './Meals';
import { getMeals } from './api/getMeals';
import fst from './Firebase';

export const HomePage = () => {
  const [meals, setMeals] = React.useState([]);
  const [dates, setDates] = React.useState([]);
  const [AllDates, setAllDates] = React.useState([]);

  let mappedMeals;

  React.useEffect(() => {
    const fetchData = async () => {
      const meals = await getMeals(fst.auth().currentUser.uid);
      setMeals(meals);
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
      console.log('a', mappedMeals);
      setDates(mappedMeals);
      setAllDates(mappedMeals);
    };
    fetchData();
  }, []);

  const filterDate = (date) => {
    if (dates) {
      if (date != '0') {
        // @ts-ignore
        const selectedDate = AllDates.find((d) => d.id == date);
        setDates([selectedDate]);
      } else {
        setDates(AllDates);
        console.log(AllDates);
      }
    }
  };

  const filterCalories = (calories) => {
    if (dates) {
      const filtrirani = AllDates.filter((date) => date.sum < calories);
      setDates(filtrirani);
    }
  };

  if (!meals) {
    return (
      <div>
        <HomePageHeader />
        <Opcije />
        <div style={{ textAlign: 'center' }}>Add your meals</div>
      </div>
    );
  }

  return (
    <div>
      <HomePageHeader />
      <Opcije mappedMeals={mappedMeals} filterDate={filterDate} filterCalories={filterCalories} />
      <Meals dates={dates} />
    </div>
  );
};
