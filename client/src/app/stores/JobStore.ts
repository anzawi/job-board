import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {Job, JobForm} from "../models/Job";
import History from "../helpers/History";

export default class JobStore {
    constructor() {
        makeAutoObservable(this)
    }

    jobs: Job[] = []
    job: Job | null = null
    loading: boolean = true

    loadJobs = async () => {
        try {
            const jobs = await agent.Jobs.list()
            runInAction(() => this.jobs = jobs)
        } catch (err) {
            throw err
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    loadJob = async (uuid: string | undefined) => {
        if (uuid == undefined) return;
        try {
            const job = await agent.Jobs.single(uuid)
            runInAction(() => this.job = job)
        } catch (err) {
            console.log(err)
        } finally {
            runInAction(() => this.loading = false)
        }
    }
    
    create = async (job: JobForm) => {
        runInAction(() => this.loading = true)
        try {
            await agent.Jobs.create(job)
        } catch (err) {
            throw err
        } finally {
           History.push('/dashboard')
        }
    }
    update = async (job: JobForm, jobId: string | undefined) => {
        if (jobId === undefined) return;
        runInAction(() => this.loading = true)
        try {
            await agent.Jobs.update(job, jobId)
        } catch (err) {
            throw err
        } finally {
           History.push('/dashboard')
        }
    }

    delete = async (id: string) => {
        runInAction(() => this.loading = true)
        try {
            await agent.Jobs.delete(id)
            this.jobs = this.jobs.filter((job) => {
                return job.id !== id
            })
        } catch (err) {
            throw err
        } finally {
            runInAction(() => this.loading = false)
        }
    }
    
}