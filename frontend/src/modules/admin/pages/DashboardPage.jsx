import React from 'react';
import { Users, UserPlus, Heart, TrendingUp, MoreVertical } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, changeType }) => {
    const isPositive = changeType === 'positive';
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <div className="flex items-end space-x-2">
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                    <span className={`text-sm font-medium mb-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {change}
                    </span>
                </div>
            </div>
            <div className={`p-4 rounded-full ${isPositive ? 'bg-purple-50' : 'bg-orange-50'}`}>
                <Icon className={`w-6 h-6 ${isPositive ? 'text-purple-600' : 'text-orange-500'}`} />
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
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">Here's what's happening in your app today.</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm">
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
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-800">User Growth</h2>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="w-full h-80 bg-gray-50 rounded-lg border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                        <TrendingUp className="w-8 h-8 mb-2 text-purple-300" />
                        <span>Chart Visualization Area</span>
                        <span className="text-sm mt-1 text-gray-400">(Requires Chart.js or Recharts)</span>
                    </div>
                </div>

                {/* Recent Activity / Users */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-800">Recent Users</h2>
                        <button className="text-sm text-purple-600 font-medium hover:text-purple-700">View All</button>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {recentUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 font-bold uppercase">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{user.name}, {user.age}</p>
                                        <p className="text-xs text-gray-500">{user.location}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${user.status === 'Premium' ? 'bg-purple-100 text-purple-800' :
                                        user.status === 'New' ? 'bg-green-100 text-green-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {user.status}
                                    </span>
                                    <p className="text-xs text-gray-500 mt-1">{user.matchCount} Matches</p>
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
