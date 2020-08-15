import { User, UserActionTypes, CLEAR_USERS, ADD_USERS } from "../types/User";

interface UserState {
    users: User[];
    hasBeenFetched: boolean;
}

const usersReducerInitialState: UserState = {
    users: [],
    hasBeenFetched: false
}

const usersReducer = (state: UserState = usersReducerInitialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case ADD_USERS:
            return {users: [...state.users, ...action.users], hasBeenFetched: true};
        case CLEAR_USERS:
            return usersReducerInitialState;
        default:
            return state;
    }
};

export { usersReducer };