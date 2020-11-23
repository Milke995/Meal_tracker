import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import fst from '../Firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
}));

const toRegisterHandler = () => {
  window.location.href = 'http://localhost:3000/register';
};

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

export const LoginPage = () => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleLogin();
    },
  });
  const handleLogin = async () => {
    const { email, password } = formik.values;
    try {
      await fst.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  const styles = {
    margin: 'auto',
    marginTop: '100px',
    textAlign: 'center',
    border: '3px solid black',
    width: '420px',
    padding: '40px',
  };
  const btnSt = {
    margin: '10px',
  };

  return (
    <div style={styles}>
      <h1>Sign In</h1>
      <form onSubmit={formik.handleSubmit} className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            required
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div>
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <Button style={btnSt} color="primary" variant="contained" type="submit">
          Sign in
        </Button>
        or
        <Button style={btnSt} color="primary" variant="contained" onClick={() => toRegisterHandler()}>
          Sign up
        </Button>
      </form>
    </div>
  );
};
