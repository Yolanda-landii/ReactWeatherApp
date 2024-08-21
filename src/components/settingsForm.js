import React, { Component } from 'react';

class SettingsForm extends Component {
  handleThemeChange = (e) => {
    this.props.setThemeMode(e.target.value);
  };

  handleUnitChange = (e) => {
    this.props.setUnit(e.target.value);
  };

  render() {
    const { themeMode, unit } = this.props;

    return (
      <div className="settings-form">
        <h2>Theme</h2>
        <select
          value={themeMode}
          onChange={this.handleThemeChange}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        
        <h2>Temperature Units</h2>
        <select
          value={unit}
          onChange={this.handleUnitChange}
        >
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
      </div>
    );
  }
}

export default SettingsForm;
