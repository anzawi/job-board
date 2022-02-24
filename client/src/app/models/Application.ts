import {Job} from "./Job";
import {User} from "./User";

export interface Application {
    id: string
    job: Job
    seen: boolean
    createdAt: string,
    user? : User
}