import React, { useEffect } from 'react';
import { Hidden, Grid, CircularProgress, makeStyles, createStyles, Theme } from '@material-ui/core';
import CustomTabs from '../Tabs/CustomTabs';
import ResultList from '../List/ResultList';
import { State } from '../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { Actions, UserType } from '../../types';
import { User } from '../../types/User';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dispatchAddUsers } from '../../actions/users';
import { Company } from '../../types/Company';
import { dispatchAddCompanies } from '../../actions/companies';
import EmptyResult from '../EmptyPage/EmptyResult';

interface ResultPageProps {

}

interface LinkStateProps {
    users: User[];
    isFinishLoadingUsers: boolean;
    companies: Company[];
    isFinishLoadingCompanies: boolean;
}

interface LinkDispatchProps {
    dispatchAddUsers: (query: string) => void;
    dispatchAddCompanies: (query: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spinner: {
            margin: 'auto'
        }
    }
    ))

type Props = ResultPageProps & LinkStateProps & LinkDispatchProps

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
                <Grid container xs={6} justify='center' style={{ paddingRight: 20 }}>
                    <Grid item xs={12}>
                        <CustomTabs tabElements={[{ label: 'Users' }]} />
                    </Grid>
                    {!props.isFinishLoadingUsers ?
                        <Grid item xs={1} style={{ marginTop: 20 }}>
                            <CircularProgress />
                        </Grid>
                        :
                        <Grid item xs={12}>
                            {props.users.length == 0 ? 
                            <EmptyResult userType={UserType.USER}/> : 
                            <ResultList items={props.users.map(user => ({ fullname: user.fullname, username: user.username, count: user.contribuitions }))} />
                            }
                        </Grid>
                    }
                </Grid>
                <Grid item container xs={6} justify='center' style={{ paddingLeft: 20 }}>
                    <Grid item xs={12}>
                        <CustomTabs tabElements={[{ label: 'Companies' }]}
                        />
                    </Grid>
                    {!props.isFinishLoadingUsers ?
                        <Grid item xs={1} style={{ marginTop: 20 }}>
                            <CircularProgress />
                        </Grid>
                        :
                        <Grid item xs={12}>
                            {props.companies.length == 0 ? 
                            <EmptyResult userType={UserType.COMPANY}/> : 
                            <ResultList items={props.companies.map(company => ({ fullname: company.fullname, username: company.username, count: company.people }))} />
                            }
                        </Grid>
                    }
                </Grid>
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

const mapStateToProps = (state: State, ownProps: ResultPageProps): LinkStateProps => ({
    users: state.userState.users,
    isFinishLoadingUsers: state.userState.hasBeenFetched,
    companies: state.companyState.companies,
    isFinishLoadingCompanies: state.companyState.hasBeenFetched,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Actions>): LinkDispatchProps => ({
    dispatchAddUsers: bindActionCreators(dispatchAddUsers, dispatch),
    dispatchAddCompanies: bindActionCreators(dispatchAddCompanies, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);