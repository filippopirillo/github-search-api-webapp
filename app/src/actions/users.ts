import { SET_USERS, User, SEARCH_USERS, ADD_USER, CLEAR_USERS } from "../types/User";
import { Actions } from "../types";
import { Dispatch } from "react";
import { State } from "../store/configureStore";
import { gql } from '@apollo/client';
import { GitHubUserInfo, GitHubUserData } from "../types/GitHub";

const gitHubToken = '5946e4aae16ccb02184d67e93591dfce6406fb07';

const methods = {
    POST: "POST",
    GET: "GET",
    DELETE: "DELETE"
};

const fetchGitHubUserInfo = (query: string) => (
    fetch(`https://api.github.com/search/users?q=${query}%20in:username`,
        {
            method: methods.GET
        })
);

const fetchGitHubUserData = (login: string) => (
    fetch('https://api.github.com/graphql',
        {
            method: methods.POST,
            headers: { "Authorization": `Bearer ${gitHubToken}` },
            body: JSON.stringify({
                query: `{
                            user(login:"${login}") {
                                name
                                contributionsCollection {
                                contributionCalendar {
                                    totalContributions
                                }
                                }
                            }
                        }`
            })
        })
);


export const setUsers = (users: User[]): Actions => ({
    type: SET_USERS,
    users
});

export const addUser = (user: User): Actions => ({
    type: ADD_USER,
    user
});
export const searchUsers = (query: string): Actions => ({
    type: SEARCH_USERS,
    query
});

export const clearUsers = (): Actions => ({
    type: CLEAR_USERS
})

export const dispatchSearchUsers = (query: string) => {
    return (dispatch: Dispatch<Actions>, getStete: () => State) => {
        fetchGitHubUserInfo(query)
            .then(async (response) => {
                let data = await response.json();

                data.items.map((el: GitHubUserInfo) => {
                    fetchGitHubUserData(el.login)
                        .then(async res => {
                            let userData = await res.json();
                            console.log('userData', userData);
                            dispatch(addUser({
                                type: el.type,
                                username: el.login,
                                fullname: userData.data.user.name,
                                contribuitions: userData.data.user.contributionsCollection.contributionCalendar.totalContributions
                            }))
                        })
                })

            })
            .catch(error => console.log('errore', error))

    }
}

export const dispatchClearUsers = () => {
    return (dispatch: Dispatch<Actions>, getStete: () => State) => {
        dispatch(clearUsers());
    }
}