'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ScanForm from '@/components/ScanForm';
import ResultsTable from '@/components/ResultsTable';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/utils/auth';
import { IconClock, IconCheck, IconX, IconExternalLink } from '@tabler/icons-react';

export default function Dashboard() {
    const router = useRouter();
    const [scanResults, setScanResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [recentScans, setRecentScans] = useState([]);
    const [stats, setStats] = useState({
        totalScans: 0,
        completedScans: 0,
        failedScans: 0
    });

    useEffect(() => {
        const authenticate = async () => {
            const userData = await verifyToken();
            if (userData) {
                // Token is valid, fetch recent scans
                fetchRecentScans(userData._id);
            } else {
                toast.error('Please login to access the dashboard');
                router.push('/login');
            }
        };
        
        authenticate();
    }, [router]);

    const fetchRecentScans = async (userId) => {
        try {
            // Get token for authenticated API request
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/scan/getbyuser/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const allScans = response.data || [];
            setRecentScans(allScans.slice(0, 5)); // Get only the 5 most recent scans
            
            // Calculate stats
            const completed = allScans.filter(scan => scan.status === 'Completed').length;
            const failed = allScans.filter(scan => scan.status === 'Failed').length;
            
            setStats({
                totalScans: allScans.length,
                completedScans: completed,
                failedScans: failed
            });
        } catch (error) {
            console.error('Error fetching recent scans:', error);
            toast.error('Failed to fetch recent scans');
        }
    };

    const handleScanSubmit = async (url, userId) => {
        try {
            setLoading(true);
            setScanResults(null);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/scan/crawl`, {
                websiteUrl: url,
                userId: userId
            });

            setScanResults(response.data);

            // Refresh recent scans
            fetchRecentScans(userId);

            toast.success('Scan completed successfully!');
        } catch (error) {
            console.error('Scan error:', error);
            toast.error('Failed to complete scan. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <div className="container mx-auto my-auto px-4 py-8 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-white">Website Scanner Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <IconClock className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Scans</p>
                            <p className="text-xl font-bold">{stats.totalScans}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                    <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-full">
                            <IconCheck className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Completed Scans</p>
                            <p className="text-xl font-bold">{stats.completedScans}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
                    <div className="flex items-center">
                        <div className="bg-red-100 p-3 rounded-full">
                            <IconX className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Failed Scans</p>
                            <p className="text-xl font-bold">{stats.failedScans}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Start New Scan</h2>
                        <ScanForm onSubmit={handleScanSubmit} />
                    </div>

                    {loading && (
                        <div className="mt-8 bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            <p className="mt-4 text-gray-600">Scanning your website... This may take a few minutes depending on the size of your site.</p>
                        </div>
                    )}

                    {scanResults && !loading && (
                        <div className="mt-8 bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">Scan Results</h2>
                            <ResultsTable
                                brokenLinks={scanResults.brokenLinks}
                                orphanedPages={scanResults.orphanedPages}
                            />
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Scans</h2>

                    {recentScans.length === 0 ? (
                        <div className="text-center py-8">
                            <IconClock className="h-12 w-12 mx-auto text-gray-400" />
                            <p className="mt-2 text-gray-500">No recent scans found.</p>
                            <p className="text-sm text-gray-400">Start your first scan using the form.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentScans.map((scan) => (
                                <div
                                    key={scan._id}
                                    className="p-3 border rounded hover:bg-gray-50 cursor-pointer transition duration-200"
                                    onClick={() => router.push(`/user/scan-results/${scan._id}`)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="truncate max-w-[200px]">
                                            <span className="font-medium">{scan.targetUrl}</span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${scan.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            scan.status === 'Running' ? 'bg-blue-100 text-blue-800' :
                                                scan.status === 'Failed' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {scan.status}
                                        </span>
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500">
                                        Started: {formatDate(scan.startedAt)}
                                    </div>
                                    {scan.status === 'Completed' && (
                                        <div className="mt-1 text-xs flex items-center text-blue-600 hover:text-blue-800">
                                            <IconExternalLink className="h-3 w-3 mr-1" /> View Details
                                        </div>
                                    )}
                                </div>
                            ))}

                            <button
                                onClick={() => router.push('/user/profile')}
                                className="w-full mt-4 text-sm text-center py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded transition duration-200"
                            >
                                View all scans
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}