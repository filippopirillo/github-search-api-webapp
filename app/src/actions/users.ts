import { User, CLEAR_USERS, ADD_USERS, WAIT_FOR_USER_RESULT, SET_USER_ERROR } from "../types/User";
import { Actions, UserType } from "../types";
import { Dispatch } from "react";
import { State } from "../store/configureStore";
import { UserNode } from "../types/GitHub";
import { methods, getAuthorization, gitHubEndpoint } from ".";
import { UserState } from "../reducers/users";

export const addUsers = (users: User[], cursor: string, hasNextPage: boolean, totalCount: number): Actions => ({
    type: ADD_USERS,
    users,
    cursor,
    hasNextPage,
    totalCount
});

export const clearUsers = (): Actions => ({
    type: CLEAR_USERS
});

export const waitForResult = (): Actions => ({
    type: WAIT_FOR_USER_RESULT
});

export const setError = (code: number): Actions => {
    switch (code) {
        case 401:
            return {
                type: SET_USER_ERROR,
                message: 'Code 401: Authorization is invalid. Check token\'s state'
            }
        default:
            return {
                type: SET_USER_ERROR,
                message: 'Generic error occurred'
            }
    }
}

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

const getData = async (searchQuery: string, dispatch: Dispatch<Actions>, cursor?: string) => {
    try {
        const response = await fetchGitHubData(searchQuery, cursor);
        if (response.status === 200) {
            const result = parseUsers(await response.json());
            dispatch(addUsers(result.users!, result.cursor!, result.hasNextPage!, result.totalCount!));
        } else {
            dispatch(setError(response.status))
        }
    } catch (e) {
        console.log('error', e);
    }
}

export const dispatchShowMoreUsers = (searchQuery: string) => {
    return async (dispatch: Dispatch<Actions>, getState: () => State) => {
        dispatch(waitForResult());
        getData(searchQuery, dispatch, getState().userState.cursor);

    }
}

export const dispatchAddUsers = (searchQuery: string) => {
    return async (dispatch: Dispatch<Actions>, getState: () => State) => {
        getData(searchQuery, dispatch);

    }
}

export const dispatchClearUsers = () => {
    return (dispatch: Dispatch<Actions>, getState: () => State) => {
        dispatch(clearUsers());
    }
}