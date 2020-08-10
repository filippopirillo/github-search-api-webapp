import { User, UserActionTypes, SET_USERS } from "../types/User"

const usersReducerInitialState: User[] = [];

const usersReducer = (state: User[] = usersReducerInitialState, action: UserActionTypes): User[] => {
    switch (action.type) {
        case SET_USERS:
            console.log("Setting users...");
            return action.users;
        default:
            return state;
    }
};

export { usersReducer };