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
        <aside className="w-64 h-screen bg-gradient-to-b from-[#ff2f74] via-[#f21663] to-[#d80f57] border-r border-[#f58ab1] flex flex-col hidden md:flex sticky top-0 shadow-[18px_0_40px_rgba(216,15,87,0.18)]">
            {/* Logo & Brand */}
            <div className="h-16 flex items-center px-6 border-b border-white/15 bg-white/5 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-xl bg-white/14 border border-white/20 flex items-center justify-center mr-3">
                    <Heart className="text-white w-5 h-5 fill-current" />
                </div>
                <div>
                    <span className="block text-lg font-extrabold text-white tracking-[0.08em] uppercase">Amora</span>
                    <span className="block text-[11px] font-medium text-white/70 tracking-[0.24em] uppercase">Admin Panel</span>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-3 py-2.5 rounded-lg transition-colors group ${isActive
                                ? 'bg-white text-[#e1145b] font-semibold shadow-[0_12px_30px_rgba(120,13,52,0.18)]'
                                : 'text-white/82 hover:bg-white/12 hover:text-white'
                                }`}
                        >
                            <Icon
                                className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors ${isActive ? 'text-[#e1145b]' : 'text-white/70 group-hover:text-white'
                                    }`}
                            />
                            {item.label}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Bottom User Area */}
            <div className="p-4 border-t border-white/15 bg-black/5">
                <button className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-white/82 rounded-xl hover:bg-white/12 hover:text-white transition-colors group">
                    <LogOut className="w-5 h-5 mr-3 text-white/70 group-hover:text-white" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
