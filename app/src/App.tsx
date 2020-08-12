import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import SearchBar from './components/SearchBar/SearchBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import EmptyPage from './components/EmptyPage/EmptyPage';
import ResultPage from './components/ResultPage/ResultPage';

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
      <Router>
        <Grid justify='center' style={{ display: 'flex' }} container spacing={0}>
          <Header />
          <SearchBar />
          <Switch>
            <Route exact path='/' render={() => <EmptyPage />}/>
            <Route exact path='/:query' render={() => <ResultPage />}/>
          </Switch>
        </Grid>
      </Router>
    </div>
  );
}

export default App;
