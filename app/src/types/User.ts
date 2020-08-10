export interface User {
    id: number;
    fullname: string;
    username: string;
    contribuitions: number;
};

export const SET_USERS = 'SET_USERS';

export interface SetUsers {
    type: typeof SET_USERS;
    users: User[];
}

export type UserActionTypes = SetUsers;