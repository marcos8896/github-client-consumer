import React from 'react';
import PropTypes from 'prop-types'; 

import TextField from '@material-ui/core/TextField';
import './SearchBar.scss';

const SearchBar = props => (
  <TextField
    id="search-input"
    label="Search repositories"
    margin="normal"
    variant="outlined"
    className="search-bar"
    onChange={props.onChangeQuery}
  />
);

SearchBar.propTypes = {
  onChangeQuery: PropTypes.func.isRequired,
};

export default SearchBar;