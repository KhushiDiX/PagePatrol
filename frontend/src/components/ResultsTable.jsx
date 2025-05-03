'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ResultsTable({ brokenLinks, orphanedPages }) {
    const [activeTab, setActiveTab] = useState('brokenLinks');

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-b from-indigo-100/30 to-transparent rounded-full blur-3xl dark:from-indigo-900/10"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-t from-purple-100/30 to-transparent rounded-full blur-3xl dark:from-purple-900/10"></div>
            
            <div className="relative z-10">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px">
                        <li className="mr-2">
                            <button
                                className={`inline-block p-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                                    activeTab === 'brokenLinks'
                                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                                }`}
                                onClick={() => setActiveTab('brokenLinks')}
                            >
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 10-5.656-5.656l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                                    </svg>
                                    Broken Links
                                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900/30 dark:text-red-300">
                                        {brokenLinks.length}
                                    </span>
                                </div>
                            </button>
                        </li>
                        <li className="mr-2">
                            <button
                                className={`inline-block p-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                                    activeTab === 'orphanedPages'
                                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                                }`}
                                onClick={() => setActiveTab('orphanedPages')}
                            >
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Orphaned Pages
                                    <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-amber-900/30 dark:text-amber-300">
                                        {orphanedPages.length}
                                    </span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="p-6">
                    {activeTab === 'brokenLinks' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {brokenLinks.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                <th className="px-6 py-3 rounded-tl-lg">Link</th>
                                                <th className="px-6 py-3">Status Code</th>
                                                <th className="px-6 py-3 rounded-tr-lg">Found On</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {brokenLinks.map((item, idx) => (
                                                <motion.tr 
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                                        <div className="flex items-center">
                                                            <svg className="w-4 h-4 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                                                            </svg>
                                                            <span className="truncate max-w-xs">{item.url}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-md dark:bg-red-900/30 dark:text-red-300">
                                                            {item.statusCode}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 truncate max-w-xs">
                                                        {item.foundOn}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-200">No broken links found</h3>
                                    <p className="mt-1 text-gray-500 dark:text-gray-400">Great job! Your website doesn't have any broken links.</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'orphanedPages' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {orphanedPages.length > 0 ? (
                                <div className="space-y-4">
                                    {orphanedPages.map((page, idx) => (
                                        <motion.div 
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                                            className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start dark:bg-amber-900/10 dark:border-amber-700/30"
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-4 dark:bg-amber-800/30">
                                                <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-800 dark:text-gray-200">Orphaned Page</h4>
                                                <p className="mt-1 text-amber-700 dark:text-amber-400 break-all">
                                                    {page}
                                                </p>
                                                <div className="mt-3">
                                                    <button className="text-xs font-medium text-amber-700 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 inline-flex items-center transition-colors duration-200">
                                                        <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                                                        </svg>
                                                        Suggested fix: Add internal links to this page
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-200">No orphaned pages found</h3>
                                    <p className="mt-1 text-gray-500 dark:text-gray-400">All pages on your website are properly linked.</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}