import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../app/stores/store";
import Loading from "./Loading";
import {Link} from "react-router-dom";

function Dashboard() {
    const {jobStore} = useStore()
    const {loading, jobs, loadJobs} = jobStore

    useEffect(() => {
        loadJobs()
    }, [jobStore]);

    if (loading) return (<Loading msg={'getting jobs for you please wait..'}/>)

    return (
        <div className={"mx-auto bg-white shadow rounded w-full"}>
            <div className='flex justify-end'>
                <Link to={'/dashboard/jobs/create'}
                        className="my-5 mx-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Create new job
                    <svg x="0px" y="0px" width='20' height='20' className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
                        <g>
                            <path d="M920,430H570V80c0-38.7-31.3-70-70-70c-38.6,0-70,31.3-70,70v350H80c-38.6,0-70,31.3-70,70c0,38.7,31.4,70,70,70h350v350c0,38.6,31.4,70,70,70c38.7,0,70-31.4,70-70V570h350c38.7,0,70-31.3,70-70C990,461.3,958.7,430,920,430z"/>
                        </g>
                    </svg>
                </Link>
            </div>
            {
                jobs.map(job => (
                    <div key={job.id} className={"xl:px-8 lg:px-8 md:px-8 px-4 py-2 bg-white"}>
                        <div className={"p-5 flex justify-between rounded mb-6 bg-gray-100"}>
                            <div className="w-3/5">
                                <a href="#"
                                   className="text-gray-800 focus:text-gray-600 hover:text-gray-600 focus:underline focus:outline-none">
                                    <p className="mb-2 text-sm font-bold ">{job.title}</p></a>
                                <p>
                                    {job.description}
                                </p>
                            </div>
                            <div className="w-3/12 flex flex-col items-end justify-between">
                                <p className="text-xs text-gray-600">{job.createdAt} - {job.expireAt}</p>
                                {
                                    job?.applications?.length > 0
                                    ? ( <Link
                                            to={`/dashboard/${job.id}`}
                                            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-indigo-800 focus:ring-indigo-700 text-sm mt-12 mb-6 font-medium leading-none text-center text-white py-2.5 px-5 rounded bg-indigo-700 hover:bg-indigo-600">
                                            View applications ({job?.applications?.length})
                                        </Link>)
                                        :(
                                            <button
                                                className="opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-indigo-800 focus:ring-indigo-700 text-sm mt-12 mb-6 font-medium leading-none text-center text-white py-2.5 px-5 rounded bg-indigo-700 hover:bg-indigo-600">
                                                No applications yet
                                            </button>
                                        )
                                }
                               
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default observer(Dashboard)