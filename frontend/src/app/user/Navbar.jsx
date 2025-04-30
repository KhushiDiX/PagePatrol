'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IconHome, IconUser, IconHistory, IconLogout, IconMenu2 } from '@tabler/icons-react';

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-xl font-bold">PagePatrol</a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/user/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Dashboard
                </a>
                <a
                  href="/user/profile"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Profile
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center">
                {user && (
                  <span className="mr-2">{user.name || user.email}</span>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-700 hover:bg-blue-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              <IconMenu2 className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/user/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              <div className="flex items-center">
                <IconHome className="mr-2 h-5 w-5" />
                Dashboard
              </div>
            </a>
            <a
              href="/user/profile"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              <div className="flex items-center">
                <IconUser className="mr-2 h-5 w-5" />
                Profile
              </div>
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              <div className="flex items-center">
                <IconLogout className="mr-2 h-5 w-5" />
                Logout
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;