import React from 'react';
import EditIcon from '@material-ui/icons/Edit';

export const Meal = (props) => {
  const editMealHandler = () => {
    console.log('mealid', props.mealid);
  };
  const meal = props.meal;
  const NoC = props.NoC;
  const ingredients = props.ingredients;

  return (
    <div>
      <ul>
        <li>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>
              {meal} - {ingredients}.&emsp; {NoC} kcal
            </div>
            <div>
              <EditIcon onClick={() => editMealHandler()}></EditIcon>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
