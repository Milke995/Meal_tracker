import React, { useState } from 'react';
import { Meal } from '../Meal';

export const Day = (props) => {
  const { datestring, meals } = props;
  const [visible, setVisible] = useState(false);

  const d = new Date(datestring);
  const weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const DayName = weekday[d.getDay()];

  // let total = 0;
  // meals.map((meal) => {
  //   return (total = total + meal.calories);
  // });
  const style2 = {
    display: 'flex',
    flexDirection: 'row',
    border: '3px solid black',
    paddingLeft: '40px',
    paddingRight: '40px',
    height: '80px',
    width: '400px',
    margin: 'auto',
    marginBottom: '0px',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  if (!visible) {
    style2.backgroundColor = 'salmon';
  } else {
    style2.backgroundColor = '#33E88D';
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
          {DayName}, {datestring}
        </div>
        <div>Total Calories: {props.total}</div>
        <div>
          <button type="button" onClick={() => setVisible(!visible)}>
            Show More
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
                  width: '402px',
                  border: '2px solid blue',
                  paddingLeft: '40px',
                  paddingRight: '40px',
                }}>
                <Meal meal={meal.title} ingredients={meal.ingredients} NoC={meal.calories} mealid={meal.mealid} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
