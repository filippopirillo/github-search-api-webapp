export interface Company {
    type: string;
    fullname: string;
    username: string;
    people: number;
};

export const ADD_COMPANIES = 'ADD_COMPANIES';
export const CLEAR_COMPANIES = 'CLEAR_COMPANIES';

export interface AddCompanies {
    type: typeof ADD_COMPANIES;
    companies: Company[];
}

export interface ClearCompanies {
    type: typeof CLEAR_COMPANIES;
}

export type CompanyActionTypes = ClearCompanies | AddCompanies;