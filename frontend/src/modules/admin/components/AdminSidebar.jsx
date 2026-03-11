import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    ShieldAlert,
    CreditCard,
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
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col hidden md:flex sticky top-0">
            {/* Logo & Brand */}
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <Heart className="text-purple-500 w-8 h-8 mr-2 fill-current" />
                <span className="text-xl font-bold text-gray-800 tracking-tight">DatingAdmin</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-3 py-2.5 rounded-lg transition-colors group ${isActive
                                ? 'bg-purple-50 text-purple-600 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <Icon
                                className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors ${isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-500'
                                    }`}
                            />
                            {item.label}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Bottom User Area */}
            <div className="p-4 border-t border-gray-200">
                <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors group">
                    <LogOut className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
