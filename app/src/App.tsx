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
import { Button, Tabs, Tab, Hidden } from '@material-ui/core';
import { usersReducer } from './reducers/users';
import { connect } from 'react-redux';
import CustomTabs, { TabPosition } from './components/Tabs/CustomTabs';
import { TabPanel, TabContext } from '@material-ui/lab';

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
    },
    fullWidth: {
      width: '100%',
      maxWidth: 'none',
      fontFamily: 'Montserrat',
      color: 'primary'
      // justifyContent: 'left'
    },
    tabsContainer1: {
      marginRight: 20
    },
    tabsContainer2: {
      marginLeft: 20
    },
    wrapper: {
      justifyContent: 'normal',
      flexDirection: 'inherit'
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
          <SearchBar />
        </Grid>
        <Hidden smDown>
          <Grid item xs={6}>
            <CustomTabs
              tabElements={[{ label: 'Users' }]}
              position={TabPosition.Left}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTabs
              tabElements={[{ label: 'Companies' }]}
              position={TabPosition.Right}
            />
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid item xs={12}>
            <CustomTabs
              tabElements={[{ label: 'Users' }, { label: 'Companies' }]}
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state: State, ownProps: AppProps): LinkStateProps => ({
  users: state.users
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Actions>, ownProps: AppProps): LinkDispatchProps => ({
  dispatchSetUsers: bindActionCreators(dispatchSetUsers, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
