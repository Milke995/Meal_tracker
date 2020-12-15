import React, { useState } from 'react';
import { Meal } from './Meal';

export const Day = (props) => {
  const { datestring, meals } = props;
  const [visible, setVisible] = useState(false);

  const d = new Date(datestring);
  const weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const DayName = weekday[d.getDay()];
  let text;
  const dateform = datestring.split('-');

  const style2 = {
    display: 'flex',
    flexDirection: 'row',
    border: '3px solid black',
    paddingLeft: '40px',
    paddingRight: '40px',
    height: '80px',
    width: '450px',
    margin: 'auto',
    marginBottom: '0px',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  if (!visible) {
    style2.backgroundColor = 'salmon';
    text = 'Show more';
  } else {
    style2.backgroundColor = '#33E88D';
    text = 'Show less';
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        // height: "150px",
        width: '450px',
        alignItems: 'top',
        justifyContent: 'flex-start',
        marginBottom: '20px',
      }}>
      <div style={style2}>
        <div
          style={{
            marginRight: '0px',
          }}>
          {DayName}, {dateform[2]}.{dateform[1]}.{dateform[0]}.
        </div>
        <div>Total Calories: {props.total}</div>
        <div>
          <button type="button" onClick={() => setVisible(!visible)}>
            {text}
          </button>
        </div>
      </div>
      {visible && (
        <div>
          {meals.map((meal) => {
            return (
              <div
                key={meal.title}
                style={{
                  backgroundColor: '#F8E390',
                  width: '452px',
                  border: '2px solid blue',
                  paddingLeft: '40px',
                  paddingRight: '40px',
                }}>
                <Meal
                  meal={meal.title}
                  ingredients={meal.ingredients}
                  NoC={meal.calories}
                  mealid={meal.mealid}
                  date={datestring}
                  setMeals={props.setMeals}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
