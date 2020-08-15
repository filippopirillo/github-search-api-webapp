export interface User {
    type: string;
    fullname: string;
    username: string;
    contribuitions: number;
};

export const ADD_USERS = 'ADD_USERS';
export const CLEAR_USERS = 'CLEAR_USERS';


export interface AddUsers {
    type: typeof ADD_USERS;
    users: User[];
}

export interface ClearUsers {
    type: typeof CLEAR_USERS;
}

export type UserActionTypes = ClearUsers | AddUsers;