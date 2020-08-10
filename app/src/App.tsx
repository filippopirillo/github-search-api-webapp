import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import SearchBar from './components/SearchBar/SearchBar';

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

const App = () => {

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

export default App;
