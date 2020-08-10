import React from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = () => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="filled-adornment-password">Search</InputLabel>
      <OutlinedInput

        placeholder="Type a user name"
        id="search-input"
        type='text'
        // value={props.searchBarState.value}
        // onChange={e => prokps.setValue(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              // onClick={props.setValue}
              edge="end"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        labelWidth={50}
      />
    </FormControl>
  )
}

export default SearchBar;