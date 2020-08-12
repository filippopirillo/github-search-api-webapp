export interface User {
    type: string;
    fullname: string;
    username: string;
    contribuitions: number;
};

export const SET_USERS = 'SET_USERS';
export const SEARCH_USERS = 'SEARCH_USERS';
export const ADD_USER = 'ADD_USER';
export const CLEAR_USERS = 'CLEAR';

export interface SetUsers {
    type: typeof SET_USERS;
    users: User[];
}

export interface AddUser {
    type: typeof ADD_USER;
    user: User;
}

export interface SearchUsers {
    type: typeof SEARCH_USERS;
    query: string
}

export interface ClearUsers {
    type: typeof CLEAR_USERS;
}

export type UserActionTypes = SetUsers | SearchUsers | AddUser | ClearUsers;