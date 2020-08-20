import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { UserType } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 50
        },
        number: {
            margin: 0,
            fontSize: 100,
            color: 'lightgrey'
        },
        caption: {
            textAlign: 'center'
        }
    }
    ))

interface EmptyResultProps {
    userType: UserType
}

const EmptyResult: React.FC<EmptyResultProps> = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <h1 className={classes.number}>0</h1>
            <h3 className={classes.caption}>We didn't find any {props.userType}</h3>
        </div>
    )
}

export default EmptyResult;