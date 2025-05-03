'use client';
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 pt-12 md:pt-16 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-violet-600"></div>
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-indigo-100/20 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4 dark:from-indigo-900/10"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-purple-100/20 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4 dark:from-purple-900/10"></div>
            
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
                <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/" className="flex items-center mb-6">
                            <svg
                                className="w-8 h-8 text-indigo-500"
                                viewBox="0 0 24 24"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeMiterlimit={10}
                                stroke="currentColor"
                                fill="none"
                            >
                                <rect x={3} y={1} width={7} height={12} />
                                <rect x={3} y={17} width={7} height={6} />
                                <rect x={14} y={1} width={7} height={6} />
                                <rect x={14} y={11} width={7} height={12} />
                            </svg>
                            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                PagePatrol
                            </span>
                        </Link>
                        <p className="text-base text-gray-500 dark:text-gray-400 mb-4">
                            Keep your website error-free and healthy with automated broken link and orphaned page detection.
                        </p>
                        <div className="flex items-center space-x-4">
                            {['twitter', 'instagram', 'facebook', 'linkedin'].map((social) => (
                                <motion.a
                                    key={social}
                                    href={`https://${social}.com/pagepatrol`}
                                    whileHover={{ y: -3, color: '#6366f1' }}
                                    className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-all"
                                    aria-label={`${social} profile`}
                                >
                                    {social === 'twitter' && (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                            <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                                        </svg>
                                    )}
                                    {social === 'instagram' && (
                                        <svg viewBox="0 0 30 30" fill="currentColor" className="h-5 w-5">
                                            <circle cx={15} cy={15} r={4} />
                                            <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                                        </svg>
                                    )}
                                    {social === 'facebook' && (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                            <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                                        </svg>
                                    )}
                                    {social === 'linkedin' && (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                                        </svg>
                                    )}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-lg font-semibold tracking-wide text-gray-800 dark:text-gray-200 mb-4">
                            Features
                        </p>
                        <ul className="space-y-2">
                            {['Broken Link Detection', 'Orphaned Page Finder', 'SEO Impact Analysis', 'Fix Recommendations'].map((item) => (
                                <li key={item}>
                                    <Link 
                                        href="/features" 
                                        className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 inline-flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-lg font-semibold tracking-wide text-gray-800 dark:text-gray-200 mb-4">
                            Resources
                        </p>
                        <ul className="space-y-2">
                            {['Documentation', 'API Reference', 'Blog', 'Support'].map((item) => (
                                <li key={item}>
                                    <Link 
                                        href={`/${item.toLowerCase()}`}
                                        className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 inline-flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="sm:col-span-2 lg:col-span-1"
                    >
                        <p className="text-lg font-semibold tracking-wide text-gray-800 dark:text-gray-200 mb-4">
                            Subscribe to our newsletter
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Get the latest updates, tips and product announcements.
                        </p>
                        <form className="mt-4 space-y-3">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    placeholder="Enter your email"
                                    required
                                    type="email"
                                    className="w-full px-4 py-2 transition-all duration-300 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium rounded-lg transition-all duration-300 whitespace-nowrap"
                                >
                                    Subscribe
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
                
                <div className="pt-5 pb-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
                            © {new Date().getFullYear()} PagePatrol. All rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                            {['Terms', 'Privacy', 'Cookies'].map((item) => (
                                <Link 
                                    key={item}
                                    href={`/${item.toLowerCase()}`} 
                                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer