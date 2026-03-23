import React, { useState, useEffect } from 'react';
import { Settings, ToggleLeft, ToggleRight, Save, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'amora_app_config';

const defaultConfig = {
    maintenanceMode: false,
    allowNewSignups: true,
    dailyFreeLikeLimit: 10,
    maxPhotosPerUser: 6,
    minAppVersion: '1.0.0',
    profileVisibilityRadius: 100,
    maxAgeGap: 20,
    superLikesPerDay: 1,
    boostsPerWeek: 1,
};

const loadConfig = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? { ...defaultConfig, ...JSON.parse(saved) } : defaultConfig;
    } catch {
        return defaultConfig;
    }
};

const AppConfigPage = () => {
    const [config, setConfig] = useState(defaultConfig);
    const [saved, setSaved] = useState(false);

    useEffect(() => { setConfig(loadConfig()); }, []);

    const handleToggle = (key) => {
        setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
        setSaved(false);
    };

    const handleNumber = (e) => {
        setConfig((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setSaved(false);
    };

    const handleText = (e) => {
        setConfig((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setSaved(false);
    };

    const handleSave = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleReset = () => {
        setConfig(defaultConfig);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultConfig));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const ToggleRow = ({ label, desc, configKey }) => (
        <div className="flex items-center justify-between gap-4 py-4 border-b border-zinc-100 last:border-0">
            <div>
                <p className="text-sm font-semibold text-zinc-900">{label}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
            </div>
            <button
                type="button"
                onClick={() => handleToggle(configKey)}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 border text-sm font-bold transition-all ${config[configKey] ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-zinc-300 text-zinc-500'}`}
            >
                {config[configKey] ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5 text-zinc-400" />}
                {config[configKey] ? 'ON' : 'OFF'}
            </button>
        </div>
    );

    const NumberField = ({ label, desc, name, min, max, unit }) => (
        <div className="py-4 border-b border-zinc-100 last:border-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-zinc-900">{label}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <input
                        type="number"
                        name={name}
                        value={config[name]}
                        onChange={handleNumber}
                        min={min}
                        max={max}
                        className="w-24 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 font-semibold outline-none focus:border-black focus:ring-1 focus:ring-black text-center"
                    />
                    {unit && <span className="text-xs text-zinc-500 font-semibold">{unit}</span>}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">App Configuration</h1>
                    <p className="text-sm text-zinc-500 mt-1">Control platform-wide settings without touching code.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleReset} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-700 text-sm font-bold hover:bg-zinc-50 transition-colors">
                        <RotateCcw className="w-4 h-4" />
                        Reset Defaults
                    </button>
                    <button onClick={handleSave} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-black transition-colors shadow-sm">
                        <Save className="w-4 h-4" />
                        {saved ? 'Saved!' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Platform Access */}
                <section className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6">
                    <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                            <Settings className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-zinc-900">Platform Access</h2>
                            <p className="text-xs text-zinc-500 mt-0.5">Control who can access the platform</p>
                        </div>
                    </div>
                    <ToggleRow
                        label="Maintenance Mode"
                        desc="When ON, all users see a maintenance screen instead of the app."
                        configKey="maintenanceMode"
                    />
                    <ToggleRow
                        label="Allow New Signups"
                        desc="Turn OFF to stop new user registrations."
                        configKey="allowNewSignups"
                    />
                </section>

                {/* Discovery Limits */}
                <section className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6">
                    <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                            <Settings className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-zinc-900">Discovery Limits</h2>
                            <p className="text-xs text-zinc-500 mt-0.5">Set default limits for free users</p>
                        </div>
                    </div>
                    <NumberField label="Daily Free Like Limit" desc="Max likes a free user can send per day." name="dailyFreeLikeLimit" min={1} max={100} unit="likes/day" />
                    <NumberField label="Super Likes Per Day" desc="Number of super likes per user per day." name="superLikesPerDay" min={0} max={10} unit="per day" />
                    <NumberField label="Discovery Radius" desc="Default max search radius in kilometres." name="profileVisibilityRadius" min={1} max={500} unit="km" />
                    <NumberField label="Max Age Gap" desc="Maximum allowed age gap in years for matches." name="maxAgeGap" min={1} max={50} unit="years" />
                </section>

                {/* Profile Settings */}
                <section className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6">
                    <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                            <Settings className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-zinc-900">Profile Settings</h2>
                            <p className="text-xs text-zinc-500 mt-0.5">Control user profile upload limits</p>
                        </div>
                    </div>
                    <NumberField label="Max Photos Per User" desc="Maximum gallery images a user can upload." name="maxPhotosPerUser" min={1} max={20} unit="photos" />
                    <NumberField label="Boosts Per Week" desc="Free profile boosts given to each user per week." name="boostsPerWeek" min={0} max={10} unit="per week" />
                </section>

                {/* App Version */}
                <section className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6">
                    <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                            <Settings className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-zinc-900">Version Control</h2>
                            <p className="text-xs text-zinc-500 mt-0.5">Set minimum app version required</p>
                        </div>
                    </div>
                    <div className="py-4">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Minimum App Version</label>
                        <input
                            type="text"
                            name="minAppVersion"
                            value={config.minAppVersion}
                            onChange={handleText}
                            placeholder="e.g. 1.2.0"
                            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 font-semibold outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-zinc-400"
                        />
                        <p className="text-xs text-zinc-500 mt-2">Users on older versions will be forced to update.</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AppConfigPage;
