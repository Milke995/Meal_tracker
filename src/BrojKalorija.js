import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  calories: yup.number().min(1, 'At least'),
});

const styles = {
  paddingLeft: '0px',
  marginLeft: '0px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const styles2 = {
  paddingLeft: '0px',
  marginLeft: '10px',
  width: '100px',
  marginRight: '25px',
};

export const BrojKalorija = (props) => {
  const formik = useFormik({
    initialValues: {
      calories: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.setCaloriesFilter(values.calories);
      props.setdatefilter('0');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
      <div style={styles}>
        <div>
          <h4>Granica Kalorija:</h4>
        </div>
        <TextField
          style={styles2}
          id="outlined-number"
          label="kcal"
          type="number"
          name="calories"
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.calories}
          onChange={formik.handleChange}
          variant="outlined"
        />
        <Button type="submit" color="secondary" variant="contained">
          Filter by calories
        </Button>
      </div>
    </form>
  );
};
