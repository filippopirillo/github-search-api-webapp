import { User, CLEAR_USERS, ADD_USERS, WAIT_FOR_RESULT } from "../types/User";
import { Actions, UserType } from "../types";
import { Dispatch } from "react";
import { State } from "../store/configureStore";
import { UserNode } from "../types/GitHub";
import { gitHubToken, methods, getAuthorization, gitHubEndpoint } from ".";
import { UserState } from "../reducers/users";
import { SSL_OP_CISCO_ANYCONNECT } from "constants";

export const addUsers = (users: User[], cursor: string, hasNextPage: boolean, totalCount: number): Actions => ({
    type: ADD_USERS,
    users,
    cursor,
    hasNextPage,
    totalCount
});

export const waitForResult = (): Actions => ({
    type: WAIT_FOR_RESULT
});

export const clearUsers = (): Actions => ({
    type: CLEAR_USERS
});

const getUsersQuery = (name: string, cursor?: string): string => {
    const afterString = cursor ? `, after: "${cursor}"` : '';
    const query = `{
                search(query: "${name} in:name type:user", first: 5, type: USER${afterString}) {
                    nodes {
                        ... on User {
                            login
                            contributionsCollection {
                                contributionCalendar {
                                totalContributions
                                }
                            }
                            name
                            avatarUrl
                        }
                    }
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                    userCount
                }
            }`;
    return query;
}

const fetchGitHubData = (name: string, cursor?: string) => {

    return fetch(gitHubEndpoint,
        {
            method: methods.POST,
            headers: { "Authorization": getAuthorization() },
            body: JSON.stringify({
                query: getUsersQuery(name, cursor)
            })
        })
}

const parseUsers = (rawValue: any): Partial<UserState> => {
    const searchResult = rawValue.data.search;
    const users = searchResult.nodes.map((node: UserNode): User => {
        return {
            type: UserType.USER,
            fullname: node.name,
            username: node.login,
            contributions: node.contributionsCollection.contributionCalendar.totalContributions,
            avatarUrl: node.avatarUrl
        }
    });

    return {
        users,
        cursor: searchResult.pageInfo.endCursor,
        hasNextPage: searchResult.pageInfo.hasNextPage,
        totalCount: searchResult.userCount
    }
}

export const dispatchShowMore = (searchQuery: string) => {
    return async (dispatch: Dispatch<Actions>, getState: () => State) => {
        dispatch(waitForResult());
        try {
            const response = await fetchGitHubData(searchQuery, getState().userState.cursor);
            const result = parseUsers(await response.json());
            dispatch(addUsers(result.users!, result.cursor!, result.hasNextPage!, result.totalCount!));
        } catch (e) {
            console.log('error', e);
        }
    }
}

export const dispatchAddUsers = (searchQuery: string) => {
    return async (dispatch: Dispatch<Actions>, getState: () => State) => {
        try {
            const response = await fetchGitHubData(searchQuery);
            const result = parseUsers(await response.json());
            dispatch(addUsers(result.users!, result.cursor!, result.hasNextPage!, result.totalCount!));
        } catch (e) {
            console.log('error', e);
        }
    }
}

export const dispatchClearUsers = () => {
    return (dispatch: Dispatch<Actions>, getState: () => State) => {
        dispatch(clearUsers());
    }
}