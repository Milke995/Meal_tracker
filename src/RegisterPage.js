import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import fst from './Firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
}));

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  FirstName: yup.string().min(1, "You can't have an empty name").required('First Name is required'),
  LastName: yup.string().min(1, 'Your Last Name cannot be empty').required('Your Last Name is required'),
});

export const RegisterPage = () => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      FirstName: '',
      LastName: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleSignUp();
    },
  });

  const handleSignUp = async () => {
    const { email, password, FirstName, LastName } = formik.values;
    try {
      await fst.auth().createUserWithEmailAndPassword(email, password);
      const user = fst.auth().currentUser;
      user.updateProfile({
        displayName: [FirstName, LastName].join(' '),
        photoURL:
          'https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg',
      });
    } catch (error) {
      alert(error);
    }
  };

  const styles = {
    textAlign: 'center',
    padding: '20px',
    paddingBottom: '40px',
    border: '2px solid black',
    margin: 'auto',
    marginTop: '100px',
    marginBottom: '100px',
    width: '500px',
  };

  return (
    <div style={styles}>
      <form onSubmit={formik.handleSubmit} className={classes.root} noValidate autoComplete="off">
        <div>
          <h1>Sign Up</h1>
        </div>
        <div>
          <TextField
            required
            id="name"
            label="First Name"
            variant="outlined"
            name="FirstName"
            value={formik.values.FirstName}
            onChange={formik.handleChange}
            error={formik.touched.FirstName && Boolean(formik.errors.FirstName)}
            helperText={formik.touched.FirstName && formik.errors.FirstName}
          />
        </div>
        <div>
          <TextField
            required
            id="LastName"
            label="Last Name"
            variant="outlined"
            name="LastName"
            value={formik.values.LastName}
            onChange={formik.handleChange}
            error={formik.touched.LastName && Boolean(formik.errors.LastName)}
            helperText={formik.touched.LastName && formik.errors.LastName}
          />
        </div>
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
        <Button color="primary" variant="contained" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};
