import React, { useEffect, useState } from 'react';
import { Clock3, ShieldCheck, ToggleLeft, ToggleRight, Users } from 'lucide-react';
import { defaultAdminQueueSettings, loadAdminQueueSettings, saveAdminQueueSettings } from '../../../lib/adminQueue';

const ToggleRow = ({ icon: Icon, title, description, checked, onChange }) => (
    <div className="rounded-[28px] bg-white/82 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] p-5 flex items-center justify-between gap-4">
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[linear-gradient(135deg,#fff0f8_0%,#f7e2ff_100%)] text-[#c42471] flex items-center justify-center">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-base font-bold text-[#27193f]">{title}</h3>
                <p className="text-sm text-[#8f6a80] mt-1 max-w-xl">{description}</p>
            </div>
        </div>

        <button
            type="button"
            onClick={onChange}
            className={`flex items-center gap-2 rounded-full px-3 py-2 transition-colors ${checked ? 'bg-[#ffe5f1] text-[#d81b60]' : 'bg-[#f4ecf1] text-[#9d7a8e]'}`}
            aria-pressed={checked}
        >
            {checked ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
            <span className="text-sm font-semibold min-w-[42px] text-left">{checked ? 'On' : 'Off'}</span>
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
        setSavedMessage('Queue settings updated.');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#1d1533] tracking-tight">Queue Management</h1>
                    <p className="text-sm text-[#7f5a73] mt-1">
                        Control whether new users can join and whether queued users can see who liked them.
                    </p>
                </div>
                <div className="rounded-[24px] bg-white/82 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#b17a94]">Status</p>
                    <p className="text-base font-semibold text-[#25183d] mt-2">
                        {settings.holdLikesQueue ? 'Queue lock is active' : 'Likes are visible'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6">
                <section className="space-y-5">
                    <ToggleRow
                        icon={Users}
                        title="Allow New User Signups"
                        description="If this is off, new users should not be allowed to enter the platform flow. Keep this on if you still want people to register."
                        checked={settings.allowNewSignups}
                        onChange={() => updateSetting('allowNewSignups')}
                    />

                    <ToggleRow
                        icon={Clock3}
                        title="Hold Likes In Queue"
                        description="When this is on, users can still sign up but they will not see who liked them until the queue is turned off."
                        checked={settings.holdLikesQueue}
                        onChange={() => updateSetting('holdLikesQueue')}
                    />

                    <div className="rounded-[28px] bg-[linear-gradient(135deg,#ff4b91_0%,#9b27ff_100%)] text-white p-6 shadow-[0_18px_45px_rgba(182,47,255,0.28)]">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="w-6 h-6 mt-1" />
                            <div>
                                <h2 className="text-lg font-bold">How this works</h2>
                                <p className="text-sm text-white/80 mt-2 leading-6">
                                    Keep signups enabled if you want growth, and use the queue toggle to delay likes visibility until you are ready to open access.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-[30px] bg-white/82 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] p-6">
                    <h2 className="text-lg font-bold text-[#27193f]">Current Queue Policy</h2>
                    <p className="text-sm text-[#8f6a80] mt-1">This demo setting is stored locally and already affects the Likes page.</p>

                    <div className="mt-6 space-y-4">
                        <div className="rounded-[24px] border border-[#f3dbe6] bg-[#fff8fb] p-5">
                            <p className="text-xs uppercase tracking-[0.24em] text-[#b17a94]">Signup Access</p>
                            <p className="text-xl font-bold text-[#25183d] mt-2">
                                {settings.allowNewSignups ? 'New user signup is allowed' : 'New user signup is paused'}
                            </p>
                        </div>

                        <div className="rounded-[24px] border border-[#f3dbe6] bg-[#fff8fb] p-5">
                            <p className="text-xs uppercase tracking-[0.24em] text-[#b17a94]">Likes Visibility</p>
                            <p className="text-xl font-bold text-[#25183d] mt-2">
                                {settings.holdLikesQueue ? 'Queued users cannot see likes yet' : 'Users can view who liked them'}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 min-h-6 text-sm font-medium text-[#c33573]">{savedMessage}</div>
                </section>
            </div>
        </div>
    );
};

export default QueueManagementPage;
