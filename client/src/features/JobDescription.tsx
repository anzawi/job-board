import React, {useEffect, useState} from "react";
import {useStore} from "../app/stores/store";
import {observer} from "mobx-react-lite";
import Loading from "./Loading";
import {useParams} from "react-router-dom";

function JobDescription() {
    const {jobStore, applicationStore, userStore} = useStore()
    const {loading, loadJob, job} = jobStore
    const {apply, applying, setIsApplied, isApplied} = applicationStore
    
    const {jobId} = useParams();
    const applied = userStore.userAppliedForThisJob(jobId) 
    setIsApplied(applied)

    useEffect(() => {
        loadJob(jobId)
    }, [jobStore, userStore]);

    if (loading) return (<Loading msg={'getting job details for you'}/>)
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg md:mx-[90px] mx-0 mt-10">
            <div className="mt-0 flex justify-end">
                {
                    isApplied ?  <button disabled className="bg-gray-400 text-white font-bold py-2 px-4 w-[100px] rounded">Applied</button> :
                    applying ? <button
                            className="bg-gray-700 text-white font-bold py-2 px-4 w-[100px] rounded hover:bg-gray-600">
                            <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"/>
                            </svg>
                        </button>
                        : <button onClick={() =>{ apply(jobId).then(ok => setIsApplied(true)) }}
                                  className="bg-gray-700 text-white font-bold py-2 px-4 w-[100px] rounded hover:bg-gray-600">Apply</button>
                }
            </div>
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Job Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">find all position details.</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Position</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{job?.title}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Total applications</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{job?.applications.length}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Company name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{job?.companyName}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Salary</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{`${job?.salaryFrom ?? '0'}$ - ${job?.salaryTo ?? '0'}$`}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Job Description</dt>
                        <p>{job?.description}</p>
                    </div>
                    <div className="mt-0 flex justify-end">
                        {
                            isApplied ?  <button disabled className="bg-gray-400 text-white font-bold py-2 px-4 w-[100px] rounded">Applied</button> :
                            applying ? <button
                                    className="bg-gray-700 text-white font-bold py-2 px-4 w-[100px] rounded hover:bg-gray-600">
                                    <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin"
                                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"/>
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"/>
                                    </svg>
                                </button>
                                : <button onClick={() => {apply(jobId).then(ok => {setIsApplied(true)})}}
                                          className="bg-gray-700 text-white font-bold py-2 px-4 w-[100px] rounded hover:bg-gray-600">Apply</button>
                        }
                    </div>
                </dl>
            </div>
        </div>
    );
}

export default observer(JobDescription)