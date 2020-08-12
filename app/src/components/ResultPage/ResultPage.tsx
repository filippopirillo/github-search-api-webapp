import React, { useEffect } from 'react';
import { Hidden, Grid } from '@material-ui/core';
import CustomTabs from '../Tabs/CustomTabs';
import ResultList from '../List/ResultList';
import { State } from '../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { Actions } from '../../types';
import { User } from '../../types/User';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dispatchSearchUsers } from '../../actions/users';

interface ResultPageProps {

}

interface LinkStateProps {
    users: User[]
}

interface LinkDispatchProps {
    dispatchSearchUsers: (query: string) => void
}

type Props = ResultPageProps & LinkStateProps & LinkDispatchProps

const ResultPage: React.FC<Props> = (props) => {

    const history = useHistory();
    const query = history.location.pathname.slice(1);

    useEffect(() => {
        console.log(query)
        props.dispatchSearchUsers(query);
    }, [query]);

    // useEffect(() => {
    //     console.log(query)
    // }, [query]);

    return (
        <>
            <Hidden smDown>
                <Grid item container xs={6} style={{ paddingRight: 20 }}>
                    <Grid item xs={12}>
                        <CustomTabs tabElements={[{ label: 'Users' }]} />
                    </Grid>
                    <Grid item xs={12}>
                        <ResultList users={props.users} />
                    </Grid>
                </Grid>
                <Grid item container xs={6} style={{ paddingLeft: 20 }}>
                    <Grid item xs={12}>
                        <CustomTabs tabElements={[{ label: 'Companies' }]}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ResultList users={props.users} />
                    </Grid>
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
    users: state.users
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Actions>): LinkDispatchProps => ({
    dispatchSearchUsers: bindActionCreators(dispatchSearchUsers, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);