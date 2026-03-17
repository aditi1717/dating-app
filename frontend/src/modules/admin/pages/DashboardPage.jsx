import React from 'react';
import { Users, UserPlus, Heart, TrendingUp, MoreVertical } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, changeType }) => {
    const isPositive = changeType === 'positive';
    return (
        <div className="bg-white/82 backdrop-blur-xl rounded-[28px] shadow-[0_18px_45px_rgba(255,77,148,0.12)] border border-white/70 p-6 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-[#8b5d75] mb-1">{title}</p>
                <div className="flex items-end space-x-2">
                    <h3 className="text-2xl font-bold text-[#1f1633]">{value}</h3>
                    <span className={`text-sm font-medium mb-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {change}
                    </span>
                </div>
            </div>
            <div className={`p-4 rounded-full ${isPositive ? 'bg-[linear-gradient(135deg,#fff0f8_0%,#f7e2ff_100%)]' : 'bg-[linear-gradient(135deg,#fff5f1_0%,#ffe6d8_100%)]'}`}>
                <Icon className={`w-6 h-6 ${isPositive ? 'text-[#9b27ff]' : 'text-[#ff6a00]'}`} />
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

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#1d1533] tracking-tight">Dashboard Overview</h1>
                    <p className="text-sm text-[#7f5a73] mt-1">Here&apos;s what&apos;s happening in your app today.</p>
                </div>
                <button className="px-5 py-2.5 bg-[linear-gradient(135deg,#ff3f88_0%,#9b27ff_100%)] text-white rounded-2xl text-sm font-semibold hover:brightness-105 transition-colors shadow-[0_14px_30px_rgba(182,47,255,0.28)]">
                    Generate Report
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value="12,482" change="+12%" icon={Users} changeType="positive" />
                <StatCard title="New Signups" value="842" change="+5.4%" icon={UserPlus} changeType="positive" />
                <StatCard title="Active Matches" value="45,912" change="+24%" icon={Heart} changeType="positive" />
                <StatCard title="Premium Revenue" value="$14,580" change="-2.1%" icon={TrendingUp} changeType="negative" />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Placeholder for Chart */}
                <div className="lg:col-span-2 bg-white/82 backdrop-blur-xl rounded-[30px] shadow-[0_18px_45px_rgba(255,77,148,0.12)] border border-white/70 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-[#27193f]">User Growth</h2>
                        <button className="text-[#b18099] hover:text-[#d81b60]">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="w-full h-80 bg-[linear-gradient(180deg,rgba(255,236,245,0.9),rgba(255,255,255,0.75))] rounded-[24px] border border-dashed border-[#efc8d9] flex flex-col items-center justify-center text-[#9b7e90]">
                        <TrendingUp className="w-8 h-8 mb-2 text-[#d38cff]" />
                        <span>Chart Visualization Area</span>
                        <span className="text-sm mt-1 text-[#b394a6]">(Requires Chart.js or Recharts)</span>
                    </div>
                </div>

                {/* Recent Activity / Users */}
                <div className="bg-white/82 backdrop-blur-xl rounded-[30px] shadow-[0_18px_45px_rgba(255,77,148,0.12)] border border-white/70 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-[#27193f]">Recent Users</h2>
                        <button className="text-sm text-[#9b27ff] font-semibold hover:text-[#d81b60]">View All</button>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {recentUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-[linear-gradient(135deg,#f8ddf0_0%,#ead7ff_100%)] border border-[#ecc8da] flex items-center justify-center text-[#9b27ff] font-bold uppercase">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#1f1633]">{user.name}, {user.age}</p>
                                        <p className="text-xs text-[#8f6a80]">{user.location}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${user.status === 'Premium' ? 'bg-[#f2e2ff] text-[#8d2bff]' :
                                        user.status === 'New' ? 'bg-[#e0ffe8] text-[#159947]' :
                                            'bg-[#fff1f6] text-[#b53674]'
                                        }`}>
                                        {user.status}
                                    </span>
                                    <p className="text-xs text-[#8f6a80] mt-1">{user.matchCount} Matches</p>
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
