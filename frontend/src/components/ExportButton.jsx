'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ExportButton({ data, filename = 'export', format = 'json' }) {
    const [isExporting, setIsExporting] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    const handleExport = (selectedFormat) => {
        setIsExporting(true);
        setTimeout(() => {
            try {
                let content, type, extension;
                
                switch (selectedFormat) {
                    case 'json':
                        content = JSON.stringify(data, null, 2);
                        type = 'application/json';
                        extension = 'json';
                        break;
                    case 'csv':
                        // Simple CSV conversion (assumes flat data structure)
                        const headers = Object.keys(data[0] || {}).join(',');
                        const rows = data.map(item => Object.values(item).join(',')).join('\n');
                        content = headers + '\n' + rows;
                        type = 'text/csv';
                        extension = 'csv';
                        break;
                    case 'text':
                        // Simple text conversion
                        content = JSON.stringify(data, null, 2);
                        type = 'text/plain';
                        extension = 'txt';
                        break;
                    default:
                        content = JSON.stringify(data, null, 2);
                        type = 'application/json';
                        extension = 'json';
                }
                
                const blob = new Blob([content], { type });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${filename}.${extension}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                setShowDropdown(false);
            } catch (error) {
                console.error('Export failed:', error);
            }
            
            setIsExporting(false);
        }, 600); // Simulate processing time
    };
    
    return (
        <div className="relative">
            <motion.button
                onClick={() => setShowDropdown(!showDropdown)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/70 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium flex items-center shadow-sm transition-all duration-200"
            >
                <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Results
                <svg className={`ml-2 w-4 h-4 transition-transform duration-200 ${showDropdown ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </motion.button>
            
            {showDropdown && (
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700 z-10"
                >
                    <div className="py-1">
                        {['json', 'csv', 'text'].map((fmt) => (
                            <motion.button
                                key={fmt}
                                whileHover={{ backgroundColor: 'rgba(79, 70, 229, 0.1)' }}
                                onClick={() => handleExport(fmt)}
                                disabled={isExporting}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 flex items-center hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400 transition-colors duration-150"
                            >
                                <FileIcon format={fmt} />
                                <span className="ml-2">Export as {fmt.toUpperCase()}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}
            
            {isExporting && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm mx-auto">
                        <div className="flex items-center">
                            <svg className="animate-spin h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-gray-800 dark:text-gray-200 font-medium">Preparing your export...</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

function FileIcon({ format }) {
    switch (format) {
        case 'json':
            return (
                <svg className="w-4 h-4 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        case 'csv':
            return (
                <svg className="w-4 h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
            );
        case 'text':
            return (
                <svg className="w-4 h-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        default:
            return (
                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
    }
}
