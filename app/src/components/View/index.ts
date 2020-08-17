import { UserState } from "../../reducers/users";
import { CompanyState } from "../../reducers/companies";

export interface ViewProps {
    query: string;
    userState: UserState;
    companyState: CompanyState;
    dispatchShowMoreUsers: (query: string) => void;
    dispatchShowMoreCompanies: (query: string) => void;
}