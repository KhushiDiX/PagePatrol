'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ScanForm from '@/components/ScanForm';
import ResultsTable from '@/components/ResultsTable';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [scanResults, setScanResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [recentScans, setRecentScans] = useState([]);

    useEffect(() => {
        // Check if user is logged in by verifying the token
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to access the dashboard');
            router.push('/login');
            return;
        }

        // Verify token with backend
        axios.get('http://localhost:5000/user/verify', { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                // Token is valid, fetch recent scans
                fetchRecentScans(response.data._id);
            })
            .catch(error => {
                toast.error('Invalid token, please login again');
                router.push('/login');
            });
    }, [router]);

    const fetchRecentScans = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/scan/getbyuser/${userId}`);
            setRecentScans(response.data.slice(0, 5)); // Get only the 5 most recent scans
        } catch (error) {
            console.error('Error fetching recent scans:', error);
        }
    };

    const handleScanSubmit = async (url, userId) => {
        try {
            setLoading(true);
            setScanResults(null);

            const response = await axios.post('http://localhost:5000/scan/crawl', {
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
        return date.toLocaleString();
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-1/2">
            <h1 className="text-2xl font-bold mb-6">Website Scanner</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <ScanForm onSubmit={handleScanSubmit} />

                    {loading && (
                        <div className="mt-8 flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            <p className="mt-4 text-gray-600">Scanning your website... This may take a few minutes depending on the size of your site.</p>
                        </div>
                    )}

                    {scanResults && !loading && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Scan Results</h2>
                            <ResultsTable
                                brokenLinks={scanResults.brokenLinks}
                                orphanedPages={scanResults.orphanedPages}
                            />
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">Recent Scans</h2>

                    {recentScans.length === 0 ? (
                        <p className="text-gray-500">No recent scans found.</p>
                    ) : (
                        <div className="space-y-3">
                            {recentScans.map((scan) => (
                                <div
                                    key={scan._id}
                                    className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
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
                                </div>
                            ))}

                            <button
                                onClick={() => router.push('/user/profile')}
                                className="w-full mt-2 text-sm text-blue-600 hover:text-blue-800"
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