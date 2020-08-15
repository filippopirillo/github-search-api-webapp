import { User, CLEAR_USERS, ADD_USERS } from "../types/User";
import { Actions, UserType } from "../types";
import { Dispatch } from "react";
import { State } from "../store/configureStore";
import { UserNode } from "../types/GitHub";
import { gitHubToken, methods, getAuthorization, gitHubEndpoint } from ".";

export const addUsers = (users: User[]): Actions => ({
    type: ADD_USERS,
    users
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
                        }
                    }
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
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

const parseUsers = (rawValue: any): User[] => {
    return rawValue.data.search.nodes.map((node: UserNode) => {
        return {
            type: UserType.USER,
            fullname: node.name,
            username: node.login,
            contribuitions: node.contributionsCollection.contributionCalendar.totalContributions
        }
    })
}

export const dispatchAddUsers = (searchQuery: string) => {
    return async (dispatch: Dispatch<Actions>, getStete: () => State) => {
        try {
            const response = await fetchGitHubData(searchQuery);
            const users = parseUsers(await response.json());
            dispatch(addUsers(users));
        } catch (e) {
            console.log('error', e);
        }
    }    
} 

export const dispatchClearUsers = () => {
    return (dispatch: Dispatch<Actions>, getStete: () => State) => {
        dispatch(clearUsers());
    }
}