import React from 'react';
import SettingsForm from '../components/settingsForm';

const Settings = ({ themeMode, setThemeMode, unit, setUnit }) => {
  return (
    <div className="container">
      <h1>Settings</h1>
      <SettingsForm themeMode={themeMode} setThemeMode={setThemeMode} unit={unit} setUnit={setUnit} />
    </div>
  );
};

export default Settings;
