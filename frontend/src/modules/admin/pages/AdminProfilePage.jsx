import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ShieldCheck, Save } from 'lucide-react';

const ADMIN_TOKEN_KEY = 'amora_admin_token';
const ADMIN_PROFILE_KEY = 'amora_admin_profile';

const loadProfile = () => {
    try {
        const saved = localStorage.getItem(ADMIN_PROFILE_KEY);
        return saved ? JSON.parse(saved) : { name: 'Admin', email: 'admin@amora.app', role: 'Super Admin' };
    } catch {
        return { name: 'Admin', email: 'admin@amora.app', role: 'Super Admin' };
    }
};

const AdminProfilePage = () => {
    const [profile, setProfile] = useState(loadProfile);
    const [profileSaved, setProfileSaved] = useState('');

    const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
    const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
    const [pwMsg, setPwMsg] = useState({ text: '', type: '' });

    const handleProfileChange = (e) => {
        setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setProfileSaved('');
    };

    const handleProfileSave = (e) => {
        e.preventDefault();
        if (!profile.name.trim() || !profile.email.trim()) {
            setProfileSaved('error');
            return;
        }
        localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(profile));
        setProfileSaved('success');
        setTimeout(() => setProfileSaved(''), 3000);
    };

    const handlePwChange = (e) => {
        setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setPwMsg({ text: '', type: '' });
    };

    const toggleShow = (field) => setShow((prev) => ({ ...prev, [field]: !prev[field] }));

    const handlePasswordSave = (e) => {
        e.preventDefault();
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
        // In a real app, you'd call an API here
        setPasswords({ current: '', newPass: '', confirm: '' });
        setPwMsg({ text: 'Password updated successfully.', type: 'success' });
        setTimeout(() => setPwMsg({ text: '', type: '' }), 3000);
    };

    const PasswordInput = ({ label, name, placeholder }) => (
        <label className="block">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">{label}</span>
            <div className="relative">
                <input
                    type={show[name] ? 'text' : 'password'}
                    name={name}
                    value={passwords[name]}
                    onChange={handlePwChange}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 pr-11 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-zinc-400"
                />
                <button
                    type="button"
                    onClick={() => toggleShow(name)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                >
                    {show[name] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </label>
    );

    const avatarInitials = profile.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'AD';

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">Admin Profile</h1>
                <p className="text-sm text-zinc-500 mt-1">Manage your admin account details and password.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
                <div className="space-y-6">
                    {/* Profile Info */}
                    <section className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6">
                        <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                                <User className="w-5 h-5 text-zinc-600" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-zinc-900">Profile Information</h2>
                                <p className="text-xs text-zinc-500 mt-0.5">Update your display name and email</p>
                            </div>
                        </div>

                        <form onSubmit={handleProfileSave} className="space-y-4">
                            <label className="block">
                                <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Full Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleProfileChange}
                                    placeholder="Admin Name"
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-zinc-400"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Email Address</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleProfileChange}
                                    placeholder="admin@amora.app"
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-zinc-400"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Role</span>
                                <input
                                    type="text"
                                    value={profile.role}
                                    disabled
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-500 font-medium cursor-not-allowed"
                                />
                            </label>
                            <div className="flex items-center justify-between pt-2">
                                <div className="text-sm font-semibold min-h-5">
                                    {profileSaved === 'success' && <span className="text-emerald-600">Profile saved successfully!</span>}
                                    {profileSaved === 'error' && <span className="text-red-600">Name and email are required.</span>}
                                </div>
                                <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-black transition-colors shadow-sm">
                                    <Save className="w-4 h-4" />
                                    Save Profile
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Change Password */}
                    <section className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6">
                        <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-zinc-600" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-zinc-900">Change Password</h2>
                                <p className="text-xs text-zinc-500 mt-0.5">Use a strong password with 6+ characters</p>
                            </div>
                        </div>

                        <form onSubmit={handlePasswordSave} className="space-y-4">
                            <PasswordInput label="Current Password" name="current" placeholder="Enter current password" />
                            <PasswordInput label="New Password" name="newPass" placeholder="Enter new password (6+ chars)" />
                            <PasswordInput label="Confirm New Password" name="confirm" placeholder="Re-enter new password" />
                            <div className="flex items-center justify-between pt-2">
                                <div className="text-sm font-semibold min-h-5">
                                    {pwMsg.text && (
                                        <span className={pwMsg.type === 'success' ? 'text-emerald-600' : 'text-red-600'}>
                                            {pwMsg.text}
                                        </span>
                                    )}
                                </div>
                                <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-black transition-colors shadow-sm">
                                    <ShieldCheck className="w-4 h-4" />
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </section>
                </div>

                {/* Avatar card */}
                <aside className="space-y-4">
                    <section className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full bg-zinc-900 border-4 border-zinc-200 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">
                            {avatarInitials}
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900">{profile.name || 'Admin'}</h3>
                        <p className="text-sm text-zinc-500 mt-0.5">{profile.email}</p>
                        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {profile.role}
                        </div>
                    </section>

                    <section className="rounded-2xl bg-zinc-900 text-white p-5 shadow-xl">
                        <h3 className="text-sm font-bold mb-3">Password Tips</h3>
                        <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed">
                            <li>• Use at least 6 characters</li>
                            <li>• Mix uppercase and lowercase letters</li>
                            <li>• Add numbers and symbols (!@#$)</li>
                            <li>• Don't reuse old passwords</li>
                            <li>• Never share your password with anyone</li>
                        </ul>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default AdminProfilePage;
