import React, {useEffect} from 'react';
import './styles.css'
import NavBar from "../../features/NavBar";
import {observer} from "mobx-react-lite";
import {useStore} from "../stores/store";
import JobList from "../../features/JobList";
import {Route, Routes} from 'react-router-dom';
import LoginForm from "../../features/LoginForm";
import RegisterForm from "../../features/RegisterForm";
import JobDescription from "../../features/JobDescription";
import Dashboard from "../../features/Dashboard";
import JobApplications from "../../features/JobApplications";
import ApplicationView from "../../features/ApplicationView";
import Loading from "../../features/Loading";
import JobForm from "../../features/JobForm";
import UserApplications from "../../features/UserApplications";
import Profile from "../../features/Profile";
import {PrivateRoute, SuperPrivateRoute, PublicRoute} from "../../features/PrivateRoute";
import JobFormEdit from "../../features/JobFormEdit";

function App() {
    const {commonStore, userStore} = useStore()
    useEffect(() => {
        if (commonStore.token)
            userStore.getUser()
                .finally(() => {
                    commonStore.setAppLoaded()
                    userStore.applications()
                })
        else commonStore.setAppLoaded()

    }, [commonStore, userStore]);

    if (!commonStore.appLoaded) return (<Loading msg={'loading application for you '}/>)

    return (
        <div className="App">
            <div className="container px-4 py-4">
                <NavBar/>
                <Routes>
                    <Route path={'/'} element={<PublicRoute><LoginForm/></PublicRoute>}/>
                    <Route path={'/register'} element={<PublicRoute><RegisterForm/></PublicRoute>}/>

                    <Route path={'/jobs'} element={<PrivateRoute><JobList/></PrivateRoute>}/>
                    <Route path={'/jobs/:jobId'} element={<PrivateRoute><JobDescription/></PrivateRoute>}/>
                    <Route path={'/dashboard'} element={<SuperPrivateRoute><Dashboard/></SuperPrivateRoute>}/>
                    <Route path={'/dashboard/:jobId'} element={<SuperPrivateRoute><JobApplications/></SuperPrivateRoute>}/>
                    <Route path={'/dashboard/:jobId/application/:appId'} element={<SuperPrivateRoute><ApplicationView/></SuperPrivateRoute>}/>
                    <Route path={'/dashboard/jobs/create'} element={<JobForm/>}/>
                    <Route path={'/dashboard/jobs/edit/:jobId'} element={<JobFormEdit/>}/>
                    <Route path={'/user/applications'} element={<PrivateRoute><UserApplications/></PrivateRoute>}/>
                    <Route path={'/user'} element={<PrivateRoute><Profile/></PrivateRoute>}/>
                    <Route path={'/user/:userId'} element={<PrivateRoute><Profile/></PrivateRoute>}/>
                </Routes>
            </div>
        </div>
    );
}

export default observer(App);
