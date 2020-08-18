import { UserActionTypes } from "./User";
import { CompanyActionTypes } from "./Company";

export const basePath = 'search_github_users/'

export enum UserType {
    USER = 'User',
    USERS = 'Users',
    COMPANY = 'Company',
    COMPANIES = 'Companies'
}

export enum OrderType {
    DESC = 1,
    ASC = -1
}

export type Actions = UserActionTypes | CompanyActionTypes;