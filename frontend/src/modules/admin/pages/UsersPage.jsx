import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Search, Star, UserRound } from 'lucide-react';
import { apiFetch } from '../../../lib/api';
import { Table, TableHead, TableRow, TableHeader, TableCell } from '../components/Table';

const ADMIN_TOKEN_KEY = 'amora_admin_token';
const PAGE_SIZE = 8;

const DetailRow = ({ label, value }) => (
    <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3">
        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">{label}</div>
        <div className="text-sm font-semibold text-zinc-900 break-words">{value || 'Not provided'}</div>
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
                    <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">Users Management</h1>
                    <p className="text-sm text-zinc-500 mt-1 flex items-center">
                        Browse all platform users and review account details.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="w-full xl:w-[320px]">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(event) => setSearchInput(event.target.value)}
                            placeholder="Search users..."
                            className="w-full rounded-xl border border-zinc-300 bg-white pl-10 pr-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
                        />
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl bg-white shadow-sm border border-zinc-200 px-5 py-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Total Users</p>
                        <p className="text-2xl font-medium text-zinc-900 mt-1 leading-none">{pagination.totalUsers}</p>
                    </div>
                </div>
                <div className="rounded-xl bg-white shadow-sm border border-zinc-200 px-5 py-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Current Page</p>
                        <p className="text-2xl font-medium text-zinc-900 mt-1 leading-none">{pagination.page}</p>
                    </div>
                </div>
                <div className="rounded-xl bg-white shadow-sm border border-zinc-200 px-5 py-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Total Pages</p>
                        <p className="text-2xl font-medium text-zinc-900 mt-1 leading-none">{pagination.totalPages}</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="rounded-xl px-4 py-3 border bg-red-50 border-red-200 text-sm font-medium text-red-600">
                    {error}
                </div>
            )}

            <div className="rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-sm font-medium text-zinc-500">Loading users...</div>
                ) : users.length === 0 ? (
                    <div className="p-8 text-center text-sm font-medium text-zinc-500">No users found for this criteria.</div>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>User</TableHeader>
                                <TableHeader>Contact</TableHeader>
                                <TableHeader>Subscription</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader className="text-right">Action</TableHeader>
                            </TableRow>
                        </TableHead>
                        <tbody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 font-bold text-xs uppercase shadow-sm">
                                                {user.profilePicture ? (
                                                    <img src={user.profilePicture} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-zinc-900 leading-tight">
                                                    {user.firstName} {user.lastName}
                                                </div>
                                                <div className="text-xs font-medium text-zinc-500 mt-0.5">
                                                    {user.age || 'N/A'} yrs • {user.gender || 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm font-medium text-zinc-900">{user.email}</div>
                                        <div className="text-xs text-zinc-500 mt-0.5">{user.phoneNumber}</div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase ${user.subscriptionName === 'Premium' ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-700'}`}>
                                            {user.subscriptionName === 'Premium' && <Star className="w-3 h-3 fill-current" />}
                                            {user.subscriptionName}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase ${user.isBanned ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                            {user.isBanned ? 'Banned' : 'Active'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedUser(user)}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 px-3 py-1.5 text-xs font-semibold hover:bg-zinc-50 hover:text-black transition-colors shadow-sm"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            View
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                )}
                
                {/* Pagination inside bottom of table card */}
                {users.length > 0 && (
                    <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-5 py-3.5">
                        <button
                            type="button"
                            onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
                            disabled={page <= 1}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors shadow-sm"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Prev
                        </button>

                        <div className="text-xs font-semibold text-zinc-600">
                            Page {pagination.page} of {pagination.totalPages}
                        </div>

                        <button
                            type="button"
                            onClick={() => setPage((currentPage) => Math.min(currentPage + 1, pagination.totalPages))}
                            disabled={page >= pagination.totalPages}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors shadow-sm"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {selectedUser && (
                <div
                    className="fixed inset-0 z-[150] bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
                    onClick={() => setSelectedUser(null)}
                >
                    <div
                        className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl p-6 md:p-8"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Header Area */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 border-b border-zinc-100 pb-6">
                            <div className="flex items-center gap-5">
                                <div className="w-20 h-20 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 font-bold text-xl shadow-sm">
                                    {selectedUser.profilePicture ? (
                                        <img src={selectedUser.profilePicture} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <UserRound className="w-8 h-8" />
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-zinc-900 tracking-tight leading-tight">
                                        {selectedUser.firstName} {selectedUser.lastName}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase ${selectedUser.subscriptionName === 'Premium' ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-700'}`}>
                                            {selectedUser.subscriptionName}
                                        </span>
                                        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase ${selectedUser.isBanned ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                            {selectedUser.isBanned ? 'Banned' : 'Active'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedUser(null)}
                                className="w-full sm:w-auto inline-flex justify-center rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-200 hover:text-black transition-colors"
                            >
                                Close Profile
                            </button>
                        </div>

                        {/* Detail Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
                            <DetailRow label="Email Address" value={selectedUser.email} />
                            <DetailRow label="Phone Number" value={selectedUser.phoneNumber} />
                            <DetailRow label="Age" value={selectedUser.age} />
                            <DetailRow label="Gender" value={selectedUser.gender} />
                            <DetailRow label="Relationship Goal" value={selectedUser.relationshipGoal} />
                            <DetailRow label="Education" value={selectedUser.education} />
                            <DetailRow label="Profession" value={selectedUser.profession} />
                            <DetailRow label="Location" value={[selectedUser.location?.city, selectedUser.location?.state, selectedUser.location?.address].filter(Boolean).join(', ')} />
                            <DetailRow label="Smoking" value={selectedUser.smokingStatus} />
                            <DetailRow label="Drinking" value={selectedUser.drinkingStatus} />
                            <DetailRow label="Verified" value={selectedUser.isVerified ? 'Yes' : 'No'} />
                            <DetailRow label="Join Date" value={selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : ''} />
                        </div>

                        {/* Bio Block */}
                        <div className="mt-6 rounded-xl bg-zinc-50 border border-zinc-100 p-5">
                            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-2">Biography</div>
                            <div className="text-sm font-medium text-zinc-800 leading-relaxed">{selectedUser.bio || 'No bio provided.'}</div>
                        </div>

                        {/* Interests Block */}
                        <div className="mt-4 rounded-xl bg-zinc-50 border border-zinc-100 p-5">
                            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-3">Interests & Hobbies</div>
                            <div className="flex flex-wrap gap-2">
                                {(selectedUser.interests || []).length ? (
                                    selectedUser.interests.map((interest) => (
                                        <span key={interest} className="inline-flex items-center rounded-full bg-white border border-zinc-200 text-zinc-700 px-3 py-1 text-[11px] font-bold shadow-sm">
                                            {interest}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-zinc-500 font-medium">No interests specified.</span>
                                )}
                            </div>
                        </div>

                        {/* Gallery Block */}
                        <div className="mt-4 rounded-xl bg-zinc-50 border border-zinc-100 p-5">
                            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-4">Gallery Images</div>
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                                {[selectedUser.profilePicture, ...((selectedUser.galleryImages || []).map((image) => image.url))].filter(Boolean).length ? (
                                    [selectedUser.profilePicture, ...((selectedUser.galleryImages || []).map((image) => image.url))]
                                        .filter(Boolean)
                                        .map((imageUrl, idx) => (
                                            <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-zinc-200 bg-white shadow-sm hover:scale-105 transition-transform">
                                                <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        ))
                                ) : (
                                    <span className="text-sm col-span-full text-zinc-500 font-medium">No gallery images uploaded.</span>
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
