import { TextField } from '@material-ui/core';
import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button } from '@material-ui/core';
import { updateMeal } from '../api/updateMeal';
import { getMeals } from '../api/getMeals';
import fst from '../Firebase';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  ingredients: yup.string().required('Ingredients are required'),
  calories: yup.number().min(1, "can't be less than 1"),
});

export const EdittingMeal = (props) => {
  const formik = useFormik({
    initialValues: {
      title: props.meal,
      ingredients: props.ingredients,
      calories: props.NoC,
      date: props.date,
      id: props.mealid,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await updateMeal(values);
      const updatedMeals = await getMeals(fst.auth().currentUser.uid);
      props.setMeals(updatedMeals);
      props.closeHandler();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
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
            error={formik.touched.calories && Boolean(formik.errors.calories)}
            helperText={formik.touched.calories && formik.errors.calories}
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button color="secondary" variant="contained" type="submit">
            Save changes
          </Button>
        </div>
      </div>
    </form>
  );
};
