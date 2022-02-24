import {Application} from "./Application";

export interface Job {
    id: string
    title: string
    description: string
    applications: Application[]
    companyName: string,
    salaryFrom: string
    salaryTo: string
    createdAt: string
    expireAt: string
}

export interface JobForm {
    title: string
    description: string
    companyName: string,
    salaryFrom?: string
    salaryTo?: string
}