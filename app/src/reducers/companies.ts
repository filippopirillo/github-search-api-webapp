import { Company, CompanyActionTypes, ADD_COMPANIES, CLEAR_COMPANIES } from "../types/Company";

interface CompanyState {
    companies: Company[];
    hasBeenFetched: boolean;
}

const companiesReducerInitialState: CompanyState = {
    companies: [],
    hasBeenFetched: false
};

const companiesReducer = (state: CompanyState = companiesReducerInitialState, action: CompanyActionTypes): CompanyState => {
    switch (action.type) {
        case ADD_COMPANIES:
            console.log('Adding companies...');
            return {companies: [...state.companies, ...action.companies], hasBeenFetched: true};
        case CLEAR_COMPANIES:
            return companiesReducerInitialState;
        default:
            return state;
    }
};

export { companiesReducer };