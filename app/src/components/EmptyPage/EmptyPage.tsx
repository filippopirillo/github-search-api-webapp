import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 50
        },
        icon: {
            width: 180,
            height: 180,
            color: 'lightgrey'
        },
        caption: {
            textAlign: 'center'
        }
    }
    ))

const EmptyPage: React.FC = () => {

    const classes = useStyles();

    return (
        <Grid item xs={12} className={classes.container}>
            <SearchIcon id='search-icon' className={classes.icon} />
            <h3 id='empty-page-desc' className={classes.caption}>Enter a name or company you are looking for.</h3>
        </Grid>
    )
}

export default EmptyPage;