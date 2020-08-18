import React from 'react';
import { Grid, Theme } from '@material-ui/core';
import { UserType } from '../../types';
import Panel from '../Panel/Panel';
import { ViewProps } from '.';
import DesktopTabs from '../Tabs/DesktopTabs';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        leftContainer: {
            paddingRight: 20
        },
        rightContainer: {
            paddingLeft: 20
        }
    })
)

const DesktopView: React.FC<ViewProps> = (props) => {

    const classes = useStyles();

    return (
        <Grid item xs={12} container>
            <Grid item xs={6} className={classes.leftContainer}>
                <DesktopTabs
                    label={`${UserType.USERS} (${props.userState.totalCount})`}
                />
                <Panel
                    type={UserType.USER}
                    list={props.userState.users.map(user => ({ fullname: user.fullname, username: user.username, count: user.contributions, avatarUrl: user.avatarUrl }))}
                    handleShowMore={() => props.dispatchShowMoreUsers(props.query)}
                    hasBeenFetched={props.userState.hasBeenFetched}
                    hasNextPage={props.userState.hasNextPage}
                    totalCount={props.userState.totalCount}
                    display
                    error={props.userState.error}
                />
            </Grid>
            <Grid item xs={6} className={classes.rightContainer}>
                <DesktopTabs
                    label={`${UserType.COMPANIES} (${props.companyState.totalCount})`}
                />
                <Panel
                    type={UserType.COMPANY}
                    list={props.companyState.companies.map(company => ({ fullname: company.fullname, username: company.username, count: company.people, avatarUrl: company.avatarUrl }))}
                    handleShowMore={() => props.dispatchShowMoreCompanies(props.query)}
                    hasBeenFetched={props.companyState.hasBeenFetched}
                    hasNextPage={props.companyState.hasNextPage}
                    totalCount={props.companyState.totalCount}
                    display
                    error={props.companyState.error}
                />
            </Grid>
        </Grid>
    );
}

export default DesktopView;