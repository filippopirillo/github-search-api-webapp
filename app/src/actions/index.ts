import { UserType } from "../types";

export const gitHubToken = '5946e4aae16ccb02184d67e93591dfce6406fb07';
export const gitHubEndpoint = 'https://api.github.com/graphql';

export const methods = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE'
};

export const getAuthorization = (token: string = gitHubToken) => `Bearer ${token}`;
