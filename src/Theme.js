import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
    },
    typography: {
      fontFamily: 'Roboto, Arial',
    },
  });
};

export default getTheme;
