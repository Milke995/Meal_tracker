import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button } from '@material-ui/core';
import { createMeal } from '../api/createMeal';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  //KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  ingredients: yup.string().required('Ingredients are required'),
});

export const NewMeal = (props) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      ingredients: '',
      calories: 0,
      date: new Date().toISOString().slice(0, 10),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createMeal(values);
      props.closeHandler();
    },
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString().slice(0, 10));
    formik.values.date = date.toISOString().slice(0, 10);
    console.log(formik.values.date);
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          textAlign: 'center',
          margin: '20px',
        }}>
        {' '}
        <div style={{ margin: '15px' }}>
          <TextField
            required
            id="title"
            label="Title"
            variant="outlined"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </div>
        <div style={{ margin: '15px' }}>
          <TextField
            required
            id="ingredients"
            label="Ingredients"
            variant="outlined"
            name="ingredients"
            value={formik.values.ingredients}
            onChange={formik.handleChange}
            error={formik.touched.ingredients && Boolean(formik.errors.ingredients)}
            helperText={formik.touched.ingredients && formik.errors.ingredients}
          />
        </div>
        <div style={{ margin: '15px' }}>
          <TextField
            id="calories"
            name="calories"
            label="kcal"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.calories}
            variant="outlined"
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="center">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                name="date"
                //label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        <Button color="secondary" variant="contained" type="submit">
          Add a meal
        </Button>
      </div>
    </form>
  );
};
