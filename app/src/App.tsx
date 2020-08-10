import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import SearchBar from './components/SearchBar/SearchBar';
import { User } from './types/User';
import { State } from './store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from './types';
import { bindActionCreators } from 'redux';
import { dispatchSetUsers } from './actions/users';
import { Button } from '@material-ui/core';
import { usersReducer } from './reducers/users';
import { connect } from 'react-redux';

interface AppProps {

}

interface LinkStateProps {
  users: User[]
}

interface LinkDispatchProps {
  dispatchSetUsers: () => void
}

type Props = AppProps & LinkStateProps & LinkDispatchProps

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      [theme.breakpoints.down('md')]: {
        paddingTop: 20,
        paddingBottom: 20,
        width: '90%',
        margin: 'auto'
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: 100,
        paddingBottom: 100,
        width: 900,
        margin: 'auto'
      }
    }
  }
  ))

const App: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid justify='center' style={{ display: 'flex' }} container spacing={0}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <SearchBar/>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state: State, ownProps: AppProps): LinkStateProps => ({
  users: state.users
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any,any, Actions>, ownProps: AppProps): LinkDispatchProps => ({
  dispatchSetUsers: bindActionCreators(dispatchSetUsers, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
