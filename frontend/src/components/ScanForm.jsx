// components/ScanForm.jsx
'use client';
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

export default function ScanForm({ onSubmit }) {
    const [url, setUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        // Verify user on component mount
        verifyUser();
    }, []);

    const verifyUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please login to scan a website");
            setIsVerifying(false);
            return;
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/verify`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserId(response.data._id);
        } catch (error) {
            console.error("Authentication error:", error);
            toast.error("Authentication failed. Please login again.");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url.trim()) return;

        if (!userId) {
            toast.error("Please login to scan a website");
            return;
        }

        setIsSubmitting(true);
        onSubmit(url, userId)
            .finally(() => setIsSubmitting(false));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-b from-indigo-100/30 to-transparent rounded-full blur-3xl dark:from-indigo-900/10"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-t from-purple-100/30 to-transparent rounded-full blur-3xl dark:from-purple-900/10"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Website Scanner</h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Enter the URL of the website you want to scan for broken links and orphaned pages.
                    </p>
                    
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Website URL
                    </label>
                    
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <input
                            type="url"
                            className="w-full pl-10 border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={isSubmitting || isVerifying}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Scanning Website...
                            </>
                        ) : isVerifying ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying User...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Start Website Scan
                            </>
                        )}
                    </motion.button>
                    
                    {!userId && !isVerifying && (
                        <p className="mt-3 text-sm text-center text-gray-600 dark:text-gray-400">
                            Please <a href="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">login</a> or <a href="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline">signup</a> to scan websites.
                        </p>
                    )}
                </div>
            </form>
        </motion.div>
    );
}