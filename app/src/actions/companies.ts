import { Company, ADD_COMPANIES, CLEAR_COMPANIES, WAIT_FOR_COMPANY_RESULT } from "../types/Company";
import { Actions, UserType } from "../types";
import { methods, getAuthorization, gitHubEndpoint } from ".";
import { CompanyNode } from "../types/GitHub";
import { Dispatch } from "react";
import { State } from "../store/configureStore";
import { CompanyState } from "../reducers/companies";

export const addCompanies = (companies: Company[], cursor: string, hasNextPage: boolean, totalCount: number): Actions => ({
    type: ADD_COMPANIES,
    companies,
    cursor,
    hasNextPage,
    totalCount
});

export const cleanCompanies = (): Actions => ({
    type: CLEAR_COMPANIES
});

export const waitForResult = (): Actions => ({
    type: WAIT_FOR_COMPANY_RESULT
});

export const getCompaniesQuery = (name: string, cursor?: string): string => {
    const afterString = cursor ? `, after: "${cursor}"` : '';
    const query = `{
                search(query: "${name} in:name type:org", first: 5, type: USER${afterString}) {
                    nodes {
                        ... on Organization {
                            login
                            name
                            membersWithRole {
                                totalCount
                            }
                            avatarUrl
                        }
                    }
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                    userCount
                }
            }`
    return query;
}

const fetchGitHubData = (name: string, cursor?: string) => {

    return fetch(gitHubEndpoint,
        {
            method: methods.POST,
            headers: { "Authorization": getAuthorization() },
            body: JSON.stringify({
                query: getCompaniesQuery(name, cursor)
            })
        })
}

const parseCompanies = (rawValue: any): Partial<CompanyState> => {
    const searchResult = rawValue.data.search;
    const companies = searchResult.nodes.map((node: CompanyNode): Company => {
        return {
            type: UserType.COMPANY,
            fullname: node.name,
            username: node.login,
            people: node.membersWithRole.totalCount,
            avatarUrl: node.avatarUrl
        }
    });
    
    return {
        companies,
        cursor: searchResult.pageInfo.endCursor,
        hasNextPage: searchResult.pageInfo.hasNextPage,
        totalCount: searchResult.userCount
    }
}

export const dispatchShowMoreCompanies = (searchQuery: string) => {
    return async (dispatch: Dispatch<Actions>, getState: () => State) => {
        console.log('DISPATCH COMPANY RESULT')
        dispatch(waitForResult());
        try {
            const response = await fetchGitHubData(searchQuery, getState().companyState.cursor);
            const result = parseCompanies(await response.json());
            dispatch(addCompanies(result.companies!, result.cursor!, result.hasNextPage!, result.totalCount!));
        } catch (e) {
            console.log('error', e);
        }
    }
}

export const dispatchAddCompanies = (searchQuery: string) => {
    return async (dispatch: Dispatch<Actions>, getState: () => State) => {
        try {
            const response = await fetchGitHubData(searchQuery);
            const result = parseCompanies(await response.json());
            dispatch(addCompanies(result.companies!, result.cursor!, result.hasNextPage!, result.totalCount!));
        } catch (e) {
            console.log('error', e);
        }
    }    
} 

export const dispatchClearCompanies = () => {
    return (dispatch: Dispatch<Actions>, getState: () => State) => {
        dispatch(cleanCompanies());
    }
}