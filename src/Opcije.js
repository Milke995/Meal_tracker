import React from 'react';
import { Kalendar } from './Kalendar';
import { BrojKalorija } from './BrojKalorija';
import { NewMealButton } from './components/NewMealButton';

export const Opcije = (props) => {
  const styles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    valign: 'middle',
    width: 'fullwidth',
    border: '3px solid black',
    backgroundColor: 'white',
    margin: '80px',
    marginBottom: '20px',
    marginTop: '40px',
    paddingLeft: '10px',
    paddingTop: '20px',
    paddingBottom: '20px',
  };

  return (
    <div style={styles}>
      <Kalendar filterDate={props.filterDate} />
      <BrojKalorija filterCalories={props.filterCalories} />
      <NewMealButton />
    </div>
  );
};
