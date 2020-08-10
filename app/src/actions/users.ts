import { SET_USERS, User } from "../types/User";
import { Actions } from "../types";
import { Dispatch } from "react";
import { State } from "../store/configureStore";

export const setUsers = (users: User[]): Actions => ({
    type: SET_USERS,
    users
});

export const dispatchSetUsers = () => {
    return (dispatch: Dispatch<Actions>, getStete: () => State) => {
        dispatch(setUsers([
            {id: 1, fullname: 'Filippo Pirillo', username: 'FilippoPirillo', contribuitions: 2},
            {id: 2, fullname: 'Edoardo Canobbio', username: 'EdoCanobbio', contribuitions: 5},
            {id: 3, fullname: 'Gianluca Rombolà', username: 'Gianlu', contribuitions: 1},
            {id: 4, fullname: 'Daniele Cricelli', username: 'Dani92', contribuitions: 0}
        ]))
    }

}