import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu, Bell, Search, User } from 'lucide-react';

const AdminLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-zinc-50 font-sans">
            {/* Sidebar - hidden on mobile by default */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-50 relative">

                {/* Top Header */}
                <header className="bg-zinc-800 border-b border-white/5 h-16 flex flex-shrink-0 items-center justify-between px-4 sm:px-6 lg:px-8 z-10">

                    {/* Left part: Mobile Menu Toggle & Title */}
                    <div className="flex items-center flex-1">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 -ml-2 mr-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="hidden sm:block text-lg font-medium text-white tracking-tight">Admin Panel</h2>
                    </div>

                    {/* Right part: Notifications & Profile */}
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-zinc-400 hover:text-white relative rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20">
                            <span className="sr-only">View notifications</span>
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-zinc-800"></span>
                        </button>

                        <div className="relative">
                            <button className="flex items-center focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full">
                                <span className="sr-only">Open user menu</span>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zinc-300 hover:bg-white/20 hover:text-white transition-colors">
                                    <User className="w-4 h-4" />
                                </div>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content Area Scrollable */}
                <main className="flex-1 overflow-y-auto w-full p-4 sm:p-6 lg:p-8 relative z-[1]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
