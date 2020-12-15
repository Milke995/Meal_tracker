// @ts-nocheck
import React from 'react';
import { HomePageHeader } from './HomePageHeader';
import { Opcije } from '../../components/options/Opcije';
import { Meals } from '../../components/Meals';
import { getMeals } from '../../api/getMeals';
import fst from '../../Firebase';
import { getUserInfo } from '../../api/getUserInfo';

export const HomePage = () => {
  const [meals, setMeals] = React.useState([]);
  const [filterByDate, setfilterByDate] = React.useState('0');
  const [filterByCalories, setFilterByCalories] = React.useState(Infinity);
  const [userInfo, setUserInfo] = React.useState();

  let mappedMeals;

  React.useEffect(() => {
    const fetchData = async () => {
      const meals = await getMeals(fst.auth().currentUser.uid);
      setMeals(meals);
      const userInfo = await getUserInfo(fst.auth().currentUser.uid);
      setUserInfo(userInfo);
    };
    fetchData();
  }, []);

  if (userInfo === 0) {
    return (
      <div style={{ margin: 'auto', textAlign: 'center', verticalAlign: 'middle', height: '100%' }}>
        <h1>This account has been disabled</h1>
        <button onClick={() => fst.auth().signOut()}>Sign Out</button>
      </div>
    );
  }

  if (!meals) {
    return (
      <div>
        <HomePageHeader userInfo={userInfo} />
        <Opcije />
        <div style={{ textAlign: 'center' }}>
          <h1>Add your meals</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HomePageHeader userInfo={userInfo} />
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
