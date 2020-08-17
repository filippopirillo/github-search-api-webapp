import React from 'react';
import { UserType } from '../../types';
import ResultList, { ResultListItem } from '../List/ResultList';
import { Grid, CircularProgress, Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import EmptyResult from '../EmptyPage/EmptyResult';

export interface PanelProps {
    type: UserType;
    list: ResultListItem[];
    hasBeenFetched: boolean;
    totalCount: number;
    hasNextPage: boolean;
    handleShowMore?: () => any;
    display: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        leftPanel: {
            paddingRight: 20
        },
        rightPanel: {
            paddingLeft: 20
        },
        spinner: {
            display: 'flex',
            justifyContent: 'center'
        },
        showMoreButton: {
            marginTop: 10,
            fontFamily: 'Montserrat'
        }
    }
    ));

const Panel: React.FC<PanelProps> = (props) => {

    const classes = useStyles();

    return (
        <Grid item xs={12} container style={{display: props.display ? 'inherit' : 'none'}}>
            <Grid item xs={12}>
                {props.hasBeenFetched && props.list.length === 0 ?
                    <EmptyResult userType={props.type} /> :
                    <ResultList
                        items={props.list}
                        firstHeaderButtonLabel={props.type}
                        secondHeaderButtonLabel={props.type === UserType.USER ? 'Contributions' : 'People'} />
                }
            </Grid>
            <Grid item xs={12} container direction='column' alignContent='center'>
                {!props.hasBeenFetched &&
                    <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Grid>
                }
                {props.hasNextPage &&
                    <Grid item>
                        <Button
                            className={classes.showMoreButton}
                            onClick={props.handleShowMore}
                        >
                            Show More
                        </Button>
                    </Grid>
                }
            </Grid>
        </Grid>
    );
}

export default Panel;