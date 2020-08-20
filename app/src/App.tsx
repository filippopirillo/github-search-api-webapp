import React from 'react';
import Header from './components/Header/Header';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import SearchBar from './components/SearchBar/SearchBar';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import EmptyPage from './components/EmptyPage/EmptyPage';
import ResultPage from './components/ResultPage/ResultPage';
import { basePath } from './types';

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

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid alignItems='flex-start' container spacing={0}>
        <Header />
        <SearchBar />
        <Switch>
          <Route exact path={`/${basePath}:query`} render={() => <ResultPage />} />
          <Route exact path={`/${basePath}`} render={() => <EmptyPage />} />
          <Route path='/' render={() => <Redirect to={`/${basePath}`} />} />
        </Switch>
      </Grid>
    </div>
  );
}

export default App;
