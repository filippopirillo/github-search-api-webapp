export interface User {
    type: string;
    fullname: string;
    username: string;
    contributions: number;
    avatarUrl: string;
};

export const ADD_USERS = 'ADD_USERS';
export const CLEAR_USERS = 'CLEAR_USERS';
export const WAIT_FOR_USER_RESULT = 'WAIT_FOR_USER_RESULT';
export const SET_USER_ERROR = 'SET_USER_ERROR';

export interface WaitForUserResult {
    type: typeof WAIT_FOR_USER_RESULT;
}

export interface AddUsers {
    type: typeof ADD_USERS;
    users: User[];
    cursor: string;
    hasNextPage: boolean;
    totalCount: number;
}

export interface ClearUsers {
    type: typeof CLEAR_USERS;
}

export interface SetError {
    type: typeof SET_USER_ERROR;
    message: string;
}

export type UserActionTypes = ClearUsers | AddUsers | WaitForUserResult | SetError;