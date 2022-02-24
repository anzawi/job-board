import {createContext, useContext} from "react";
import JobStore from "./JobStore";
import ApplicationStore from "./ApplicationStore";
import UserStore from "./UserStore";
import CommonStore from "./CommonStore";

interface Store {
    jobStore: JobStore,
    applicationStore: ApplicationStore,
    userStore: UserStore,
    commonStore: CommonStore
}

export const store: Store = {
    jobStore: new JobStore(),
    applicationStore: new ApplicationStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}