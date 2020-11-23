import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { EdittingMeal } from './EdittingMeal';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import { getMeals } from '../api/getMeals';
import fst from '../Firebase';
import { deleteMeal } from '../api/deleteMeal';

const HoverButton = styled.div`
  :hover {
    cursor: pointer;
    background-color: #9ca7b8;
  }
`;

export const Meal = (props) => {
  const mealid = props.mealid;
  const meal = props.meal;
  const NoC = props.NoC;
  const ingredients = props.ingredients;
  const date = props.date;
  const setMeals = props.setMeals;
  const [open, setOpen] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenSecond = () => {
    setOpenSecond(true);
  };

  const handleClose2 = () => {
    setOpenSecond(false);
  };

  const deleteMealHandler = async (mealid) => {
    await deleteMeal(mealid);
    const updatedMeals = await getMeals(fst.auth().currentUser.uid);
    props.setMeals(updatedMeals);
    handleClose2();
  };

  return (
    <div>
      <ul>
        <li>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>
              {meal} - {ingredients}.&emsp; {NoC} kcal
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <HoverButton>
                <EditIcon onClick={() => handleOpen()}></EditIcon>
              </HoverButton>
              <HoverButton>
                <DeleteIcon onClick={() => handleOpenSecond()}></DeleteIcon>
              </HoverButton>
            </div>
          </div>
        </li>
      </ul>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit your meal</DialogTitle>
        <DialogContent>
          <DialogContentText>Change informations regarding your meal:</DialogContentText>
          <EdittingMeal
            mealid={mealid}
            meal={meal}
            NoC={NoC}
            ingredients={ingredients}
            date={date}
            closeHandler={handleClose}
            setMeals={setMeals}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openSecond} onClose={handleClose2} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Are you sure you want to delete your meal?</DialogTitle>
        <Button
          style={{ width: '100px', margin: 'auto' }}
          color="secondary"
          variant="contained"
          onClick={() => deleteMealHandler(mealid)}>
          Delete
        </Button>
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
