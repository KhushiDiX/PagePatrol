'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IconClock, IconLinkCheck, IconLinkOff } from '@tabler/icons-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/utils/auth';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const authenticate = async () => {
      const userData = await verifyToken();
      if (userData) {
        setUser(userData);
        fetchUserScans(userData._id);
      } else {
        toast.error('Please login to view your profile');
        router.push('/login');
      }
      setLoading(false);
    };
    
    authenticate();
  }, [router]);

  const fetchUserScans = async (userId) => {
    try {
      setLoading(true);
      // Get token for authenticated API request
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/scan/getbyuser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setScans(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching scan history:', error);
      setLoading(false);
      toast.error('Failed to fetch scan history');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completed</span>;
      case 'Running':
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Running</span>;
      case 'Failed':
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Failed</span>;
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Pending</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : !user ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Please login to view your profile</h2>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 font-medium ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('scanHistory')}
              className={`px-6 py-3 font-medium ${activeTab === 'scanHistory' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Scan History
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
                  <div className="bg-blue-100 rounded-full h-32 w-32 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-600">
                      {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4">{user.name || 'User'}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">{user.createdAt ? formatDate(user.createdAt) : 'Not available'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Scans</p>
                      <p className="font-medium">{scans.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Scan History Tab */}
          {activeTab === 'scanHistory' && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Your Scan History</h2>
              {scans.length === 0 ? (
                <div className="text-center py-8">
                  <IconClock className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">You haven't performed any scans yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target URL</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Started</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Finished</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Results</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scans.map((scan) => (
                        <tr key={scan._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{scan.targetUrl}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(scan.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatDate(scan.startedAt)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatDate(scan.finishedAt)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {scan.status === 'Completed' ? (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => window.location.href = `/user/scan-results/${scan._id}`}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  View
                                </button>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500">Not available</div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;