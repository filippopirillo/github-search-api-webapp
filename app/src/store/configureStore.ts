import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { usersReducer } from "../reducers/users";
import { Actions } from "../types";
import { companiesReducer } from "../reducers/companies";

export const rootReducer = combineReducers({
    userState: usersReducer,
    companyState: companiesReducer
});

export type State = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<State, Actions>));