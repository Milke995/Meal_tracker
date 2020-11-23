// @ts-nocheck
import React from 'react';
import { HomePageHeader } from './HomePageHeader';
import { Opcije } from '../../components/options/Opcije';
import { Meals } from '../../components/Meals';
import { getMeals } from '../../api/getMeals';
import fst from '../../Firebase';

export const HomePage = () => {
  const [meals, setMeals] = React.useState([]);
  const [filterByDate, setfilterByDate] = React.useState('0');
  const [filterByCalories, setFilterByCalories] = React.useState(Infinity);

  let mappedMeals;

  React.useEffect(() => {
    const fetchData = async () => {
      const meals = await getMeals(fst.auth().currentUser.uid);
      setMeals(meals);
    };
    fetchData();
  }, []);

  if (!meals) {
    return (
      <div>
        <HomePageHeader />
        <Opcije />
        <div style={{ textAlign: 'center' }}>
          <h1>Add your meals</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HomePageHeader />
      <Opcije
        mappedMeals={mappedMeals}
        setdatefilter={setfilterByDate}
        setCaloriesFilter={setFilterByCalories}
        setMeals={setMeals}
        meals={meals}
      />
      <Meals meals={meals} dateFilter={filterByDate} caloriesFilter={filterByCalories} setMeals={setMeals} />
    </div>
  );
};
