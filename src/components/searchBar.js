import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    };
  }

  handleSearch = () => {
    this.props.onSearch(this.state.location);
    this.setState({ location: '' });
  };

  handleChange = (event) => {
    this.setState({ location: event.target.value });
  };

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          value={this.state.location}
          onChange={this.handleChange}
          placeholder="Search for a location"
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
