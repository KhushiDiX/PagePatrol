'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ManageUser = () => {

    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);

    const fetchUserList = async () => {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/user/getall');
        console.log(res);

        console.log(res.data);

        setUserList(res.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchUserList();
    },[]);

    return (
        <div className="h-screen bg-amber-200 py-20">
            <h1 className="text-4xl text-center font-bold mb-10">Manage User</h1>
            <div className="p-5 border-b-2">
                {
                    loading ?
                        <p className="text-3xl text-red-400">loading...Please Wait </p>
                        :
                        (
                            <table className="w-full border-2 border-black shadow-lg">
                                <thead  className ="bg-gray-200">
                                    <tr className="text-left">
                                        <th className='p-5 border-b-2'>Name</th>
                                        <th className='p-5 border-b-2'>Email</th>
                                        <th className='p-5 border-b-2'>Phone</th>
                                        <th className='p-5 border-b-2'>Address</th>
                                        <th className='p-5 border-b-2'>Register At</th>
                                        <th className='p-5 border-b-2'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userList.map((user, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='p-2'>{user._id}</td>
                                                    <td className='p-2'>{user.name}</td>
                                                    <td className='p-2'>{user.email}</td>
                                                    <td className='p-2'>{user.phone}</td>
                                                    <td className='p-2'>{user.createdAt}</td>
                                                    <td>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        )

                }


            </div>

        </div>
    )
}

export default ManageUser