import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import * as yup from 'yup';
import React from 'react';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import fst from '../Firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  dialogPaper: {
    height: '300px',
    width: '700px',
    alignItems: 'center',
  },
}));

const validationSchema = yup.object({
  link: yup.string().required('link is required'),
});

export const UploadAvatarButton = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickHandler = () => {
    console.log(formik.values.link);
    fst.auth().currentUser.updateProfile({
      photoURL: formik.values.link,
    });
  };

  const formik = useFormik({
    initialValues: {
      link: fst.auth().currentUser.photoURL,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      clickHandler();
      handleClose();
    },
  });

  return (
    <div>
      <button onClick={handleOpen}>Upload Avatar</button>
      <div style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title">
          <form onSubmit={formik.handleSubmit} className={classes.root} noValidate autoComplete="off">
            <DialogTitle id="form-dialog-title">Upload your avatar</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter a ling to your avatar image</DialogContentText>
              <TextField
                required
                id="link"
                label="link to your avatar image"
                variant="outlined"
                name="link"
                style={{ width: '500px' }}
                value={formik.values.link}
                onChange={formik.handleChange}
                error={formik.touched.link && Boolean(formik.errors.link)}
                helperText={formik.touched.link && formik.errors.link}
              />
            </DialogContent>
            <Button
              style={{
                width: '200px',
              }}
              color="secondary"
              variant="contained"
              type="submit">
              Upload
            </Button>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
};
