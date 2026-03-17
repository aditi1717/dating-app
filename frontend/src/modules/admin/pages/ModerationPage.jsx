import React, { useEffect, useState } from 'react';
import { Ban, ChevronLeft, ChevronRight, ImageIcon, Mail, Phone, Search, ShieldCheck } from 'lucide-react';
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
                    <h1 className="text-2xl font-bold text-[#1d1533] tracking-tight">Moderation</h1>
                    <p className="text-sm text-[#7f5a73] mt-1">
                        Review users, inspect uploaded images, and ban or unban accounts by email and phone.
                    </p>
                </div>

                <form onSubmit={submitSearch} className="w-full xl:w-[360px]">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#c5769b]" />
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(event) => setSearchInput(event.target.value)}
                            placeholder="Search by name, email, or phone"
                            className="w-full rounded-2xl border border-[#f2bfd4] bg-white/80 pl-10 pr-4 py-3 text-[#4d2740] outline-none focus:border-[#ff4d94] focus:ring-2 focus:ring-[#ff4d94]/20"
                        />
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-[24px] bg-white/82 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#b17a94]">Total Users</p>
                    <p className="text-2xl font-bold text-[#25183d] mt-2">{pagination.totalUsers}</p>
                </div>
                <div className="rounded-[24px] bg-white/82 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#b17a94]">Current Page</p>
                    <p className="text-2xl font-bold text-[#25183d] mt-2">{pagination.page}</p>
                </div>
                <div className="rounded-[24px] bg-white/82 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#b17a94]">Pages</p>
                    <p className="text-2xl font-bold text-[#25183d] mt-2">{pagination.totalPages}</p>
                </div>
            </div>

            {(error || actionMessage) && (
                <div className={`rounded-[24px] px-5 py-4 border ${error ? 'bg-[#fff1f1] border-[#ffd2d2] text-[#b42318]' : 'bg-[#fff1f7] border-[#f6d6e5] text-[#c33573]'}`}>
                    {error || actionMessage}
                </div>
            )}

            <section className="rounded-[30px] bg-white/82 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] p-6">
                {loading ? (
                    <div className="text-[#8f6a80]">Loading users...</div>
                ) : users.length === 0 ? (
                    <div className="text-[#8f6a80]">No users found for this page.</div>
                ) : (
                    <div className="space-y-5">
                        {users.map((user) => {
                            const allImages = [user.profilePicture, ...(user.galleryImages || []).map((image) => image.url)].filter(Boolean);

                            return (
                                <article
                                    key={user._id}
                                    className="rounded-[28px] border border-[#f3dbe6] bg-[#fffafd] p-5 shadow-[0_8px_24px_rgba(255,77,148,0.08)]"
                                >
                                    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-16 h-16 rounded-[20px] overflow-hidden bg-[linear-gradient(135deg,#f8ddf0_0%,#ead7ff_100%)] border border-[#ecc8da] flex items-center justify-center text-[#9b27ff] font-bold text-xl">
                                                    {user.profilePicture ? (
                                                        <img src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} className="w-full h-full object-cover" />
                                                    ) : (
                                                        `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h2 className="text-lg font-bold text-[#27193f]">
                                                            {user.firstName} {user.lastName}
                                                        </h2>
                                                        {user.isBanned ? (
                                                            <span className="inline-flex items-center rounded-full bg-[#fff1f1] text-[#b42318] px-2.5 py-1 text-xs font-semibold">
                                                                Banned
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center rounded-full bg-[#e8fff0] text-[#149147] px-2.5 py-1 text-xs font-semibold">
                                                                Active
                                                            </span>
                                                        )}
                                                        {user.isPremium && (
                                                            <span className="inline-flex items-center rounded-full bg-[#f2e2ff] text-[#8d2bff] px-2.5 py-1 text-xs font-semibold">
                                                                Premium
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="mt-2 space-y-1 text-sm text-[#7f5a73]">
                                                        <div className="flex items-center gap-2">
                                                            <Mail className="w-4 h-4" />
                                                            <span>{user.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Phone className="w-4 h-4" />
                                                            <span>{user.phoneNumber}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {user.isBanned && (
                                                <div className="rounded-2xl bg-[#fff3f2] border border-[#ffd9d5] px-4 py-3 text-sm text-[#9f2d1f]">
                                                    <strong>Ban reason:</strong> {user.banReason || 'Banned by admin'}
                                                </div>
                                            )}

                                            <div>
                                                <div className="flex items-center gap-2 text-sm font-semibold text-[#6f4760] mb-3">
                                                    <ImageIcon className="w-4 h-4" />
                                                    Uploaded Images ({allImages.length})
                                                </div>

                                                {allImages.length ? (
                                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                                        {allImages.map((imageUrl) => (
                                                            <button
                                                                key={imageUrl}
                                                                type="button"
                                                                onClick={() => setSelectedImage(imageUrl)}
                                                                className="aspect-square rounded-[18px] overflow-hidden border border-[#f3dbe6] bg-[#fff1f6]"
                                                            >
                                                                <img src={imageUrl} alt="User upload" className="w-full h-full object-cover" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-sm text-[#8f6a80]">No uploaded images yet.</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-full xl:w-[280px] rounded-[24px] border border-[#f3dbe6] bg-white p-4 space-y-4">
                                            <div>
                                                <h3 className="text-sm font-semibold text-[#6f4760]">Moderation Action</h3>
                                                <p className="text-xs text-[#8f6a80] mt-1">
                                                    Banning blocks this email and phone from logging in again.
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
                                                    placeholder="Reason for ban"
                                                    className="w-full rounded-2xl border border-[#f2bfd4] bg-[#fffafd] px-4 py-3 text-[#4d2740] outline-none focus:border-[#ff4d94] focus:ring-2 focus:ring-[#ff4d94]/20 resize-none"
                                                />
                                            )}

                                            {user.isBanned ? (
                                                <button
                                                    type="button"
                                                    onClick={() => handleBanToggle(user, false)}
                                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#e8fff0] text-[#149147] font-semibold hover:brightness-95"
                                                >
                                                    <ShieldCheck className="w-4 h-4" />
                                                    Unban User
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleBanToggle(user, true)}
                                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#fff1f1] text-[#b42318] font-semibold hover:brightness-95"
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
            </section>

            <div className="flex items-center justify-between rounded-[24px] bg-white/82 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] px-5 py-4">
                <button
                    type="button"
                    onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
                    disabled={page <= 1}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#fff1f6] text-[#b53674] disabled:opacity-50"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </button>

                <div className="text-sm font-medium text-[#7f5a73]">
                    Page {pagination.page} of {pagination.totalPages}
                </div>

                <button
                    type="button"
                    onClick={() => setPage((currentPage) => Math.min(currentPage + 1, pagination.totalPages))}
                    disabled={page >= pagination.totalPages}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#fff1f6] text-[#b53674] disabled:opacity-50"
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 z-[150] bg-[rgba(35,14,33,0.72)] flex items-center justify-center p-6"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="max-w-3xl w-full rounded-[28px] overflow-hidden border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.28)]">
                        <img src={selectedImage} alt="User upload preview" className="w-full max-h-[82vh] object-contain bg-black/30" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModerationPage;
