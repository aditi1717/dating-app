import React, { useEffect, useState } from 'react';
import { Clock3, ShieldCheck, ToggleLeft, ToggleRight, Users, Activity } from 'lucide-react';
import { defaultAdminQueueSettings, loadAdminQueueSettings, saveAdminQueueSettings } from '../../../lib/adminQueue';

const ToggleRow = ({ icon: Icon, title, description, checked, onChange }) => (
    <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-50 text-zinc-600 border border-zinc-200 shadow-sm flex items-center justify-center">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-base font-bold text-zinc-900">{title}</h3>
                <p className="text-sm text-zinc-500 mt-1 max-w-xl pr-4">{description}</p>
            </div>
        </div>

        <button
            type="button"
            onClick={onChange}
            className={`flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 transition-colors border shadow-sm ${checked ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' : 'bg-white border-zinc-300 text-zinc-600 hover:bg-zinc-50'}`}
            aria-pressed={checked}
        >
            {checked ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6 text-zinc-400" />}
            <span className="text-sm font-bold w-8 text-left">{checked ? 'ON' : 'OFF'}</span>
        </button>
    </div>
);

const QueueManagementPage = () => {
    const [settings, setSettings] = useState(defaultAdminQueueSettings);
    const [savedMessage, setSavedMessage] = useState('');

    useEffect(() => {
        setSettings(loadAdminQueueSettings());
    }, []);

    const updateSetting = (key) => {
        const nextSettings = {
            ...settings,
            [key]: !settings[key],
        };

        setSettings(nextSettings);
        saveAdminQueueSettings(nextSettings);
        setSavedMessage('Queue settings updated successfully.');
        
        // Hide message after 3 seconds
        setTimeout(() => setSavedMessage(''), 3000);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">Queue Management</h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        Control platform entry flow and queued user feature access.
                    </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center min-w-[200px]">
                    <div className={`p-2.5 rounded-lg ring-1 flex items-center justify-center mr-3.5 ${settings.holdLikesQueue ? 'bg-red-50 ring-red-100/50' : 'bg-emerald-50 ring-emerald-100/50'}`}>
                        <Activity className={`w-5 h-5 ${settings.holdLikesQueue ? 'text-red-600' : 'text-emerald-600'}`} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">Queue Status</p>
                        <h3 className="text-sm font-bold text-zinc-900 tracking-tight leading-none">
                            {settings.holdLikesQueue ? 'Queue lock active' : 'Queue open'}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
                <section className="space-y-4">
                    <ToggleRow
                        icon={Users}
                        title="Allow New User Signups"
                        description="Controls the main registration gateway. If turned off, no new accounts can be created on the platform."
                        checked={settings.allowNewSignups}
                        onChange={() => updateSetting('allowNewSignups')}
                    />

                    <ToggleRow
                        icon={Clock3}
                        title="Hold Likes In Queue"
                        description="When enabled, users who are registered are placed in a holding pattern where they cannot see received likes until the queue opens."
                        checked={settings.holdLikesQueue}
                        onChange={() => updateSetting('holdLikesQueue')}
                    />

                    <div className="mt-6 rounded-2xl bg-zinc-900 text-white p-6 shadow-xl relative overflow-hidden">
                        {/* Decorative background element overlay */}
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldCheck className="w-32 h-32" />
                        </div>

                        <div className="relative z-10 flex items-start gap-4">
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-white/10 border border-white/20 shadow-sm flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">How Queue Control Works</h2>
                                <p className="text-sm text-zinc-300 mt-2 leading-relaxed max-w-2xl">
                                    Keep signups enabled if you want growth to continue accumulating in the database. Use the <strong>"Hold Likes In Queue"</strong> toggle to strategically delay the visibility of inbound likes until the platform logic validates them or you are ready for a full access launch.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 flex flex-col h-full">
                    <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-4 mb-5">Current Policy Map</h2>
                    
                    <div className="space-y-4 flex-1">
                        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm transition-colors hover:bg-zinc-100/50">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-2">Registration Access</p>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${settings.allowNewSignups ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                <p className="text-sm font-bold text-zinc-900">
                                    {settings.allowNewSignups ? 'New user signup is allowed' : 'New user signup is restricted'}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm transition-colors hover:bg-zinc-100/50">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-2">Social Feature Visibility</p>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${settings.holdLikesQueue ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                                <p className="text-sm font-bold text-zinc-900 leading-tight">
                                    {settings.holdLikesQueue ? 'Incoming likes hidden behind queue' : 'Full access to view all likes'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="min-h-[24px] mt-6">
                        {savedMessage && (
                            <div className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" />
                                {savedMessage}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default QueueManagementPage;
