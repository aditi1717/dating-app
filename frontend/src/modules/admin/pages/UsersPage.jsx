import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Mail, Phone, Search, Star, UserRound } from 'lucide-react';
import { apiFetch } from '../../../lib/api';

const ADMIN_TOKEN_KEY = 'amora_admin_token';
const PAGE_SIZE = 8;

const DetailRow = ({ label, value }) => (
    <div className="rounded-2xl bg-[#fff8fb] border border-[#f4d9e5] px-4 py-3">
        <div className="text-xs uppercase tracking-[0.2em] text-[#b17a94]">{label}</div>
        <div className="text-sm font-medium text-[#342041] mt-2 break-words">{value || 'Not provided'}</div>
    </div>
);

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalUsers: 0 });
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

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

    const handleSearch = (event) => {
        event.preventDefault();
        setPage(1);
        setSearch(searchInput);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#1d1533] tracking-tight">Users</h1>
                    <p className="text-sm text-[#7f5a73] mt-1">
                        Browse all available users, see their subscription name, and open complete details with one click.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="w-full xl:w-[360px]">
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
                    <p className="text-xs uppercase tracking-[0.24em] text-[#b17a94]">Visible Users</p>
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

            {error && (
                <div className="rounded-[24px] px-5 py-4 border bg-[#fff1f1] border-[#ffd2d2] text-[#b42318]">
                    {error}
                </div>
            )}

            <section className="rounded-[30px] bg-white/82 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] p-6">
                {loading ? (
                    <div className="text-[#8f6a80]">Loading users...</div>
                ) : users.length === 0 ? (
                    <div className="text-[#8f6a80]">No users found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[820px]">
                            <thead>
                                <tr className="text-left text-xs uppercase tracking-[0.22em] text-[#b17a94]">
                                    <th className="pb-4 font-semibold">User</th>
                                    <th className="pb-4 font-semibold">Email</th>
                                    <th className="pb-4 font-semibold">Phone</th>
                                    <th className="pb-4 font-semibold">Subscription</th>
                                    <th className="pb-4 font-semibold">Status</th>
                                    <th className="pb-4 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-t border-[#f4d9e5]">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-[16px] overflow-hidden bg-[linear-gradient(135deg,#f8ddf0_0%,#ead7ff_100%)] border border-[#ecc8da] flex items-center justify-center text-[#9b27ff] font-bold">
                                                    {user.profilePicture ? (
                                                        <img src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} className="w-full h-full object-cover" />
                                                    ) : (
                                                        `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-[#27193f]">
                                                        {user.firstName} {user.lastName}
                                                    </div>
                                                    <div className="text-xs text-[#8f6a80]">
                                                        {user.age || 'N/A'} yrs • {user.gender || 'N/A'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-sm text-[#5b3d50]">{user.email}</td>
                                        <td className="py-4 text-sm text-[#5b3d50]">{user.phoneNumber}</td>
                                        <td className="py-4">
                                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${user.subscriptionName === 'Premium' ? 'bg-[#f2e2ff] text-[#8d2bff]' : 'bg-[#fff1f6] text-[#b53674]'}`}>
                                                <Star className="w-3.5 h-3.5" />
                                                {user.subscriptionName}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${user.isBanned ? 'bg-[#fff1f1] text-[#b42318]' : 'bg-[#e8fff0] text-[#149147]'}`}>
                                                {user.isBanned ? 'Banned' : 'Active'}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedUser(user)}
                                                className="inline-flex items-center gap-2 rounded-2xl bg-[#fff1f6] text-[#b53674] px-4 py-2 font-semibold hover:brightness-95"
                                            >
                                                <Eye className="w-4 h-4" />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

            {selectedUser && (
                <div
                    className="fixed inset-0 z-[150] bg-[rgba(35,14,33,0.72)] flex items-center justify-center p-4"
                    onClick={() => setSelectedUser(null)}
                >
                    <div
                        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-[linear-gradient(180deg,#fffafd_0%,#fff2f8_100%)] border border-white/60 shadow-[0_25px_70px_rgba(0,0,0,0.24)] p-6"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-[22px] overflow-hidden bg-[linear-gradient(135deg,#f8ddf0_0%,#ead7ff_100%)] border border-[#ecc8da] flex items-center justify-center text-[#9b27ff] font-bold text-2xl">
                                    {selectedUser.profilePicture ? (
                                        <img src={selectedUser.profilePicture} alt={`${selectedUser.firstName} ${selectedUser.lastName}`} className="w-full h-full object-cover" />
                                    ) : (
                                        <UserRound className="w-8 h-8" />
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[#24183b]">
                                        {selectedUser.firstName} {selectedUser.lastName}
                                    </h2>
                                    <p className="text-sm text-[#7f5a73] mt-1">
                                        {selectedUser.subscriptionName} subscription
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedUser(null)}
                                className="self-start rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#b53674] border border-[#f3dbe6]"
                            >
                                Close
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                            <DetailRow label="Email" value={selectedUser.email} />
                            <DetailRow label="Phone" value={selectedUser.phoneNumber} />
                            <DetailRow label="Age" value={selectedUser.age} />
                            <DetailRow label="Gender" value={selectedUser.gender} />
                            <DetailRow label="Relationship Goal" value={selectedUser.relationshipGoal} />
                            <DetailRow label="Education" value={selectedUser.education} />
                            <DetailRow label="Profession" value={selectedUser.profession} />
                            <DetailRow label="Location" value={[selectedUser.location?.city, selectedUser.location?.state, selectedUser.location?.address].filter(Boolean).join(', ')} />
                            <DetailRow label="Smoking" value={selectedUser.smokingStatus} />
                            <DetailRow label="Drinking" value={selectedUser.drinkingStatus} />
                            <DetailRow label="Verified" value={selectedUser.isVerified ? 'Yes' : 'No'} />
                            <DetailRow label="Created" value={selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : ''} />
                        </div>

                        <div className="mt-6 rounded-[28px] bg-white/80 border border-[#f4d9e5] p-5">
                            <div className="text-xs uppercase tracking-[0.2em] text-[#b17a94]">Bio</div>
                            <div className="text-sm text-[#4d2740] mt-3 leading-7">{selectedUser.bio || 'No bio added yet.'}</div>
                        </div>

                        <div className="mt-6 rounded-[28px] bg-white/80 border border-[#f4d9e5] p-5">
                            <div className="text-xs uppercase tracking-[0.2em] text-[#b17a94]">Interests</div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {(selectedUser.interests || []).length ? (
                                    selectedUser.interests.map((interest) => (
                                        <span key={interest} className="inline-flex items-center rounded-full bg-[#fff1f6] text-[#b53674] px-3 py-1 text-xs font-semibold">
                                            {interest}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-[#8f6a80]">No interests added.</span>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 rounded-[28px] bg-white/80 border border-[#f4d9e5] p-5">
                            <div className="text-xs uppercase tracking-[0.2em] text-[#b17a94]">Uploaded Images</div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                {[selectedUser.profilePicture, ...((selectedUser.galleryImages || []).map((image) => image.url))].filter(Boolean).length ? (
                                    [selectedUser.profilePicture, ...((selectedUser.galleryImages || []).map((image) => image.url))]
                                        .filter(Boolean)
                                        .map((imageUrl) => (
                                            <div key={imageUrl} className="aspect-square rounded-[20px] overflow-hidden border border-[#f3dbe6] bg-[#fff1f6]">
                                                <img src={imageUrl} alt="User upload" className="w-full h-full object-cover" />
                                            </div>
                                        ))
                                ) : (
                                    <span className="text-sm text-[#8f6a80]">No images available.</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
