export interface Company {
    type: string;
    fullname: string;
    username: string;
    people: number;
    avatarUrl: string;
};

export const ADD_COMPANIES = 'ADD_COMPANIES';
export const CLEAR_COMPANIES = 'CLEAR_COMPANIES';
export const WAIT_FOR_COMPANY_RESULT = 'WAIT_FOR_COMPANY_RESULT';
export const SET_COMPANY_ERROR = 'SET_COMPANY_ERROR';

export interface WaitForCompanyResult {
    type: typeof WAIT_FOR_COMPANY_RESULT;
}

export interface AddCompanies {
    type: typeof ADD_COMPANIES;
    companies: Company[];
    cursor: string,
    hasNextPage: boolean,
    totalCount: number
}

export interface ClearCompanies {
    type: typeof CLEAR_COMPANIES;
}

export interface SetError {
    type: typeof SET_COMPANY_ERROR;
    message: string;
}

export type CompanyActionTypes = ClearCompanies | AddCompanies | WaitForCompanyResult | SetError;