import React, { useState } from 'react';
import { Eye, EyeOff, Globe, Lock, Save, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'amora_admin_settings';

const defaultSettings = {
    supportEmail: 'support@amora.app',
    defaultLanguage: 'English',
    timezone: 'Asia/Kolkata',
    sessionTimeout: '30',
};

const loadSettings = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
        return defaultSettings;
    }
};

const AdminSettingsPage = () => {
    const [settings, setSettings] = useState(loadSettings);
    const [saved, setSaved] = useState('');
    const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
    const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
    const [pwMsg, setPwMsg] = useState({ text: '', type: '' });
    const [isPasswordEditing, setIsPasswordEditing] = useState(false);

    const updateField = (event) => {
        const { name, value } = event.target;
        setSettings((prev) => ({ ...prev, [name]: value }));
        setSaved('');
    };

    const handleSave = () => {
        if (!settings.supportEmail.trim() || !settings.defaultLanguage.trim() || !settings.timezone.trim()) {
            setSaved('error');
            return;
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        setSaved('success');
        window.setTimeout(() => setSaved(''), 2500);
    };

    const handlePwChange = (event) => {
        const { name, value } = event.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
        setPwMsg({ text: '', type: '' });
    };

    const toggleShow = (field) => setShow((prev) => ({ ...prev, [field]: !prev[field] }));

    const handlePasswordSave = (event) => {
        event.preventDefault();
        if (!passwords.current || !passwords.newPass || !passwords.confirm) {
            setPwMsg({ text: 'All fields are required.', type: 'error' });
            return;
        }
        if (passwords.newPass.length < 6) {
            setPwMsg({ text: 'New password must be at least 6 characters.', type: 'error' });
            return;
        }
        if (passwords.newPass !== passwords.confirm) {
            setPwMsg({ text: 'New password and confirmation do not match.', type: 'error' });
            return;
        }

        setPasswords({ current: '', newPass: '', confirm: '' });
        setIsPasswordEditing(false);
        setPwMsg({ text: 'Password updated successfully.', type: 'success' });
        window.setTimeout(() => setPwMsg({ text: '', type: '' }), 2500);
    };

    const handlePasswordEditStart = () => {
        setIsPasswordEditing(true);
        setPwMsg({ text: '', type: '' });
    };

    const handlePasswordCancel = () => {
        setIsPasswordEditing(false);
        setPasswords({ current: '', newPass: '', confirm: '' });
        setShow({ current: false, newPass: false, confirm: false });
        setPwMsg({ text: '', type: '' });
    };

    const PasswordInput = ({ label, name, placeholder }) => (
        <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">{label}</span>
            <div className="relative">
                <input
                    type={show[name] ? 'text' : 'password'}
                    name={name}
                    value={passwords[name]}
                    onChange={handlePwChange}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 pr-11 text-sm text-zinc-900 outline-none focus:border-zinc-800 focus:ring-1 focus:ring-zinc-800"
                />
                <button
                    type="button"
                    onClick={() => toggleShow(name)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                >
                    {show[name] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
        </label>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-medium tracking-tight text-zinc-900">Admin Settings</h1>
                <p className="mt-1 text-sm text-zinc-500">Manage admin panel preferences and save them locally.</p>
            </div>

            <div className="mx-auto max-w-4xl space-y-6">
                <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3 border-b border-zinc-100 pb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100">
                            <Globe className="h-5 w-5 text-zinc-700" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-zinc-900">General Settings</h2>
                            <p className="text-xs text-zinc-500">Edit the basic admin dashboard preferences.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block">
                            <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">Support Email</span>
                            <input
                                type="email"
                                name="supportEmail"
                                value={settings.supportEmail}
                                onChange={updateField}
                                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-800 focus:ring-1 focus:ring-zinc-800"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">Default Language</span>
                            <input
                                type="text"
                                name="defaultLanguage"
                                value={settings.defaultLanguage}
                                onChange={updateField}
                                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-800 focus:ring-1 focus:ring-zinc-800"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">Timezone</span>
                            <input
                                type="text"
                                name="timezone"
                                value={settings.timezone}
                                onChange={updateField}
                                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-800 focus:ring-1 focus:ring-zinc-800"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">Session Timeout (minutes)</span>
                            <input
                                type="number"
                                min="5"
                                name="sessionTimeout"
                                value={settings.sessionTimeout}
                                onChange={updateField}
                                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-800 focus:ring-1 focus:ring-zinc-800"
                            />
                        </label>
                    </div>

                    <div className="mt-5 flex items-center justify-between pt-2">
                        <div className="min-h-5 text-sm font-semibold">
                            {saved === 'success' && <span className="text-emerald-600">Settings saved successfully.</span>}
                            {saved === 'error' && <span className="text-red-600">Please fill all required fields.</span>}
                        </div>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
                        >
                            <Save className="h-4 w-4" />
                            Save Settings
                        </button>
                    </div>
                </section>

                <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3 border-b border-zinc-100 pb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100">
                            <Lock className="h-5 w-5 text-zinc-700" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-zinc-900">Change Password</h2>
                            <p className="text-xs text-zinc-500">Use a strong password with 6+ characters.</p>
                        </div>
                    </div>

                    {!isPasswordEditing ? (
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-zinc-900">Password is protected</p>
                                <p className="mt-1 text-xs text-zinc-500">Start editing only when you want to update it.</p>
                            </div>
                            <button
                                type="button"
                                onClick={handlePasswordEditStart}
                                className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
                            >
                                <ShieldCheck className="h-4 w-4" />
                                Change Password
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handlePasswordSave} className="space-y-4">
                            <PasswordInput label="Current Password" name="current" placeholder="Enter current password" />
                            <PasswordInput label="New Password" name="newPass" placeholder="Enter new password (6+ chars)" />
                            <PasswordInput label="Confirm New Password" name="confirm" placeholder="Re-enter new password" />

                            <div className="flex items-center justify-between pt-2">
                                <div className="min-h-5 text-sm font-semibold">
                                    {pwMsg.text && (
                                        <span className={pwMsg.type === 'success' ? 'text-emerald-600' : 'text-red-600'}>
                                            {pwMsg.text}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handlePasswordCancel}
                                        className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-bold text-zinc-700 transition-colors hover:bg-zinc-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
                                    >
                                        <ShieldCheck className="h-4 w-4" />
                                        Save Password
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AdminSettingsPage;
