import { gitHubToken } from "../properties";

export const gitHubEndpoint = 'https://api.github.com/graphql';

export const methods = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE'
};

export const getAuthorization = (token: string = gitHubToken) => `Bearer ${token}`;
