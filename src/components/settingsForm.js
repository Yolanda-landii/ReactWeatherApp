import React from 'react';

const SettingsForm = ({ themeMode, setThemeMode, unit, setUnit }) => {
  return (
    <div className="settings-form">
      <h2>Theme</h2>
      <select
        value={themeMode}
        onChange={(e) => setThemeMode(e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      
      <h2>Temperature Units</h2>
      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="metric">Celsius</option>
        <option value="imperial">Fahrenheit</option>
      </select>
    </div>
  );
};

export default SettingsForm;
