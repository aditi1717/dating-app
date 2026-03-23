import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    ShieldAlert,
    CreditCard,
    Clock3,
    Settings,
    LogOut,
    Heart
} from 'lucide-react';

const AdminSidebar = () => {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: ShieldAlert, label: 'Moderation', path: '/admin/moderation' },
        { icon: CreditCard, label: 'Subscriptions', path: '/admin/subscriptions' },
        { icon: Clock3, label: 'Queue Management', path: '/admin/queue-management' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <aside className="w-64 h-screen bg-zinc-900 text-zinc-300 border-r border-white/5 flex flex-col hidden md:flex sticky top-0 z-20">
            {/* Logo & Brand */}
            <div className="h-16 flex flex-shrink-0 items-center px-6 border-b border-white/5 bg-zinc-900">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3">
                    <Heart className="text-white w-4 h-4 fill-current" />
                </div>
                <div>
                    <span className="block text-lg font-medium text-white leading-none tracking-tight">Amora</span>
                    <span className="block text-[10px] font-medium text-zinc-500 mt-1 uppercase tracking-widest">Workspace</span>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1 custom-scrollbar">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-150 group ${isActive
                                ? 'bg-white/10 text-white font-medium'
                                : 'text-zinc-400 font-medium hover:bg-white/5 hover:text-zinc-100'
                                }`}
                        >
                            <Icon
                                strokeWidth={isActive ? 2 : 2}
                                className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                                    }`}
                            />
                            {item.label}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Bottom User Area */}
            <div className="p-3 border-t border-white/5 bg-zinc-900">
                <button className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-500 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors group">
                    <LogOut className="w-5 h-5 mr-3 text-red-500/70 group-hover:text-red-400" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
