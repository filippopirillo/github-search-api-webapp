import { User, UserActionTypes, CLEAR_USERS, ADD_USERS, WAIT_FOR_USER_RESULT, SET_USER_ERROR } from "../types/User";

export interface UserState {
    users: User[];
    hasBeenFetched: boolean;
    totalCount: number;
    hasNextPage: boolean;
    cursor?: string;
    error?: string;
}

const usersReducerInitialState: UserState = {
    users: [],
    hasBeenFetched: false,
    totalCount: 0,
    hasNextPage: false
}

const usersReducer = (state: UserState = usersReducerInitialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case ADD_USERS:
            return {
                users: [...state.users, ...action.users],
                hasBeenFetched: true,
                hasNextPage: action.hasNextPage,
                totalCount: action.totalCount,
                cursor: action.cursor
            };
        case CLEAR_USERS:
            return usersReducerInitialState;
        case WAIT_FOR_USER_RESULT:
            return { ...state, hasBeenFetched: false }
        case SET_USER_ERROR:
            return { ...state, error: action.message }
        default:
            return state;
    }
};

export { usersReducer };