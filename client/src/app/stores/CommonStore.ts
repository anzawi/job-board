import {makeAutoObservable, reaction} from "mobx";

export default class CommonStore {
    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.token,
            token => {
                if (token) window.localStorage.setItem('jwt', token)
                else window.localStorage.removeItem('jwt')
            }
        )
    }

    token: string | null = window.localStorage.getItem('jwt')
    appLoaded: boolean = false


    setToken = (token: string | null) => {
        this.token = token
    }

    setAppLoaded = () => {
        this.appLoaded = true
    }
}

