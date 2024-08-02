import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const SavedLocations = ({ onLocationSelect }) => {
  const savedLocations = JSON.parse(localStorage.getItem('savedLocations')) || [];

  return (
    <List>
      {savedLocations.map((location, index) => (
        <ListItem button key={index} onClick={() => onLocationSelect(location)}>
          <ListItemText primary={location} />
        </ListItem>
      ))}
    </List>
  );
};

export default SavedLocations;
