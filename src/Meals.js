import React from 'react';
import { Day } from './components/Day';

export const Meals = (props) => {
  const dates = props.dates;

  return (
    <div>
      {dates.map((date) => {
        return <Day key={date.id} datestring={date.id} meals={date.obroci} total={date.sum} />;
      })}
    </div>
  );
};
