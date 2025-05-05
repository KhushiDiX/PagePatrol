'use client';
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <motion.div 
                            className="flex-shrink-0"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/" className="flex items-center">
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
                        </motion.div>
                        
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {['Home', 'About Us', 'Contact Us'].map((item, index) => (
                                    <motion.div
                                        key={item}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link 
                                            href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                            className={`relative px-3 py-2 text-sm font-medium ${
                                                scrolled 
                                                    ? 'text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400' 
                                                    : 'text-gray-100 hover:text-white'
                                            } transition-colors duration-200`}
                                        >
                                            {item}
                                            <motion.span 
                                                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500"
                                                initial={{ width: '0%' }}
                                                whileHover={{ width: '100%' }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6 space-x-3">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link 
                                    href="/login"
                                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                                        scrolled 
                                            ? 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                                            : 'text-white border border-white/30 hover:bg-white/10'
                                    } transition-colors duration-200`}
                                >
                                    Login
                                </Link>
                            </motion.div>
                            
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link 
                                    href="/signup"
                                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md hover:shadow-lg transition-all duration-200 hover:from-indigo-500 hover:to-purple-500"
                                >
                                    Sign up
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                    
                    <div className="flex md:hidden">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${
                                scrolled 
                                    ? 'text-gray-700 hover:bg-gray-100'
                                    : 'text-white hover:bg-white/10'
                            }`}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <motion.div 
                className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${scrolled ? 'bg-white dark:bg-gray-900' : 'bg-gray-900/80 backdrop-blur-sm'}`}>
                    {['Home', 'About Us', 'Contact Us'].map((item, index) => (
                        <motion.div
                            key={item}
                            whileTap={{ scale: 0.95 }}
                            className="block"
                        >
                            <Link 
                                href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    scrolled 
                                        ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                                        : 'text-gray-100 hover:text-white hover:bg-white/10'
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        </motion.div>
                    ))}
                    
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        <div className="space-y-2">
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className={`block w-full px-3 py-2 rounded-md text-center text-base font-medium ${
                                    scrolled 
                                        ? 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                                        : 'text-white border border-white/30 hover:bg-white/10'
                                }`}
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                onClick={() => setIsOpen(false)}
                                className="block w-full px-3 py-2 rounded-md text-center text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.nav>
    )
}

export default Navbar