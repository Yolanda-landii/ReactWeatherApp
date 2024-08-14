import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Navigation from './components/navigation';
import './App.css';

const App = () => {
  const [themeMode, setThemeMode] = useState('light');
  const [unit, setUnit] = useState('metric');
  const [view, setView] = useState('daily');

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className={`app-container ${themeMode === 'light' ? 'light-mode' : 'dark-mode'}`}>
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  unit={unit}
                  setUnit={setUnit}
                  view={view}
                  setView={setView}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <Settings
                  themeMode={themeMode}
                  setThemeMode={setThemeMode}
                  unit={unit}
                  setUnit={setUnit}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
