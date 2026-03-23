import React, { useState, useMemo } from 'react';
import { Flag, ShieldCheck, Trash2, Eye, Clock, CheckCircle2, XCircle, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { Table, TableHead, TableRow, TableHeader, TableCell } from '../components/Table';

const REASONS = ['All Reasons', 'Fake Profile', 'Inappropriate Photos', 'Harassment', 'Spam', 'Underage', 'Scam', 'Other'];
const STATUSES = ['All', 'Pending', 'Reviewed', 'Banned'];

const DUMMY_REPORTS = [
    { id: 'rpt-001', reportedUser: 'Aryan Kapoor', reportedEmail: 'aryan@mail.com', reportedBy: 'Sneha Gupta', reason: 'Fake Profile', description: 'This profile is using someone else\'s photos. I know this person personally.', date: '2026-03-22', status: 'Pending' },
    { id: 'rpt-002', reportedUser: 'Rahul Sharma', reportedEmail: 'rahul.s@mail.com', reportedBy: 'Pooja Iyer', reason: 'Harassment', description: 'Kept sending inappropriate messages after I asked him to stop.', date: '2026-03-21', status: 'Pending' },
    { id: 'rpt-003', reportedUser: 'Mohit Verma', reportedEmail: 'mohit@mail.com', reportedBy: 'Ritika Singh', reason: 'Inappropriate Photos', description: 'Profile picture is explicitly inappropriate.', date: '2026-03-20', status: 'Reviewed' },
    { id: 'rpt-004', reportedUser: 'Deepak Joshi', reportedEmail: 'deepak@mail.com', reportedBy: 'Anjali Mehta', reason: 'Scam', description: 'Asking for money after a few messages, classic scam behavior.', date: '2026-03-19', status: 'Banned' },
    { id: 'rpt-005', reportedUser: 'Sanjay Patel', reportedEmail: 'sanjay@mail.com', reportedBy: 'Nisha Roy', reason: 'Spam', description: 'Sending the same copy-paste message to everyone, asking to contact on Telegram.', date: '2026-03-18', status: 'Pending' },
    { id: 'rpt-006', reportedUser: 'Vivek Kumar', reportedEmail: 'vivek@mail.com', reportedBy: 'Tanvi Sharma', reason: 'Underage', description: 'This user appears to be a minor based on photos and conversations.', date: '2026-03-17', status: 'Reviewed' },
    { id: 'rpt-007', reportedUser: 'Nikhil Das', reportedEmail: 'nikhil@mail.com', reportedBy: 'Priya Nair', reason: 'Harassment', description: 'Threatening messages after unmatching.', date: '2026-03-16', status: 'Banned' },
    { id: 'rpt-008', reportedUser: 'Aakash Rao', reportedEmail: 'aakash@mail.com', reportedBy: 'Meera Pillai', reason: 'Fake Profile', description: 'Photos appear to be stolen from a celebrity Instagram account.', date: '2026-03-15', status: 'Pending' },
    { id: 'rpt-009', reportedUser: 'Tushar Bhatt', reportedEmail: 'tushar@mail.com', reportedBy: 'Kavita Menon', reason: 'Other', description: 'Very rude and abusive language in bio.', date: '2026-03-14', status: 'Reviewed' },
    { id: 'rpt-010', reportedUser: 'Gaurav Singh', reportedEmail: 'gaurav@mail.com', reportedBy: 'Simran Kaur', reason: 'Scam', description: 'Claiming to be a foreign national stuck abroad, asking for wire transfer.', date: '2026-03-13', status: 'Pending' },
];

const PAGE_SIZE = 6;

const StatusBadge = ({ status }) => {
    const map = {
        Pending: { cls: 'bg-amber-100 text-amber-700', icon: Clock },
        Reviewed: { cls: 'bg-blue-100 text-blue-700', icon: CheckCircle2 },
        Banned: { cls: 'bg-red-100 text-red-700', icon: XCircle },
    };
    const { cls, icon: Icon } = map[status] || map.Pending;
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase ${cls}`}>
            <Icon className="w-3 h-3" />
            {status}
        </span>
    );
};

const ReportsPage = () => {
    const [reports, setReports] = useState(DUMMY_REPORTS);
    const [reasonFilter, setReasonFilter] = useState('All Reasons');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);
    const [selectedReport, setSelectedReport] = useState(null);

    const filtered = useMemo(() => {
        return reports.filter((r) => {
            if (reasonFilter !== 'All Reasons' && r.reason !== reasonFilter) return false;
            if (statusFilter !== 'All' && r.status !== statusFilter) return false;
            return true;
        });
    }, [reports, reasonFilter, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    const updateStatus = (id, newStatus) => {
        setReports((prev) => prev.map((r) => r.id === id ? { ...r, status: newStatus } : r));
        if (selectedReport?.id === id) setSelectedReport((prev) => ({ ...prev, status: newStatus }));
    };

    const pendingCount = reports.filter((r) => r.status === 'Pending').length;
    const reviewedCount = reports.filter((r) => r.status === 'Reviewed').length;
    const bannedCount = reports.filter((r) => r.status === 'Banned').length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">Reports & Flags</h1>
                <p className="text-sm text-zinc-500 mt-1">
                    Review user-submitted reports and take moderation actions.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-zinc-100 ring-1 ring-zinc-200 flex items-center justify-center mr-3.5">
                        <Flag className="w-5 h-5 text-zinc-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Reports</p>
                        <h3 className="text-xl font-medium text-zinc-900 leading-none">{reports.length}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-amber-50 ring-1 ring-amber-100/50 flex items-center justify-center mr-3.5">
                        <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Pending</p>
                        <h3 className="text-xl font-medium text-zinc-900 leading-none">{pendingCount}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-blue-50 ring-1 ring-blue-100/50 flex items-center justify-center mr-3.5">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Reviewed</p>
                        <h3 className="text-xl font-medium text-zinc-900 leading-none">{reviewedCount}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-red-50 ring-1 ring-red-100/50 flex items-center justify-center mr-3.5">
                        <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Banned</p>
                        <h3 className="text-xl font-medium text-zinc-900 leading-none">{bannedCount}</h3>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-4 flex flex-wrap items-end gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Reason</label>
                    <select
                        value={reasonFilter}
                        onChange={(e) => { setReasonFilter(e.target.value); setPage(1); }}
                        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black min-w-[160px]"
                    >
                        {REASONS.map((r) => <option key={r}>{r}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Status</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black min-w-[140px]"
                    >
                        {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                </div>
                <button
                    onClick={() => { setReasonFilter('All Reasons'); setStatusFilter('All'); setPage(1); }}
                    className="px-4 py-2 rounded-lg border border-zinc-300 bg-white text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors self-end"
                >
                    Reset
                </button>
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
                {paginated.length === 0 ? (
                    <div className="p-10 text-center text-sm font-medium text-zinc-500">No reports match the selected filters.</div>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Reported User</TableHeader>
                                <TableHeader>Reported By</TableHeader>
                                <TableHeader>Reason</TableHeader>
                                <TableHeader>Date</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </TableRow>
                        </TableHead>
                        <tbody>
                            {paginated.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell>
                                        <div className="text-sm font-semibold text-zinc-900 leading-tight">{report.reportedUser}</div>
                                        <div className="text-xs text-zinc-500 mt-0.5">{report.reportedEmail}</div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm font-medium text-zinc-700">{report.reportedBy}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 text-zinc-700 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide">
                                            <AlertTriangle className="w-3 h-3" />
                                            {report.reason}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-xs font-medium text-zinc-600">
                                            {new Date(report.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={report.status} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setSelectedReport(report)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-semibold hover:bg-zinc-50 transition-colors shadow-sm"
                                                title="View details"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                                View
                                            </button>
                                            {report.status === 'Pending' && (
                                                <button
                                                    onClick={() => updateStatus(report.id, 'Reviewed')}
                                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors"
                                                    title="Mark as reviewed"
                                                >
                                                    <ShieldCheck className="w-3.5 h-3.5" />
                                                    Review
                                                </button>
                                            )}
                                            {report.status !== 'Banned' && (
                                                <button
                                                    onClick={() => updateStatus(report.id, 'Banned')}
                                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors"
                                                    title="Ban user"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    Ban
                                                </button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-5 py-3.5">
                    <span className="text-xs font-semibold text-zinc-500">
                        {filtered.length} report{filtered.length !== 1 ? 's' : ''} found
                    </span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={safePage <= 1}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors shadow-sm"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Prev
                        </button>
                        <span className="text-xs font-semibold text-zinc-600">
                            Page {safePage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={safePage >= totalPages}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors shadow-sm"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedReport && (
                <div
                    className="fixed inset-0 z-[150] bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
                    onClick={() => setSelectedReport(null)}
                >
                    <div
                        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4 border-b border-zinc-100 pb-4 mb-5">
                            <div>
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <h2 className="text-lg font-semibold text-zinc-900">{selectedReport.reportedUser}</h2>
                                    <StatusBadge status={selectedReport.status} />
                                </div>
                                <p className="text-xs text-zinc-500">{selectedReport.reportedEmail}</p>
                            </div>
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="text-zinc-400 hover:text-zinc-700 text-xl font-bold leading-none"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Reported By</div>
                                    <div className="text-sm font-semibold text-zinc-900">{selectedReport.reportedBy}</div>
                                </div>
                                <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Reason</div>
                                    <div className="text-sm font-semibold text-zinc-900">{selectedReport.reason}</div>
                                </div>
                                <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Date Filed</div>
                                    <div className="text-sm font-semibold text-zinc-900">
                                        {new Date(selectedReport.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </div>
                                </div>
                                <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Report ID</div>
                                    <div className="text-sm font-mono font-semibold text-zinc-900">{selectedReport.id}</div>
                                </div>
                            </div>

                            <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Description</div>
                                <div className="text-sm font-medium text-zinc-800 leading-relaxed">{selectedReport.description}</div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6 pt-4 border-t border-zinc-100">
                            {selectedReport.status === 'Pending' && (
                                <button
                                    onClick={() => updateStatus(selectedReport.id, 'Reviewed')}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors"
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                    Mark as Reviewed
                                </button>
                            )}
                            {selectedReport.status !== 'Banned' && (
                                <button
                                    onClick={() => updateStatus(selectedReport.id, 'Banned')}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Ban User
                                </button>
                            )}
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="px-4 py-2.5 rounded-xl bg-zinc-100 text-zinc-700 font-bold text-sm hover:bg-zinc-200 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsPage;
