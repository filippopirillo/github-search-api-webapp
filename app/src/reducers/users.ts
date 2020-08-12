import { User, UserActionTypes, SET_USERS, ADD_USER, CLEAR_USERS } from "../types/User"

const usersReducerInitialState: User[] = [];

const usersReducer = (state: User[] = usersReducerInitialState, action: UserActionTypes): User[] => {
    switch (action.type) {
        case SET_USERS:
            console.log("Setting users...");
            return action.users;
        case ADD_USER:
            console.log('Adding user...', action.user)
            return [...state, action.user];
        case CLEAR_USERS:
            return usersReducerInitialState;
        default:
            return state;
    }
};

export { usersReducer };