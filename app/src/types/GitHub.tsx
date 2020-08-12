export interface GitHubSearchResponse {
    incomplete_result: boolean;
    items: GitHubUserInfo[];
    total_count: number;
};

export interface GitHubUserInfo {
    login: string,
    type: string
}

export interface GitHubUserData {
    fullname?: string,
    contributions?: number
}