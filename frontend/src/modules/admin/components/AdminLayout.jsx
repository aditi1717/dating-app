import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu, Bell, Search, User } from 'lucide-react';

const AdminLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#fff6fb] font-sans">
            {/* Sidebar - hidden on mobile by default */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[linear-gradient(135deg,#fff7fb_0%,#ffe7f1_38%,#ffd9ea_100%)] relative">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,74,140,0.18),transparent_28%),radial-gradient(circle_at_left_center,rgba(255,171,208,0.26),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />

                {/* Top Header */}
                <header className="bg-white/78 backdrop-blur-xl border-b border-white/70 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 transition-shadow shadow-[0_10px_30px_rgba(255,76,144,0.08)]">

                    {/* Left part: Mobile Menu Toggle & Search */}
                    <div className="flex items-center flex-1">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 -ml-2 mr-2 text-[#8d4c6f] hover:text-[#d81b60] rounded-md hover:bg-white/70"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="relative w-full max-w-md hidden sm:block">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-[#c5769b]" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="block w-full pl-10 pr-3 py-2.5 border border-[#f2bfd4] rounded-2xl leading-5 bg-white/80 placeholder-[#a56a88] text-[#5a2843] focus:outline-none focus:ring-2 focus:ring-[#ff4d94]/30 focus:border-[#ff4d94] sm:text-sm transition-colors shadow-[0_8px_24px_rgba(255,77,148,0.08)]"
                            />
                        </div>
                    </div>

                    {/* Right part: Notifications & Profile */}
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-[#b47b96] hover:text-[#d81b60] relative bg-white/80 rounded-full border border-white/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4d94] shadow-[0_8px_20px_rgba(255,77,148,0.08)]">
                            <span className="sr-only">View notifications</span>
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-[#b02bff] ring-2 ring-white"></span>
                        </button>

                        <div className="relative">
                            <button className="flex items-center max-w-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4d94] rounded-full">
                                <span className="sr-only">Open user menu</span>
                                <div className="w-8 h-8 rounded-full bg-[linear-gradient(135deg,#fff1f7_0%,#f7d7ff_100%)] flex items-center justify-center text-[#c61f78] border border-[#efc4d8] shadow-[0_8px_20px_rgba(255,77,148,0.08)]">
                                    <User className="w-5 h-5" />
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
