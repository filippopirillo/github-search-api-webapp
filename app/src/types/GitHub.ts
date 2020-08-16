export interface UserNode {
    login: string;
    contributionsCollection: {
        contributionCalendar: {
            totalContributions: number;
        }
    };
    name: string;
    avatarUrl: string;
}

export interface CompanyNode {
    login: string;
    membersWithRole: {
        totalCount: number;
    };
    name: string;
    avatarUrl: string;
}