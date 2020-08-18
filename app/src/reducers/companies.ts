import { Company, CompanyActionTypes, ADD_COMPANIES, CLEAR_COMPANIES, WAIT_FOR_COMPANY_RESULT, SET_COMPANY_ERROR } from "../types/Company";

export interface CompanyState {
    companies: Company[];
    hasBeenFetched: boolean;
    totalCount: number;
    hasNextPage: boolean;
    cursor?: string;
    error?: string;
}

const companiesReducerInitialState: CompanyState = {
    companies: [],
    hasBeenFetched: false,
    totalCount: 0,
    hasNextPage: false
};

const companiesReducer = (state: CompanyState = companiesReducerInitialState, action: CompanyActionTypes): CompanyState => {
    switch (action.type) {
        case ADD_COMPANIES:
            console.log('Adding companies...');
            return {
                companies: [...state.companies, ...action.companies],
                hasBeenFetched: true,
                hasNextPage: action.hasNextPage,
                totalCount: action.totalCount,
                cursor: action.cursor
            };
        case CLEAR_COMPANIES:
            return companiesReducerInitialState;
        case WAIT_FOR_COMPANY_RESULT:
            console.log('WAIT FOR COMPANY RESULT DISPATCHED')
            return { ...state, hasBeenFetched: false }
        case SET_COMPANY_ERROR:
            return {...state, error: action.message}
        default:
            return state;
    }
};

export { companiesReducer };