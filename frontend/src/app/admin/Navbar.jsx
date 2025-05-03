'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verifyToken, logout } from '@/utils/auth';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AdminNavbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      const userData = await verifyToken();
      if (userData && userData.role === 'admin') {
        setUser(userData);
      } else {
        // If not an admin, redirect to login
        router.push('/login');
      }
    };
    
    authenticate();
    
    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Manage Users', href: '/admin/manage-users' },
    { label: 'Reports', href: '/admin/reports' },
    { label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm border-b border-gray-200 dark:border-gray-800' 
          : 'bg-gradient-to-r from-purple-600 to-indigo-600'
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
              <Link href="/admin" className="flex items-center">
                <svg
                  className="w-8 h-8 text-white dark:text-white"
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
                <span className={`ml-2 text-xl font-bold ${
                  scrolled 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent' 
                    : 'text-white'
                }`}>
                  PagePatrol <span className="text-sm font-normal bg-white/20 px-2 py-0.5 rounded-md ml-2">Admin</span>
                </span>
              </Link>
            </motion.div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                {navItems.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={item.href}
                      className={`relative px-3 py-2 rounded-lg text-sm font-medium ${
                        scrolled 
                          ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50 dark:text-gray-200 dark:hover:text-purple-400 dark:hover:bg-purple-900/20' 
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      } transition-colors duration-200`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center">
                {user && (
                  <div className={`flex items-center mr-4 ${scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'}`}>
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 12l-4 4-4-4"></path>
                        <line x1="18" y1="8" x2="18" y2="16"></line>
                      </svg>
                    </div>
                    <span className="font-medium">{user.name || user.email}</span>
                  </div>
                )}
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                    scrolled 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                  } transition-colors duration-200`}
                >
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </motion.button>
              </div>
            </div>
          </div>
          
          <div className="flex md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800' 
                  : 'text-white hover:bg-white/10'
              }`}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
          scrolled 
            ? 'bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800' 
            : 'bg-purple-700'
        }`}
        >
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              whileTap={{ scale: 0.98 }}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                scrolled 
                  ? 'text-gray-700 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-900/20 dark:hover:text-purple-400' 
                  : 'text-white hover:bg-purple-600'
              }`}
            >
              {item.label}
            </motion.a>
          ))}
          
          <motion.button
            onClick={handleLogout}
            whileTap={{ scale: 0.98 }}
            className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${
              scrolled 
                ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20' 
                : 'text-white hover:bg-purple-600'
            }`}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </div>
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default AdminNavbar;