import React, { useEffect, useState } from 'react';
import { Ban, ChevronLeft, ChevronRight, ImageIcon, Mail, Phone, Search, ShieldCheck, Users, FileText, Layers } from 'lucide-react';
import { apiFetch } from '../../../lib/api';

const ADMIN_TOKEN_KEY = 'amora_admin_token';
const PAGE_SIZE = 6;

const ModerationPage = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalUsers: 0 });
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionMessage, setActionMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [banReasons, setBanReasons] = useState({});

    const fetchUsers = async (nextPage = page, nextSearch = search) => {
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem(ADMIN_TOKEN_KEY);
            const query = new URLSearchParams({
                page: String(nextPage),
                limit: String(PAGE_SIZE),
            });

            if (nextSearch.trim()) {
                query.set('search', nextSearch.trim());
            }

            const response = await apiFetch(`admin/users?${query.toString()}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Unable to load users');
            }

            setUsers(data.users || []);
            setPagination(data.pagination || { page: nextPage, totalPages: 1, totalUsers: 0 });
        } catch (fetchError) {
            setError(fetchError.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page, search);
    }, [page, search]);

    const submitSearch = (event) => {
        event.preventDefault();
        setPage(1);
        setSearch(searchInput);
    };

    const handleBanToggle = async (user, shouldBan) => {
        setActionMessage('');
        setError('');

        try {
            const token = localStorage.getItem(ADMIN_TOKEN_KEY);
            const endpoint = shouldBan ? `admin/users/${user._id}/ban` : `admin/users/${user._id}/unban`;
            const response = await apiFetch(endpoint, {
                method: 'PATCH',
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                body: JSON.stringify(
                    shouldBan
                        ? { reason: banReasons[user._id]?.trim() || 'Banned by admin moderation panel' }
                        : {}
                ),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Unable to update user status');
            }

            setUsers((currentUsers) =>
                currentUsers.map((currentUser) =>
                    currentUser._id === user._id ? data.user : currentUser
                )
            );
            setActionMessage(data.message || 'User updated successfully');
        } catch (actionError) {
            setError(actionError.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                    <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">Moderation Control</h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        Review user content, inspect imagery, and manage active bans.
                    </p>
                </div>

                <form onSubmit={submitSearch} className="w-full xl:w-[320px]">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(event) => setSearchInput(event.target.value)}
                            placeholder="Search by name, email, or phone"
                            className="w-full rounded-xl border border-zinc-300 bg-white pl-10 pr-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
                        />
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-blue-50 ring-1 ring-blue-100/50 flex items-center justify-center mr-3.5">
                        <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Total Users</p>
                        <h3 className="text-xl font-medium text-zinc-900 tracking-tight leading-none">{pagination.totalUsers}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-emerald-50 ring-1 ring-emerald-100/50 flex items-center justify-center mr-3.5">
                        <Layers className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Current Page</p>
                        <h3 className="text-xl font-medium text-zinc-900 tracking-tight leading-none">{pagination.page}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-indigo-50 ring-1 ring-indigo-100/50 flex items-center justify-center mr-3.5">
                        <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Total Pages</p>
                        <h3 className="text-xl font-medium text-zinc-900 tracking-tight leading-none">{pagination.totalPages}</h3>
                    </div>
                </div>
            </div>

            {(error || actionMessage) && (
                <div className={`rounded-xl px-4 py-3 border text-sm font-medium ${error ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-600'}`}>
                    {error || actionMessage}
                </div>
            )}

            <div className="space-y-4">
                {loading ? (
                    <div className="rounded-2xl bg-white border border-zinc-200 p-8 text-center text-sm font-medium text-zinc-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        Loading users...
                    </div>
                ) : users.length === 0 ? (
                    <div className="rounded-2xl bg-white border border-zinc-200 p-8 text-center text-sm font-medium text-zinc-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        No users found for this page.
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {users.map((user) => {
                            const allImages = [user.profilePicture, ...(user.galleryImages || []).map((image) => image.url)].filter(Boolean);

                            return (
                                <article
                                    key={user._id}
                                    className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md"
                                >
                                    <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                                        <div className="flex-1 space-y-5">
                                            <div className="flex items-start gap-4">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 font-bold text-xl shadow-sm">
                                                    {user.profilePicture ? (
                                                        <img src={user.profilePicture} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h2 className="text-lg font-bold text-zinc-900 leading-tight">
                                                            {user.firstName} {user.lastName}
                                                        </h2>
                                                        {user.isBanned ? (
                                                            <span className="inline-flex items-center rounded-md bg-red-100/80 text-red-700 px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase">
                                                                Banned
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center rounded-md bg-emerald-100/80 text-emerald-700 px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase">
                                                                Active
                                                            </span>
                                                        )}
                                                        {user.isPremium && (
                                                            <span className="inline-flex items-center rounded-md bg-amber-100/80 text-amber-800 px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase">
                                                                Premium
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="mt-2 flex flex-wrap gap-4 text-xs font-medium text-zinc-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <Mail className="w-3.5 h-3.5 text-zinc-400" />
                                                            <span>{user.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Phone className="w-3.5 h-3.5 text-zinc-400" />
                                                            <span>{user.phoneNumber}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {user.isBanned && (
                                                <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                                                    <span className="font-bold">Ban reason:</span> {user.banReason || 'Banned by admin panel'}
                                                </div>
                                            )}

                                            <div>
                                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
                                                    <ImageIcon className="w-4 h-4" />
                                                    Uploaded Images ({allImages.length})
                                                </div>

                                                {allImages.length ? (
                                                    <div className="flex flex-wrap gap-3">
                                                        {allImages.map((imageUrl, idx) => (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                onClick={() => setSelectedImage(imageUrl)}
                                                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 hover:opacity-80 transition-opacity shadow-sm"
                                                            >
                                                                <img src={imageUrl} alt="User upload" className="w-full h-full object-cover" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-sm font-medium text-zinc-400 border border-dashed border-zinc-200 rounded-xl p-4 inline-block bg-zinc-50">
                                                        No uploaded images yet.
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-full xl:w-[280px] shrink-0 rounded-xl border border-zinc-200 bg-zinc-50 p-4 space-y-4 shadow-sm">
                                            <div>
                                                <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-200 pb-2 mb-2">Moderation Action</h3>
                                                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                                                    Banning restricts this email and phone number from logging in.
                                                </p>
                                            </div>

                                            {!user.isBanned && (
                                                <textarea
                                                    value={banReasons[user._id] || ''}
                                                    onChange={(event) =>
                                                        setBanReasons((current) => ({
                                                            ...current,
                                                            [user._id]: event.target.value,
                                                        }))
                                                    }
                                                    rows="3"
                                                    placeholder="Reason for ban (required if banning)..."
                                                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
                                                />
                                            )}

                                            {user.isBanned ? (
                                                <button
                                                    type="button"
                                                    onClick={() => handleBanToggle(user, false)}
                                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-emerald-200 text-emerald-700 font-bold hover:bg-emerald-50 transition-colors shadow-sm text-sm"
                                                >
                                                    <ShieldCheck className="w-4 h-4" />
                                                    Unban User
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleBanToggle(user, true)}
                                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-sm text-sm"
                                                >
                                                    <Ban className="w-4 h-4" />
                                                    Ban User
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>

            {users.length > 0 && (
                <div className="flex items-center justify-between rounded-xl bg-white shadow-sm border border-zinc-200 px-5 py-3.5">
                    <button
                        type="button"
                        onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
                        disabled={page <= 1}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors shadow-sm"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>

                    <div className="text-sm font-semibold text-zinc-600">
                        Page {pagination.page} of {pagination.totalPages}
                    </div>

                    <button
                        type="button"
                        onClick={() => setPage((currentPage) => Math.min(currentPage + 1, pagination.totalPages))}
                        disabled={page >= pagination.totalPages}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors shadow-sm"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {selectedImage && (
                <div
                    className="fixed inset-0 z-[200] bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center p-6"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="max-w-4xl w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                        <button 
                            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors border border-white/20"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✕
                        </button>
                        <img src={selectedImage} alt="User upload preview" className="w-full max-h-[85vh] object-contain bg-zinc-900" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModerationPage;
