import React from "react";
import {Navigate} from "react-router-dom";
import {useStore} from "../app/stores/store";



export function PrivateRoute({children}: any) {
    const {userStore :{IsLogin}} = useStore()
    return IsLogin ? children : <Navigate to="/" />;
}

export function SuperPrivateRoute({children}: any) {
    const {userStore :{IsLogin, user}} = useStore()
    return IsLogin && user?.isAdmin ? children : <Navigate to="/" />;
}

export function PublicRoute({children}: any) {
    const {userStore :{IsLogin}} = useStore()
    return !IsLogin ? children : <Navigate to="/jobs" />;
}