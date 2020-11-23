import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  //KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';

export const Kalendar = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString().slice(0, 10));
  };

  const styles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: '10px',
    marginLeft: '20px',
    marginRight: '20px',
  };

  return (
    <div style={styles}>
      <div style={{ marginRight: '20px' }}>Date:</div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="flex-start">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            //label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <div style={{ marginLeft: '20px' }}>
        <div>
          <Button
            style={{ width: '250px', marginLeft: '0px' }}
            color="secondary"
            variant="contained"
            onClick={() => props.filterDate(selectedDate)}>
            Filter by date
          </Button>
        </div>
        <Button
          style={{ width: '250px', marginLeft: '0px' }}
          color="primary"
          variant="contained"
          onClick={() => props.filterDate('0')}>
          Show all dates
        </Button>
      </div>
    </div>
  );
};
