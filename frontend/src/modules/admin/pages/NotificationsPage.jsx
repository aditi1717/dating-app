import React, { useState } from 'react';
import { Bell, Send, Users, Crown, Clock, CheckCircle2, Trash2, Plus, X } from 'lucide-react';

const AUDIENCES = [
    { value: 'all', label: 'All Users', icon: Users, desc: 'Every registered user on the platform' },
    { value: 'premium', label: 'Premium Users', icon: Crown, desc: 'Only users with an active subscription' },
    { value: 'inactive', label: 'Inactive Users', icon: Clock, desc: 'Users inactive for 7+ days' },
];

const DUMMY_HISTORY = [
    { id: 1, title: 'New Matches Waiting!', body: 'You have 3 new people who liked your profile. Check them out now!', audience: 'All Users', sentAt: '22 Mar 2026, 10:30 AM', status: 'Sent' },
    { id: 2, title: 'Exclusive Premium Offer', body: 'Get 30% off on yearly plan — only for the next 48 hours!', audience: 'Inactive Users', sentAt: '20 Mar 2026, 2:00 PM', status: 'Sent' },
    { id: 3, title: 'Your Premium is Expiring', body: 'Your premium subscription expires in 3 days. Renew to keep access.', audience: 'Premium Users', sentAt: '18 Mar 2026, 9:00 AM', status: 'Sent' },
];

const defaultForm = { audience: 'all', title: '', body: '' };

const NotificationsPage = () => {
    const [history, setHistory] = useState(DUMMY_HISTORY);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(defaultForm);
    const [error, setError] = useState('');

    const openModal = () => { setForm(defaultForm); setError(''); setShowModal(true); };
    const closeModal = () => { setShowModal(false); setError(''); };

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.body.trim()) {
            setError('Title and message body are required.');
            return;
        }
        const audienceLabel = AUDIENCES.find((a) => a.value === form.audience)?.label || 'All Users';
        const newEntry = {
            id: Date.now(),
            title: form.title.trim(),
            body: form.body.trim(),
            audience: audienceLabel,
            sentAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
            status: 'Sent',
        };
        setHistory((prev) => [newEntry, ...prev]);
        closeModal();
    };

    const handleDelete = (id) => setHistory((prev) => prev.filter((h) => h.id !== id));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">Push Notifications</h1>
                    <p className="text-sm text-zinc-500 mt-1">Send targeted notifications to users directly from the admin panel.</p>
                </div>
                <button
                    onClick={openModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-black transition-colors shadow-sm self-start sm:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    New Notification
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-zinc-100 ring-1 ring-zinc-200 flex items-center justify-center mr-3.5">
                        <Bell className="w-5 h-5 text-zinc-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Sent</p>
                        <h3 className="text-xl font-medium text-zinc-900 leading-none">{history.length}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-blue-50 ring-1 ring-blue-100/50 flex items-center justify-center mr-3.5">
                        <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Broadcast</p>
                        <h3 className="text-xl font-medium text-zinc-900 leading-none">{history.filter((h) => h.audience === 'All Users').length}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-amber-50 ring-1 ring-amber-100/50 flex items-center justify-center mr-3.5">
                        <Crown className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Targeted</p>
                        <h3 className="text-xl font-medium text-zinc-900 leading-none">{history.filter((h) => h.audience !== 'All Users').length}</h3>
                    </div>
                </div>
            </div>

            {/* Sent History */}
            <section className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6">
                <h2 className="text-base font-semibold text-zinc-900 border-b border-zinc-100 pb-3 mb-4">Sent History</h2>
                {history.length === 0 ? (
                    <div className="text-center py-10">
                        <Bell className="w-8 h-8 text-zinc-300 mx-auto mb-3" />
                        <p className="text-sm text-zinc-500 font-medium">No notifications sent yet.</p>
                        <button onClick={openModal} className="mt-3 text-sm font-bold text-zinc-900 underline underline-offset-2 hover:text-black">
                            Send your first notification
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {history.map((h) => (
                            <div key={h.id} className="flex items-start justify-between gap-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 hover:shadow-sm transition-shadow group">
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-zinc-900 truncate">{h.title}</p>
                                        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{h.body}</p>
                                        <div className="flex flex-wrap gap-3 mt-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">→ {h.audience}</span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{h.sentAt}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(h.id)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-red-500 hover:bg-red-50 shrink-0"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Compose Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-[150] bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
                    onClick={closeModal}
                >
                    <div
                        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between gap-4 border-b border-zinc-100 pb-4 mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                                    <Bell className="w-4 h-4 text-zinc-600" />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-zinc-900">New Notification</h2>
                                    <p className="text-xs text-zinc-500 mt-0.5">Compose and send to your audience</p>
                                </div>
                            </div>
                            <button onClick={closeModal} className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSend} className="space-y-5">
                            {/* Audience */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-3">Target Audience</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {AUDIENCES.map(({ value, label, icon: Icon, desc }) => (
                                        <label
                                            key={value}
                                            className={`flex flex-col gap-1.5 p-3 rounded-xl border cursor-pointer transition-all ${form.audience === value ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900' : 'border-zinc-200 bg-white hover:border-zinc-400'}`}
                                        >
                                            <input type="radio" name="audience" value={value} checked={form.audience === value} onChange={handleChange} className="sr-only" />
                                            <div className="flex items-center gap-2">
                                                <Icon className={`w-4 h-4 ${form.audience === value ? 'text-zinc-900' : 'text-zinc-400'}`} />
                                                <span className={`text-xs font-semibold ${form.audience === value ? 'text-zinc-900' : 'text-zinc-600'}`}>{label}</span>
                                            </div>
                                            <p className="text-[10px] text-zinc-400 leading-snug">{desc}</p>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Notification Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="e.g. New Matches Waiting!"
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-zinc-400"
                                />
                            </div>

                            {/* Body */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Message Body</label>
                                <textarea
                                    name="body"
                                    value={form.body}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Write the notification message here..."
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-zinc-400 resize-none"
                                />
                            </div>

                            {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

                            {/* Actions */}
                            <div className="flex gap-3 pt-2 border-t border-zinc-100">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-100 text-zinc-700 text-sm font-bold hover:bg-zinc-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-black transition-colors shadow-sm"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Notification
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationsPage;
