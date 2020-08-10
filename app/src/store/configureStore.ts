import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { usersReducer } from "../reducers/users";
import { Actions } from "../types";

export const rootReducer = combineReducers({
    users: usersReducer
});

export type State = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<State, Actions>));