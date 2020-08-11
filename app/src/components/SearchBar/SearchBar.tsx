import React, { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, makeStyles, Theme, createStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../../types';
import { dispatchSetUsers } from '../../actions/users';
import { State } from '../../store/configureStore';

interface LinkDispatchProps {
  dispatchSetUsers: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: "Montserrat"
    }
  }
  ))

const SearchBar: React.FC<LinkDispatchProps> = (props) => {

  const classes = useStyles();

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel classes={{ root: classes.root }} htmlFor="filled-adornment-password">Search</InputLabel>
      <OutlinedInput

        placeholder="Type a user name"
        id="search-input"
        type='text'
        // value={props.searchBarState.value}
        // onChange={e => props.setValue(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={props.dispatchSetUsers}
              edge="end"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label="Search"
      />
    </FormControl>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Actions>): LinkDispatchProps => ({
  dispatchSetUsers: bindActionCreators(dispatchSetUsers, dispatch)
});

export default connect(null, mapDispatchToProps)(SearchBar);