import axios, {AxiosResponse} from "axios";
import {Job, JobForm} from "../models/Job";
import {Application} from "../models/Application";
import {User, UserForms} from "../models/User";
import {store} from "../stores/store";
import History from "../helpers/History";

axios.defaults.baseURL = "http://localhost:5000/api/v1";

axios.interceptors.request.use(config => {
    const token = store.commonStore.token
    if (token)
        config.headers!.Authorization = `Bearer ${token}`
    
    return config
})

axios.interceptors.response.use(async response => {
    try {
        return response
    } catch (err) {
        return await Promise.reject(err)
    }
}, rejected => {
    if (rejected === 'Request failed with status code 401')
        console.log(rejected)
        History.push('/')
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
    patch: <T>(url: string) => axios.patch<T>(url).then(responseBody),
    upload: (url: string, body: {}) => axios.post(url, body, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}

const Jobs = {
    list: () => requests.get<Job[]>('/jobs'),
    single: (uuid: string) => requests.get<Job>(`/jobs/${uuid}`),
    create: (job: JobForm) => requests.post<Job>('/jobs', job),
    update: (job: Job) => requests.put<Job>(`/jobs/${job.id}`, job)
}

const Applications = {
    list: () => requests.get<Application[]>('/applications'),
    single: (uuid: string) => requests.get<Application>(`/applications/${uuid}`),
    create: (jobId: string) => requests.post<Application>(`/applications/${jobId}`, {}),
    seen: (appId: string) => requests.patch<Application>(`/applications/${appId}`)
}

const Auth = {
    current: () => requests.get<User>('/auth'),
    register: (details: UserForms) => requests.post<User>('/auth/register', details),
    login: (creds: UserForms) => requests.post<User>('/auth/login', creds),
    userApplications: () => requests.get<Application[]>('/applications/user'),
    upload: (data: FormData) => requests.upload('/auth/upload-resume', data),
    get: (email: string) =>  requests.get<User>(`/auth/${email}`),
}

const agents = {
    Jobs,
    Applications,
    Auth
}

export default agents;