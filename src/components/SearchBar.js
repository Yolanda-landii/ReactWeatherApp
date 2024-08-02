import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    if (location.trim()) { // Check if the input is not empty
      onSearch(location);
    } else {
      alert('Please enter a location');
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar" style={{ display: 'flex', gap: '10px' }}>
      <TextField
        label="Search for a city..."
        variant="outlined"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ flexGrow: 1 }}
      />
      <Button variant="contained" color="primary" type="submit">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
