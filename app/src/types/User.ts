export interface User {
    type: string;
    fullname: string;
    username: string;
    contributions: number;
    avatarUrl: string;
};

export const ADD_USERS = 'ADD_USERS';
export const CLEAR_USERS = 'CLEAR_USERS';
export const WAIT_FOR_RESULT = 'WAIT_FOR_RESULT';


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

export interface WaitForResult {
    type: typeof WAIT_FOR_RESULT;
}

export type UserActionTypes = ClearUsers | AddUsers | WaitForResult;