import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
// import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">Home</Button>
      </Link>
      <Link to="/settings" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="secondary">Settings</Button>
      </Link>
    </nav>
  );
};

export default Navigation;
