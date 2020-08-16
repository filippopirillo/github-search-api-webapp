import React, { useEffect } from 'react';
import { Hidden, Grid, CircularProgress, makeStyles, createStyles, Theme, Button } from '@material-ui/core';
import CustomTabs from '../Tabs/CustomTabs';
import ResultList, { ResultListItem } from '../List/ResultList';
import { State } from '../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { Actions, UserType } from '../../types';
import { User } from '../../types/User';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dispatchAddUsers, dispatchShowMore } from '../../actions/users';
import { Company } from '../../types/Company';
import { dispatchAddCompanies } from '../../actions/companies';
import EmptyResult from '../EmptyPage/EmptyResult';
import { CompanyState } from '../../reducers/companies';
import { UserState } from '../../reducers/users';
import { userInfo } from 'os';

interface LinkStateProps {
    userState: UserState;
    companyState: CompanyState
}

interface LinkDispatchProps {
    dispatchAddUsers: (query: string) => void;
    dispatchAddCompanies: (query: string) => void;
    dispatchShowMore: (query: string) => void;
}

interface DesktopPanelProps {
    type: UserType;
    list: ResultListItem[];
    hasBeenFetched: boolean;
    totalCount: number;
    hasNextPage: boolean;
    handleShowMore?: () => any;
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
    ))

type Props = LinkStateProps & LinkDispatchProps

const DesktopPanel: React.FC<DesktopPanelProps> = (props) => {

    const classes = useStyles();

    return (
        <Grid item container xs={6} classes={{ container: props.type == UserType.USER ? classes.leftPanel : classes.rightPanel }}>
            <Grid item xs={12}>
                <CustomTabs tabElements={[{ label: `${props.type}s (${props.totalCount})` }]}
                />
            </Grid>
            <Grid item xs={12}>
                {props.hasBeenFetched && props.list.length === 0 ?
                    <EmptyResult userType={props.type} /> :
                    <ResultList items={props.list} />
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
    )
}

const ResultPage: React.FC<Props> = (props) => {

    const classes = useStyles();
    const history = useHistory();
    const query = history.location.pathname.slice(1);

    useEffect(() => {
        props.dispatchAddUsers(query);
        props.dispatchAddCompanies(query);
    }, [query]);

    return (
        <>
            <Hidden smDown>
                <DesktopPanel
                    type={UserType.USER}
                    list={props.userState.users.map(user => ({ fullname: user.fullname, username: user.username, count: user.contributions, avatarUrl: user.avatarUrl }))}
                    handleShowMore={() => props.dispatchShowMore(query)}
                    hasBeenFetched={props.userState.hasBeenFetched}
                    hasNextPage={props.userState.hasNextPage}
                    totalCount={props.userState.totalCount}
                />
                <DesktopPanel
                    type={UserType.COMPANY}
                    list={props.companyState.companies.map(company => ({ fullname: company.fullname, username: company.username, count: company.people, avatarUrl: company.avatarUrl }))}
                    hasBeenFetched={props.companyState.hasBeenFetched}
                    hasNextPage={props.companyState.hasNextPage}
                    totalCount={props.companyState.totalCount}
                />
            </Hidden>
            <Hidden mdUp>
                <Grid item xs={12}>
                    <CustomTabs
                        tabElements={[{ label: 'Users' }, { label: 'Companies' }]}
                    />
                </Grid>
            </Hidden>
        </>
    )
}

const mapStateToProps = (state: State): LinkStateProps => ({
    userState: state.userState,
    companyState: state.companyState,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Actions>): LinkDispatchProps => ({
    dispatchAddUsers: bindActionCreators(dispatchAddUsers, dispatch),
    dispatchAddCompanies: bindActionCreators(dispatchAddCompanies, dispatch),
    dispatchShowMore: bindActionCreators(dispatchShowMore, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);