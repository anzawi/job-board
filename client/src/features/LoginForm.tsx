import {ErrorMessage, Field, Form, Formik} from "formik";
import React from "react";
import {useStore} from "../app/stores/store";
import {observer} from "mobx-react-lite";
import * as Yup from 'yup';
import {Link} from "react-router-dom";

function LoginForm() {
    const {userStore} = useStore()
    const {login} = userStore

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(4).required()
    })

    return (

        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => login(values).catch((err) => {setErrors({error: 'Incorrect credentials!'})})}
            validationSchema={validationSchema}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <div className="py-6">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm">
                        <div className="w-full p-8">
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">JobBord</h2>
                            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                            <a href="#"
                               className="flex opacity-50 cursor-not-allowed items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                                <div className="px-4 py-3">
                                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                                        <path
                                            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                            fill="#FFC107"/>
                                        <path
                                            d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                            fill="#FF3D00"/>
                                        <path
                                            d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                            fill="#4CAF50"/>
                                        <path
                                            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                            fill="#1976D2"/>
                                    </svg>
                                </div>
                                <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with
                                    Google</h1>
                            </a>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 lg:w-1/4"/>
                                <a href="#" className="text-xs text-center text-gray-500 uppercase">or login with
                                    email</a>
                                <span className="border-b w-1/5 lg:w-1/4"/>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <ErrorMessage name={'error'}
                                              render={errorMessage => <div
                                                  className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                                  role="alert">
                                                  <strong className="font-bold">{errors.error}</strong>
                                                  <span className="block sm:inline">values you entered is not match our records.</span>
                                              </div>}
                                />
                                <div className="mt-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                    <Field
                                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                        name='email' type="email"/>
                                    <ErrorMessage
                                        name={'email'}
                                        render={error => <p className="text-red-500 text-xs italic">{error}</p>}
                                    />
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                        <a href="#" className="text-xs text-gray-500">Forget Password?</a>
                                    </div>
                                    <Field
                                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                        name="password" type="password"/>
                                    <ErrorMessage
                                        name={'password'}
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
                                        </span>) : "Login"
                                        }
                                    </button>
                                </div>
                            </Form>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 md:w-1/4"/>
                                <Link to={'/register'} className="text-xs text-gray-500 uppercase">or sign up</Link>
                                <span className="border-b w-1/5 md:w-1/4"/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Formik>

    );
}

export default observer(LoginForm);