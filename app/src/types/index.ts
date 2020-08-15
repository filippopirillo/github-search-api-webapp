import { UserActionTypes } from "./User";
import { CompanyActionTypes } from "./Company";

export enum UserType {
    USER = 'User',
    COMPANY = 'Organization'
}

export type Actions = UserActionTypes | CompanyActionTypes