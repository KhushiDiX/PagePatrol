'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IconArrowLeft, IconDownload } from '@tabler/icons-react';
import { useRouter, useParams } from 'next/navigation';
import { verifyToken } from '@/utils/auth';

export default function ScanResults() {
    const { id } = useParams();
    const router = useRouter();
    const [scan, setScan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('broken');

    useEffect(() => {
        const authenticate = async () => {
            const userData = await verifyToken();
            if (userData) {
                fetchScanDetails(userData._id);
            } else {
                toast.error('Please login to view scan results');
                router.push('/login');
            }
        };

        authenticate();
    }, [id, router]);

    const fetchScanDetails = async (userId) => {
        try {
            setLoading(true);
            // Get token for authenticated API request
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/scan/getbyid/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Check if the scan belongs to the current user
            if (response.data && response.data.user === userId) {
                setScan(response.data);
            } else {
                toast.error("You don't have permission to view this scan");
                router.push('/user/profile');
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching scan details:', error);
            toast.error('Failed to fetch scan details');
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

    const handleExport = (type) => {
        // Get the data for export based on active tab
        let data;
        if (activeTab === 'broken') {
            data = scan.brokenLinks || [];
        } else {
            data = scan.orphanedPages || [];
        }

        // Create export file
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: type === 'json' ? 'application/json' : 'text/csv',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `scan-${id}-${activeTab}.${type}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!scan) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-8">
                    <h2 className="text-2xl font-bold">Scan not found</h2>
                    <p className="mt-2 text-gray-500">The scan you're looking for doesn't exist or you don't have permission to view it.</p>
                    <button
                        onClick={() => router.push('/user/profile')}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <IconArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-4 flex items-center">
                <button
                    onClick={() => router.push('/user/profile')}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                    <IconArrowLeft className="mr-1 h-4 w-4" /> Back to Profile
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold mb-2">Scan Results</h1>
                    <p className="text-gray-600 mb-4">Target URL: <span className="font-medium">{scan.targetUrl}</span></p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="font-medium">{scan.status}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-500">Started</p>
                            <p className="font-medium">{formatDate(scan.startedAt)}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-500">Finished</p>
                            <p className="font-medium">{formatDate(scan.finishedAt)}</p>
                        </div>
                    </div>
                </div>

                {scan.status === 'Completed' && (
                    <>
                        <div className="flex border-b">
                            <button
                                onClick={() => setActiveTab('broken')}
                                className={`px-6 py-3 font-medium ${activeTab === 'broken' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                            >
                                Broken Links
                            </button>
                            <button
                                onClick={() => setActiveTab('orphaned')}
                                className={`px-6 py-3 font-medium ${activeTab === 'orphaned' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                            >
                                Orphaned Pages
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-end mb-4 space-x-2">
                                <button
                                    onClick={() => handleExport('json')}
                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded shadow-sm bg-white text-gray-700 hover:bg-gray-50"
                                >
                                    <IconDownload className="mr-1 h-4 w-4" /> Export JSON
                                </button>
                                <button
                                    onClick={() => handleExport('csv')}
                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded shadow-sm bg-white text-gray-700 hover:bg-gray-50"
                                >
                                    <IconDownload className="mr-1 h-4 w-4" /> Export CSV
                                </button>
                            </div>

                            {activeTab === 'broken' && (
                                <>
                                    <h2 className="text-xl font-semibold mb-4">Broken Links</h2>
                                    {!scan.brokenLinks || scan.brokenLinks.length === 0 ? (
                                        <div className="text-center py-8 bg-green-50 rounded-lg">
                                            <p className="text-green-700">No broken links found! Your website is looking good.</p>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Code</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Found On</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {scan.brokenLinks && scan.brokenLinks.map((link, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">{link.url}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{link.statusCode}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                                <ul className="list-disc pl-5">
                                                                    {link.foundOn && link.foundOn.map((page, idx) => (
                                                                        <li key={idx} className="truncate max-w-md">{page}</li>
                                                                    ))}
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </>
                            )}

                            {activeTab === 'orphaned' && (
                                <>
                                    <h2 className="text-xl font-semibold mb-4">Orphaned Pages</h2>
                                    {!scan.orphanedPages || scan.orphanedPages.length === 0 ? (
                                        <div className="text-center py-8 bg-green-50 rounded-lg">
                                            <p className="text-green-700">No orphaned pages found! All pages are properly linked.</p>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {scan.orphanedPages && scan.orphanedPages.map((page, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">{page}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}