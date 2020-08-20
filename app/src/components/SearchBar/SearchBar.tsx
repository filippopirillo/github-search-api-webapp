import React, { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Actions, basePath } from '../../types';
import { dispatchClearUsers } from '../../actions/users';
import { useHistory } from "react-router-dom";
import { dispatchClearCompanies } from '../../actions/companies';

interface LinkDispatchProps {
  dispatchClearCompanies: () => void;
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
  const regExp = new RegExp(`${basePath}(.*)`)
  const queryUrl = regExp.exec(history.location.pathname);
  const [searchValue, setSearchValue] = useState(queryUrl ? queryUrl[1] : '');

  const handleSearchIconClick = () => {
    if (history.location.pathname.slice(1) !== searchValue) {
      props.dispatchClearUsers();
      props.dispatchClearCompanies();
      history.push(`/${basePath}${searchValue}`);
    }
  }

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleKeyPressed = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSearchIconClick();
    }
  }

  return (
    <Grid item xs={12}>
      <FormControl fullWidth variant="outlined">
        <InputLabel classes={{ root: classes.root }}>Search</InputLabel>
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
  dispatchClearUsers: bindActionCreators(dispatchClearUsers, dispatch),
  dispatchClearCompanies: bindActionCreators(dispatchClearCompanies, dispatch)
});

export default connect(null, mapDispatchToProps)(SearchBar);