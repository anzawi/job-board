import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {Application} from "../models/Application";
import {store} from "./store";

export default class ApplicationStore {
    constructor() {
        makeAutoObservable(this)
    }

    applications: Application[] = []
    application: Application | null = null
    loading: boolean = true
    applying: boolean = false
    applied: boolean = false

    setIsApplied = (yes: boolean) => {
        console.log('its ' + yes)
        runInAction(() => this.applied = yes)
    }

    get isApplied() {
        return this.applied
    }

    loadApplications = async () => {
        try {
            const applications = await agent.Applications.list()
            runInAction(() => this.applications = applications)
        } catch (err) {
            console.log(err)
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    loadApplication = async (uuid: string | undefined) => {
        if (uuid === undefined) return
        try {
            const application = await agent.Applications.single(uuid)
            runInAction(() => this.application = application)
        } catch (err) {
            console.log(err)
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    setApplicationsSeen = async (uuid: string | undefined) => {
        if (uuid === undefined) return
        try {
            await agent.Applications.seen(uuid)
        } catch (err) {
            throw err
        }
    }

    apply = async (uuid: string | undefined) => {
        if (uuid == undefined) return false;
        if (store.userStore.user?.isAdmin) {
            alert('Admin can\'t apply to jobs!')
            return false
        }
        
        this.applying = true
        try {
            const application = await agent.Applications.create(uuid)
            runInAction(() => this.application = application)
            store.userStore.userApplications.push({
                job: {
                    id: uuid,
                    applications: [],
                    description: '',
                    title: '',
                    salaryFrom: '',
                    salaryTo: '',
                    companyName: '',
                    expireAt: '',
                    createdAt: ''
                },
                seen: false,
                createdAt: application.createdAt,
                id: application.id
            })
            return true
        } catch (err) {
            console.log(err)
        } finally {
            runInAction(() => this.applying = false)
        }
    }
}