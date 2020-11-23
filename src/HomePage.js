// @ts-nocheck
import React from 'react';
import { HomePageHeader } from './HomePageHeader';
import { Opcije } from './Opcije';
import { Meals } from './Meals';
import { getMeals } from './api/getMeals';
import fst from './Firebase';

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

  // const filterDate = (date) => {
  //   if (dates) {
  //     if (date != '0') {
  //       // @ts-ignore
  //       const selectedDate = AllDates.find((d) => d.id == date);
  //       setDates([selectedDate]);
  //     } else {
  //       setDates(AllDates);
  //       console.log(AllDates);
  //     }
  //   }
  // };

  // const filterCalories = (calories) => {
  //   if (dates) {
  //     const filtrirani = AllDates.filter((date) => date.sum < calories);
  //     setDates(filtrirani);
  //   }
  // };

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
      <Opcije mappedMeals={mappedMeals} setdatefilter={setfilterByDate} setCaloriesFilter={setFilterByCalories} />
      <Meals meals={meals} dateFilter={filterByDate} caloriesFilter={filterByCalories} />
    </div>
  );
};
