import { Company, ADD_COMPANIES, CLEAR_COMPANIES } from "../types/Company";
import { Actions, UserType } from "../types";
import { methods, getAuthorization, gitHubEndpoint } from ".";
import { CompanyNode } from "../types/GitHub";
import { Dispatch } from "react";
import { State } from "../store/configureStore";

export const addCompanies = (companies: Company[]): Actions => ({
    type: ADD_COMPANIES,
    companies
});

export const cleanCompanies = (): Actions => ({
    type: CLEAR_COMPANIES
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
                        }
                    }
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
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

const parseCompanies = (rawValue: any): Company[] => {
    return rawValue.data.search.nodes.map((node: CompanyNode) => {
        return {
            type: UserType.COMPANY,
            fullname: node.name,
            username: node.login,
            people: node.membersWithRole.totalCount
        }
    })
}

export const dispatchAddCompanies = (searchQuery: string) => {
    return async (dispatch: Dispatch<Actions>, getStete: () => State) => {
        try {
            const response = await fetchGitHubData(searchQuery);
            const companies = parseCompanies(await response.json());
            dispatch(addCompanies(companies));
        } catch (e) {
            console.log('error', e);
        }
    }    
} 

export const dispatchClearCompanies = () => {
    return (dispatch: Dispatch<Actions>, getStete: () => State) => {
        dispatch(cleanCompanies());
    }
}