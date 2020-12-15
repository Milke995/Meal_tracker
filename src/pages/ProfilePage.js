import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import { UploadAvatarButton } from '../components/UploadAvatarButton';
import fst from '../Firebase';
import { useHistory } from 'react-router-dom';

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
  //password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  FirstName: yup.string().min(1, "You can't have an empty name").required('First Name is required'),
  LastName: yup.string().min(1, 'Your Last Name cannot be empty').required('Your Last Name is required'),
});

export const ProfilePage = () => {
  const history = useHistory();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: fst.auth().currentUser.email,
      password: '',
      FirstName: fst.auth().currentUser.displayName.split(' ')[0],
      LastName: fst.auth().currentUser.displayName.split(' ')[1],
      YoB: '1995',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fst.auth().currentUser.updateProfile({
        displayName: values.FirstName + ' ' + values.LastName,
      });
    },
  });

  const backToHomeHandler = () => {
    history.goBack();
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

  const styles2 = {
    display: 'inline-block',
    paddingLeft: '0px',
    marginLeft: '20px',
    width: '100px',
    verticalAlign: 'middle',
  };

  return (
    <div style={styles}>
      <form onSubmit={formik.handleSubmit} className={classes.root} noValidate autoComplete="off">
        <div>
          <h1>Profile</h1>
        </div>
        <div>
          <TextField
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
            disabled
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
            disabled
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
        <div>
          <TextField
            style={styles2}
            id="outlined-number"
            label="Year of Birth"
            name="YoB"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue="1995"
            onChange={formik.handleChange}
            variant="outlined"
          />
          <UploadAvatarButton />
        </div>

        <Button color="primary" variant="contained" type="submit">
          Save Changes
        </Button>
        <Button color="secondary" variant="contained" type="button" onClick={() => backToHomeHandler()}>
          Back to Home
        </Button>
      </form>
    </div>
  );
};
