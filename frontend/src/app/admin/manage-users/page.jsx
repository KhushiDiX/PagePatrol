'use client';
import { IconPencilCheck, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/utils/auth';

const ManageUsers = () => {

  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const router = useRouter();

  // Format date to a readable format (MM/DD/YYYY, HH:MM AM/PM)
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      // Get token for authenticated API request
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found');
        router.push('/login');
        return;
      }
      
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getall`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res);
      console.log(res.data);
      setUserList(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch users');
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('Access denied. Please login again.');
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Verify if user is logged in and is admin before fetching users
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
  }, [router]);

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.status === 200) {
        fetchUser();
        toast.success('User Deleted Successfully');
      } else {
        toast.error('Error Deleting User');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error.response?.data?.message || 'Error Deleting User');
    }
  };


  return (
    <div className='h-screen bg-green-300 py-20'>
      <h1 className='text-4xl text-center font-bold mb-10'>Manage Users</h1>
      <div className='container mx-auto'>
        {
          loading ?
            <p className='text-3xl text-red-400'>Loading... Please Wait </p>
            :
            (
              <table className='w-full border-2 border-black shadow-lg'>
                <thead className='bg-gray-200'>
                  <tr className='text-left'>
                    <th className='p-5 border-b-2'>ID</th>
                    <th className='p-5 border-b-2'>Name</th>
                    <th className='p-5 border-b-2'>Email</th>
                    <th className='p-5 border-b-2'>Registered At</th>
                    <th className='p-5 border-b-2'>Actions</th>
                  </tr>
                </thead>
                <tbody className='text-left'>
                  {
                    userList.map((user) => {
                      return (
                        <tr key={user._id} className='border-b-2'>
                          <td className='p-2'>{user._id}</td>
                          <td className='p-2'>{user.name}</td>
                          <td className='p-2'>{user.email}</td>
                          <td className='p-2'>{formatDate(user.createdAt)}</td>
                          <td className='p-2'>
                            <button onClick={() => { deleteUser(user._id) }} className='bg-red-500 text-white px-4 py-2 rounded-lg'>
                              <IconTrash size={20} color='white' />
                            </button>
                            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg ml-2'>
                              <Link href={`/admin/update-user/${user._id}`}>
                                <IconPencilCheck size={20} color='white' />
                              </Link>
                            </button>
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

export default ManageUsers;