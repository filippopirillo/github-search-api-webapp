import React, { useEffect } from 'react';
import { Hidden } from '@material-ui/core';
import { State } from '../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { Actions, UserType } from '../../types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dispatchAddUsers, dispatchShowMoreUsers } from '../../actions/users';
import { dispatchAddCompanies, dispatchShowMoreCompanies } from '../../actions/companies';
import { CompanyState } from '../../reducers/companies';
import { UserState } from '../../reducers/users';
import MobileView from '../View/MobileView';
import DesktopView from '../View/DesktopView';

interface LinkStateProps {
    userState: UserState;
    companyState: CompanyState;
}

interface LinkDispatchProps {
    dispatchAddUsers: (query: string) => void;
    dispatchAddCompanies: (query: string) => void;
    dispatchShowMoreUsers: (query: string) => void;
    dispatchShowMoreCompanies: (query: string) => void;
}

type Props = LinkStateProps & LinkDispatchProps

const ResultPage: React.FC<Props> = (props) => {

    const history = useHistory();
    const query = history.location.pathname.slice(1);

    useEffect(() => {
        props.dispatchAddUsers(query);
        props.dispatchAddCompanies(query);
    }, [query]);

    return (
        <>
            <Hidden smDown>
                <DesktopView
                    companyState={props.companyState}
                    userState={props.userState}
                    dispatchShowMoreUsers={props.dispatchShowMoreUsers}
                    dispatchShowMoreCompanies={props.dispatchShowMoreCompanies}
                    query={query}
                />
            </Hidden>
            <Hidden mdUp>
                <MobileView
                    query={query}
                    userState={props.userState}
                    companyState={props.companyState}
                    dispatchShowMoreUsers={props.dispatchShowMoreUsers}
                    dispatchShowMoreCompanies={props.dispatchShowMoreCompanies}
                />
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
    dispatchShowMoreUsers: bindActionCreators(dispatchShowMoreUsers, dispatch),
    dispatchShowMoreCompanies: bindActionCreators(dispatchShowMoreCompanies, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);