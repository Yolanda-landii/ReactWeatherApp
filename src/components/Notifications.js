import React from 'react';
import { Snackbar } from '@mui/material';

const WeatherAlert = () => {
  // Placeholder for weather alert logic
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      message="Severe weather alert!"
      autoHideDuration={6000}
    />
  );
};

export default WeatherAlert;
