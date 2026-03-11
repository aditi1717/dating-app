import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu, Bell, Search, User } from 'lucide-react';

const AdminLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar - hidden on mobile by default */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 transition-shadow">

                    {/* Left part: Mobile Menu Toggle & Search */}
                    <div className="flex items-center flex-1">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 -ml-2 mr-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="relative w-full max-w-md hidden sm:block">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors"
                            />
                        </div>
                    </div>

                    {/* Right part: Notifications & Profile */}
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:text-gray-500 relative bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            <span className="sr-only">View notifications</span>
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-purple-500 ring-2 ring-white"></span>
                        </button>

                        <div className="relative">
                            <button className="flex items-center max-w-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded-full">
                                <span className="sr-only">Open user menu</span>
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 border border-purple-200">
                                    <User className="w-5 h-5" />
                                </div>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content Area Scrollable */}
                <main className="flex-1 overflow-y-auto w-full p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
