import {Formik, Field, ErrorMessage, Form} from "formik";
import React from "react";
import {Link} from "react-router-dom";
import {useStore} from "../app/stores/store";
import * as Yup from "yup";

export default function RegisterForm() {
    const {userStore} = useStore()
    const {register} = userStore

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        username: Yup.string().required(),
        password: Yup.string().min(4).required(),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Passwords must match')
    })
    return (
        <Formik
            initialValues={{email: '', password: '', confirmPassword: '', username: '',currentPosition: '' ,error: null}}
            validationSchema={validationSchema}
            onSubmit={(values, {setErrors}) => {
                register(values).catch(err => {setErrors({error: 'Password must contains capital and small letters, symbols, and numbers - length 4-8 characters.'})})
            }}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <div className="py-6">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm">
                        <div className="w-full p-8">
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">JobBord</h2>
                            <p className="text-xl text-gray-600 text-center">Register as new user!</p>
                           <Form onSubmit={handleSubmit}>
                               <ErrorMessage name={'error'}
                                             render={errorMessage => <div
                                                 className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                                 role="alert">
                                                 <strong className="font-bold">Please correct errors  </strong>
                                                 <span className="block sm:inline">{errors.error}.</span>
                                             </div>} />
                               <div className="mt-4">
                                   <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                                   <Field name={'username'} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" />
                                   <ErrorMessage
                                       name={'username'}
                                       render={error => <p className="text-red-500 text-xs italic">{error}</p>}
                                   />
                               </div>
                               <div className="mt-4">
                                   <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                   <Field name='email' className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" />
                                   <ErrorMessage
                                       name={'email'}
                                       render={error => <p className="text-red-500 text-xs italic">{error}</p>}
                                   />
                               </div>
                               <div className="mt-4">
                                   <label className="block text-gray-700 text-sm font-bold mb-2">Current position</label>
                                   <Field name='currentPosition' className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" />
                                   <ErrorMessage
                                       name={'currentPosition'}
                                       render={error => <p className="text-red-500 text-xs italic">{error}</p>}
                                   />
                               </div>
                               <div className="mt-4">
                                   <div className="flex justify-between">
                                       <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                   </div>
                                   <Field name={'password'} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
                                   <ErrorMessage
                                       name={'password'}
                                       render={error => <p className="text-red-500 text-xs italic">{error}</p>}
                                   />
                               </div>
                               <div className="mt-4">
                                   <div className="flex justify-between">
                                       <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                                   </div>
                                   <Field name={'confirmPassword'} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
                                   <ErrorMessage
                                       name={'confirmPassword'}
                                       render={error => <p className="text-red-500 text-xs italic">{error}</p>}
                                   />
                               </div>
                               <div className="mt-8">
                                   <button
                                       type="submit"
                                       disabled={isSubmitting}
                                       className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">

                                       {
                                           isSubmitting ? (<span>
                                                Loading...
                                             <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin"
                                                  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="#E5E7EB"/>
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentColor"/>
                                                </svg>
                                        </span>) : "Register"
                                       }
                                   </button>
                               </div>
                           </Form>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 md:w-1/4"/>
                                <Link to={'/'} className="text-xs text-gray-500 uppercase">or sign in</Link>
                                <span className="border-b w-1/5 md:w-1/4"/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}