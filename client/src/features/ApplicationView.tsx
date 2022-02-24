import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import Loading from "./Loading";
import {useStore} from "../app/stores/store";
import {Link, useParams} from "react-router-dom";

function ApplicationView() {
    const {jobStore, applicationStore, userStore} = useStore()
    const {loadApplication, application, loading, setApplicationsSeen} = applicationStore

    const {appId} = useParams();

    useEffect(() => {
        loadApplication(appId).then(() => {
            setApplicationsSeen(appId)
        })
    }, [jobStore, userStore]);

    if (loading) return (<Loading msg={'getting application details for you'}/>)
    
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg md:mx-[90px] mx-0 mt-10">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Applications details</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">find all applications and job-seeker details.</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Username</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{application?.user?.userName}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">User email</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{application?.user?.email}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Current posistion</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{application?.user?.currentPosition}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Applied at</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{application?.createdAt}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">View application profile  download resume</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <Link
                                to={`/user/${application?.user?.email}`}
                                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-indigo-800 focus:ring-indigo-700 text-sm mt-12 mb-6 font-medium leading-none text-center text-white py-2.5 px-5 rounded bg-indigo-700 hover:bg-indigo-600">
                                Visit profile
                            </Link>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

export default observer(ApplicationView)