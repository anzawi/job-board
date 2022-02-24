import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../app/stores/store";
import Loading from "./Loading";
import {Link} from "react-router-dom";

function UserApplications() {
    const {userStore} = useStore()

    useEffect(() => {
        userStore.applications()
    }, [userStore]);

    if (userStore.loadingUserList) return (<Loading msg={'getting job details for you'}/>)

    return (
        <div className={"mx-auto bg-white shadow rounded w-full"}>
            {
                userStore.userApplications.map(application => (
                    <div key={application.id} className={"xl:px-8 lg:px-8 md:px-8 px-4 py-2 bg-white"}>
                        <div className={`p-5 flex justify-between rounded mb-6 bg-gray-100${application.seen ? ' opacity-50' : ''}`}>
                            <div className="w-3/5">
                                <a href="#"
                                   className="text-gray-800 focus:text-gray-600 hover:text-gray-600 focus:underline focus:outline-none">
                                    <p className="mb-2 text-sm font-bold ">{application.job.title}</p></a>
                                <dd>{application.job.companyName} {application.seen ? (<span>(seen)</span>) : ''}</dd>
                                <div className='mt-5'>
                                    <dd className='text-gray-500'>( {application.seen ? 'seen' : 'not seen yet'} )</dd>
                                </div>
                            </div>
                           
                            <div className="w-3/12 flex flex-col items-end justify-between">
                                <p className="text-xs text-gray-600">apply on {new Date(application.createdAt).toLocaleDateString()}</p>
                                <Link
                                    to={`/jobs/${application.job.id}`}
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-indigo-800 focus:ring-indigo-700 text-sm mt-12 mb-6 font-medium leading-none text-center text-white py-2.5 px-5 rounded bg-indigo-700 hover:bg-indigo-600">
                                    View job
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default observer(UserApplications)