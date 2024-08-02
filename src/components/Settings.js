import React from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Settings = ({ themeMode, onThemeChange, unit, onUnitChange }) => {
  return (
    <div>
      <h2>Settings</h2>
      <Button variant="contained" onClick={() => onThemeChange(themeMode === 'light' ? 'dark' : 'light')}>
        Toggle Theme (Current: {themeMode})
      </Button>
      <FormControl variant="outlined" style={{ marginTop: '20px' }}>
        <InputLabel>Units</InputLabel>
        <Select value={unit} onChange={(e) => onUnitChange(e.target.value)}>
          <MenuItem value="metric">Celsius</MenuItem>
          <MenuItem value="imperial">Fahrenheit</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Settings;
