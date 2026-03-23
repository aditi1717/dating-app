import React from 'react';
import { Users, UserPlus, Heart, TrendingUp, MoreVertical } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, iconBg, iconColor, ringColor }) => {
    return (
        <div className={`${iconBg} rounded-xl shadow-sm border border-white p-4 xl:p-5 flex flex-col justify-between hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between mb-3">
                <p className={`text-sm font-medium tracking-wide ${iconColor.replace('600', '700')}`}>{title}</p>
                <div className={`p-2 rounded-xl bg-white shadow-sm ring-1 ${ringColor} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
                </div>
            </div>
            <div>
                <h3 className={`text-2xl sm:text-3xl font-medium tracking-tight leading-none ${iconColor.replace('text-', 'text-').replace('600', '900')}`}>{value}</h3>
            </div>
        </div>
    );
};

const DashboardPage = () => {
    // Mock Data
    const recentUsers = [
        { id: 1, name: 'Emma Wilson', age: 24, location: 'New York', status: 'Active', matchCount: 15 },
        { id: 2, name: 'James Rodriguez', age: 28, location: 'Los Angeles', status: 'Premium', matchCount: 42 },
        { id: 3, name: 'Sophia Chen', age: 22, location: 'San Francisco', status: 'New', matchCount: 3 },
        { id: 4, name: 'Liam Davies', age: 31, location: 'London', status: 'Active', matchCount: 28 },
        { id: 5, name: 'Ava Martinez', age: 26, location: 'Miami', status: 'Active', matchCount: 19 },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-sm text-zinc-500 mt-1">
                    Welcome back! Here's a snapshot of your platform's current performance and activity.
                </p>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="Total Users" value="12,482" icon={Users} 
                    iconBg="bg-blue-50" iconColor="text-blue-600" ringColor="ring-blue-100/50"
                />
                <StatCard 
                    title="New Signups" value="842" icon={UserPlus} 
                    iconBg="bg-emerald-50" iconColor="text-emerald-600" ringColor="ring-emerald-100/50"
                />
                <StatCard 
                    title="Active Matches" value="45,912" icon={Heart} 
                    iconBg="bg-indigo-50" iconColor="text-indigo-600" ringColor="ring-indigo-100/50"
                />
                <StatCard 
                    title="Premium Revenue" value="₹14,580" icon={TrendingUp} 
                    iconBg="bg-amber-50" iconColor="text-amber-600" ringColor="ring-amber-100/50"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Placeholder for Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-zinc-200 p-3.5 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-bold text-zinc-900">User Growth</h2>
                    </div>
                    <div className="flex-1 min-h-[140px] w-full bg-zinc-50 rounded-lg border border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-400">
                        <TrendingUp className="w-5 h-5 mb-1.5 text-zinc-300" />
                        <span className="text-[13px] font-medium">Chart Visualization Area</span>
                    </div>
                </div>

                {/* Recent Activity / Users */}
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-3.5 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-bold text-zinc-900">Recent Users</h2>
                        <button className="text-[11px] text-zinc-600 font-semibold uppercase tracking-wider hover:text-zinc-900 transition-colors">View All</button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2.5">
                        {recentUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between group">
                                <div className="flex items-center space-x-2.5">
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 text-xs font-bold uppercase group-hover:bg-zinc-200 transition-colors">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-semibold text-zinc-900 leading-tight">{user.name}, {user.age}</p>
                                        <p className="text-[11px] text-zinc-500 mt-0.5">{user.location}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                                        user.status === 'Premium' ? 'bg-zinc-900 text-white' :
                                        user.status === 'New' ? 'bg-green-50 text-green-700' :
                                            'bg-zinc-100 text-zinc-700'
                                    }`}>
                                        {user.status}
                                    </span>
                                    <p className="text-[11px] text-zinc-500 mt-1">{user.matchCount} Matches</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;
