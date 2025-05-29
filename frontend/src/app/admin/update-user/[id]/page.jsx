'use client';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { verifyToken } from '@/utils/auth';

const UpdateUser = () => {
    const { id } = useParams();
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    const fetchUser = async () => {
        try {
            // Get token for authenticated API request
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authentication token not found');
                router.push('/login');
                return;
            }
            
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getbyid/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(res.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch user');
            if (error.response?.status === 401 || error.response?.status === 403) {
                router.push('/login');
            }
        }
    };

    useEffect(() => {
        // Verify if user is logged in and is admin before fetching user
        const authenticate = async () => {
            const userData = await verifyToken();
            if (!userData) {
                toast.error('Please login to access this page');
                router.push('/login');
                return;
            }
            
            if (userData.role !== 'admin') {
                toast.error('Access denied. Admin privileges required.');
                router.push('/user/dashboard');
                return;
            }
            
            fetchUser();
        };
        
        authenticate();
    }, []);

    const submitUpdateForm = async (values) => {
        try {
            // Get token for authenticated API request
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authentication token not found');
                router.push('/login');
                return;
            }
            
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update/${id}`, values, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (res.status === 200) {
                toast.success('User Updated Successfully');
                router.push('/admin/manage-users');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error(error.response?.data?.message || 'Error Updating User');
            if (error.response?.status === 401 || error.response?.status === 403) {
                router.push('/login');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Update User</h1>
                <p className="text-gray-600 mb-6">Update the user details below and click "Save Changes" to apply the updates.</p>

                {userData === null ? (
                    <p className="text-center text-lg text-red-500">Loading... Please Wait</p>
                ) : (
                    <Formik initialValues={userData} onSubmit={submitUpdateForm}>
                        {(updateForm) => (
                            <form onSubmit={updateForm.handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        onChange={updateForm.handleChange}
                                        value={updateForm.values.name}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        required
                                    />
                                    {updateForm.errors.name && updateForm.touched.name && (
                                        <p className="text-sm text-red-500 mt-1">{updateForm.errors.name}</p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={updateForm.handleChange}
                                        value={updateForm.values.email}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    {updateForm.errors.email && updateForm.touched.email && (
                                        <p className="text-sm text-red-500 mt-1">{updateForm.errors.email}</p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        autoComplete='new-password'
                                        onChange={updateForm.handleChange}
                                        value={updateForm.values.password}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        required
                                    />
                                    {updateForm.errors.password && updateForm.touched.password && (
                                        <p className="text-sm text-red-500 mt-1">{updateForm.errors.password}</p>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        autoComplete='new-password'
                                        onChange={updateForm.handleChange}
                                        value={updateForm.values.confirmPassword}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        required
                                    />
                                    {updateForm.errors.confirmPassword && updateForm.touched.confirmPassword && (
                                        <p className="text-sm text-red-500 mt-1">{updateForm.errors.confirmPassword}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Save Changes
                                </button>
                            </form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

export default UpdateUser;