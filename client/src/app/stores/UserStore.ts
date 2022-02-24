import {User, UserForms} from "../models/User";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {store} from "./store";
import History from "../helpers/History";
import {Application} from "../models/Application";

export default class UserStore {
    user: User | null = null
    other: User | null = null

    userApplications: Application[] = []
    loadingUserList = true
    otherUserLoaded = false

    constructor() {
        makeAutoObservable(this)
    }

    get IsLogin() {
        return !!this.user
    }

    get Other() {
        if (this.other === null)
            return this.user
        return this.other
    }

    login = async (creds: UserForms) => {
        try {
            const user = await agent.Auth.login(creds)
            store.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            if (user.isAdmin)
                History.push('/dashboard')
            else
                History.push('/jobs')
        } catch (err) {
            throw err
        }
    }

    applications = async () => {
        try {
            const applications = await agent.Auth.userApplications()
            runInAction(() => this.userApplications = applications)

        } catch (err) {
            throw err
        } finally {
            runInAction(() => this.loadingUserList = false)
        }
    }

    userAppliedForThisJob = (jobId: string | undefined) => {
        if (jobId === undefined) {
            console.log('und')
            return false
        }

        let applied = false;
        this.userApplications.forEach(application => {
            if (application.job.id === jobId) {
                applied = true;
                return;
            }
        })

        return applied
    }

    register = async (details: UserForms) => {
        try {
            const user = await agent.Auth.register(details)
            store.commonStore.setToken(user.token)
            runInAction(() => this.user = user)

            History.push('/jobs')
        } catch (err) {
            throw err
        }
    }

    logout = () => {
        store.commonStore.setToken(null)
        window.localStorage.removeItem('jwt')
        this.user = null

        History.push('/')
    }

    getUser = async () => {
        try {
            const user = await agent.Auth.current()
            runInAction(() => this.user = user)
        } catch (err) {
            this.logout()
        }
    }
    getUserByEmail = async (email: string) => {
        try {
            const user = await agent.Auth.get(email)
            runInAction(() => this.other = user)
        } catch (err) {
            this.logout()
        } finally {
            runInAction(() => this.otherUserLoaded = true)
        }
    }

    upload = async (event: any) => {
        try {
            const form = new FormData()
            form.append('resume', event.target.files[0])
            await agent.Auth.upload(form)
        } catch (err) {
            throw err
        }
    }
}