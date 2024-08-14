import React from 'react';

const SavedLocations = ({ locations, onLocationSelect }) => {
  return (
    <div className="saved-locations">
      <h2>Saved Locations</h2>
      <ul>
        {locations.map((location, index) => (
          <li key={index} onClick={() => onLocationSelect(location)}>
            {location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedLocations;
