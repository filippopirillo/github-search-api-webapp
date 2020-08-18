import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { UserType } from '../../types';
import Panel from '../Panel/Panel';
import MobileTabs from '../Tabs/MobileTabs';
import { ViewProps } from '.';

const MobileView: React.FC<ViewProps> = (props) => {

    const [tabValue, setTabValue] = useState(0);

    return (
        <Grid item xs={12} container>
            <MobileTabs
                tabValue={tabValue}
                setTabValue={setTabValue}
                userLabel={`${UserType.USERS} (${props.userState.totalCount})`}
                companyLabel={`${UserType.COMPANIES} (${props.companyState.totalCount})`}
            />
            <Panel
                type={UserType.USER}
                list={props.userState.users.map(user => ({ fullname: user.fullname, username: user.username, count: user.contributions, avatarUrl: user.avatarUrl }))}
                handleShowMore={() => props.dispatchShowMoreUsers(props.query)}
                hasBeenFetched={props.userState.hasBeenFetched}
                hasNextPage={props.userState.hasNextPage}
                totalCount={props.userState.totalCount}
                display={tabValue === 0}
                error={props.userState.error}
            />
            <Panel
                type={UserType.COMPANY}
                list={props.companyState.companies.map(company => ({ fullname: company.fullname, username: company.username, count: company.people, avatarUrl: company.avatarUrl }))}
                hasBeenFetched={props.companyState.hasBeenFetched}
                handleShowMore={() => props.dispatchShowMoreCompanies(props.query)}
                hasNextPage={props.companyState.hasNextPage}
                totalCount={props.companyState.totalCount}
                display={tabValue === 1}
                error={props.companyState.error}
            />
        </Grid>
    );
}

export default MobileView;