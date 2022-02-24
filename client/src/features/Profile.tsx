import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../app/stores/store";
import {Link, useParams} from "react-router-dom";
import {Field} from "formik";
import Loading from "./Loading";


function Profile() {
    const {userId} = useParams()
    const {userStore} = useStore()
    const {Other} = userStore

    useEffect(() => {
        if (userId !== undefined)
            userStore.getUserByEmail(userId)
    }, [userStore]);
    
    
    if (userId !== undefined && !userStore.otherUserLoaded) return (<Loading msg={'getting applicant profile ...'} />)
    
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mx-20">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900"> {userId === undefined ? `Hello ${userStore.user?.username} view your profile` : `view ${userStore.Other?.username} profile`}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details.</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Username</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{Other?.username}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Current position</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{Other?.currentPosition}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{Other?.email}</dd>
                    </div>


                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Resume</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                {Other?.resume !== null ? (
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div className="w-0 flex-1 flex items-center">
                                            <svg className="flex-shrink-0 h-5 w-5 text-gray-400"
                                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                 fill="currentColor"
                                                 aria-hidden="true">
                                                <path fillRule="evenodd"
                                                      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            <span
                                                className="ml-2 flex-1 w-0 truncate"> {Other?.resume} </span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <Link to={`/api/v1/auth/download/${Other?.resume}`} target="_blank" download
                                               className="font-medium text-indigo-600 hover:text-indigo-500"> Download
                                            </Link>
                                        </div>
                                    </li>) : (<li className="flex-1 flex items-center p-2">No resume to view</li>)}
                                {userId === undefined ? (
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div className="ml-4 flex-shrink-0">
                                            <label
                                                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"> Upload
                                                &
                                                Replace Resume
                                                <input onChange={(e) => userStore.upload(e)}
                                                       className={'hidden'}
                                                       type={'file'}
                                                       name={'resume'}
                                                       accept="application/pdf"/>
                                            </label>
                                        </div>
                                    </li>
                                ) : null}
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

export default observer(Profile)