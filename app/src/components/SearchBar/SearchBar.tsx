import React, { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../../types';
import { dispatchSearchUsers, dispatchClearUsers } from '../../actions/users';
import { State } from '../../store/configureStore';
import { useHistory } from "react-router-dom";

interface LinkDispatchProps {
  dispatchSearchUsers: (query: string) => void;
  dispatchClearUsers: () => void;
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
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchIconClick = () => {
    props.dispatchClearUsers();
    history.push(`/${searchValue}`, 'state');
  }

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleKeyPressed = (event: any) => {
    if (event.key === 'Enter') {
      handleSearchIconClick();
    }
  }

  return (
    <Grid item xs={12}>
      <FormControl fullWidth variant="outlined">
        <InputLabel classes={{ root: classes.root }} htmlFor="filled-adornment-password">Search</InputLabel>
        <OutlinedInput

          placeholder="Type a user name"
          id="search-input"
          type='text'
          value={searchValue}
          onChange={handleFormChange}
          onKeyPress={handleKeyPressed}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleSearchIconClick}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search"
        />
      </FormControl>
    </Grid>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Actions>): LinkDispatchProps => ({
  dispatchSearchUsers: bindActionCreators(dispatchSearchUsers, dispatch),
  dispatchClearUsers: bindActionCreators(dispatchClearUsers, dispatch)
});

export default connect(null, mapDispatchToProps)(SearchBar);