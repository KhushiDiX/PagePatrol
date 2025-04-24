'use client';
import axios from 'axios';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const UpdateUser = () => {

    const { id } = useParams();
    const router = useRouter();

    const [userData, setUserData] = useState(null);

    const fetchUser = async () => {
        const res = await axios.get(`http://localhost:5000/user/getbyid/${id}`);
        console.log(res.data);
        setUserData(res.data);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const submitUpdateForm = async (values) => {
        console.log(values);
        const res = await axios.put(`http://localhost:5000/user/update/${id}`, values);
        if (res.status === 200) {
            toast.success('User Updated Successfully');
            router.push('/admin/manage-users');
        } else {
            toast.error('Error Updating User');
        }

    }

    return (
        <div>
            <h1>Update User</h1>

            <div>
                {
                    userData === null ? (
                        <p className='text-3xl text-red-400'>Loading... Please Wait </p>
                    ) : (
                        <Formik initialValues={userData} onSubmit={submitUpdateForm} >
                            {
                                (updateForm) => {
                                    return (
                                        <form onSubmit={updateForm.handleSubmit} >
                                            <div className="grid gap-y-4">
                                                {/* Form Group */}
                                                <div>
                                                    <label htmlFor="name" className="block text-sm mb-2">
                                                        Name
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            onChange={updateForm.handleChange}
                                                            value={updateForm.values.name}
                                                            className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                            required=""
                                                            aria-describedby="name-error"
                                                        />
                                                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                            <svg
                                                                className="size-5 text-red-500"
                                                                width={16}
                                                                height={16}
                                                                fill="currentColor"
                                                                viewBox="0 0 16 16"
                                                                aria-hidden="true"
                                                            >
                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    {
                                                        (updateForm.errors.name && updateForm.touched.name) && (
                                                            <p className="text-xs text-red-600 mt-2" id="email-error">
                                                                {updateForm.errors.name}
                                                            </p>
                                                        )
                                                    }

                                                </div>
                                                {/* End Form Group */}
                                                {/* Form Group */}
                                                <div>
                                                    <label htmlFor="email" className="block text-sm mb-2">
                                                        Email address
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            onChange={updateForm.handleChange}
                                                            value={updateForm.values.email}
                                                            className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                            // required=""
                                                            aria-describedby="email-error"
                                                        />
                                                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                            <svg
                                                                className="size-5 text-red-500"
                                                                width={16}
                                                                height={16}
                                                                fill="currentColor"
                                                                viewBox="0 0 16 16"
                                                                aria-hidden="true"
                                                            >
                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    {
                                                        (updateForm.errors.email && updateForm.touched.email) && (
                                                            <p className="text-xs text-red-600 mt-2" id="email-error">
                                                                {updateForm.errors.email}
                                                            </p>
                                                        )
                                                    }
                                                </div>
                                                {/* End Form Group */}
                                                {/* Form Group */}
                                                <div>
                                                    <label htmlFor="password" className="block text-sm mb-2">
                                                        Password
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            name="password"
                                                            onChange={updateForm.handleChange}
                                                            value={updateForm.values.password}
                                                            className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                            required=""
                                                            aria-describedby="password-error"
                                                        />
                                                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                            <svg
                                                                className="size-5 text-red-500"
                                                                width={16}
                                                                height={16}
                                                                fill="currentColor"
                                                                viewBox="0 0 16 16"
                                                                aria-hidden="true"
                                                            >
                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    {
                                                        (updateForm.errors.password && updateForm.touched.password) && (
                                                            <p className="text-xs text-red-600 mt-2" id="email-error">
                                                                {updateForm.errors.password}
                                                            </p>
                                                        )
                                                    }
                                                </div>
                                                {/* End Form Group */}
                                                {/* Form Group */}
                                                <div>
                                                    <label htmlFor="confirm-password" className="block text-sm mb-2">
                                                        Confirm Password
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="password"
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            onChange={updateForm.handleChange}
                                                            value={updateForm.values.confirmPassword}
                                                            className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                            required=""
                                                            aria-describedby="confirmPassword-error"
                                                        />
                                                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                            <svg
                                                                className="size-5 text-red-500"
                                                                width={16}
                                                                height={16}
                                                                fill="currentColor"
                                                                viewBox="0 0 16 16"
                                                                aria-hidden="true"
                                                            >
                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    {
                                                        (updateForm.errors.confirmPassword && updateForm.touched.confirmPassword) && (
                                                            <p className="text-xs text-red-600 mt-2" id="email-error">
                                                                {updateForm.errors.confirmPassword}
                                                            </p>
                                                        )
                                                    }
                                                </div>
                                                {/* End Form Group */}
                                                {/* Checkbox */}
                                                <div className="flex items-center">
                                                    <div className="flex">
                                                        <input
                                                            id="remember-me"
                                                            name="remember-me"
                                                            type="checkbox"
                                                            className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <div className="ms-3">
                                                        <label htmlFor="remember-me" className="text-sm">
                                                            I accept the{" "}
                                                            <a
                                                                className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                                                                href="#"
                                                            >
                                                                Terms and Conditions
                                                            </a>
                                                        </label>
                                                    </div>
                                                </div>
                                                {/* End Checkbox */}
                                                <button
                                                    type="submit"
                                                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                                >
                                                    Sign up
                                                </button>
                                            </div>
                                        </form>
                                    )
                                }
                            }
                        </Formik>
                    )
                }
            </div>

        </div>
    )
}

export default UpdateUser;