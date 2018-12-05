import React from 'react';
import PropTypes from 'prop-types'; 

import TextField from '@material-ui/core/TextField';
import './SearchBar.scss';

const SearchBar = (props) => {
  console.log('props: ', props);
  return (
    <TextField
      name="query"
      id="search-input"
      label="Search repositories"
      margin="normal"
      variant="outlined"
      className="search-bar"
      value={props.query}
      onChange={props.onChange}
    />
  )
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;