import React, { useState, useMemo } from 'react';
import { IndianRupee, TrendingUp, Receipt, CheckCircle2, XCircle, Clock, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Table, TableHead, TableRow, TableHeader, TableCell } from '../components/Table';

const PLAN_TYPES = ['All Plans', 'Premium Monthly', 'Premium Quarterly', 'Premium Yearly', 'VIP Lifetime'];
const STATUSES = ['All Statuses', 'Success', 'Pending', 'Failed'];

const DUMMY_TRANSACTIONS = [
    { id: 'txn-001', user: 'Priya Sharma', email: 'priya@email.com', plan: 'Premium Monthly', amount: 799, date: '2026-03-22', status: 'Success', method: 'UPI' },
    { id: 'txn-002', user: 'Rahul Mehta', email: 'rahul@email.com', plan: 'Premium Yearly', amount: 4999, date: '2026-03-21', status: 'Success', method: 'Credit Card' },
    { id: 'txn-003', user: 'Ananya Singh', email: 'ananya@email.com', plan: 'Premium Quarterly', amount: 1999, date: '2026-03-20', status: 'Pending', method: 'Net Banking' },
    { id: 'txn-004', user: 'Vikram Patel', email: 'vikram@email.com', plan: 'VIP Lifetime', amount: 9999, date: '2026-03-19', status: 'Success', method: 'UPI' },
    { id: 'txn-005', user: 'Kavya Reddy', email: 'kavya@email.com', plan: 'Premium Monthly', amount: 799, date: '2026-03-18', status: 'Failed', method: 'Debit Card' },
    { id: 'txn-006', user: 'Arjun Nair', email: 'arjun@email.com', plan: 'Premium Yearly', amount: 4999, date: '2026-03-17', status: 'Success', method: 'UPI' },
    { id: 'txn-007', user: 'Neha Joshi', email: 'neha@email.com', plan: 'Premium Monthly', amount: 799, date: '2026-03-16', status: 'Success', method: 'Credit Card' },
    { id: 'txn-008', user: 'Siddharth Roy', email: 'sid@email.com', plan: 'Premium Quarterly', amount: 1999, date: '2026-03-15', status: 'Success', method: 'UPI' },
    { id: 'txn-009', user: 'Meera Iyer', email: 'meera@email.com', plan: 'Premium Monthly', amount: 799, date: '2026-03-14', status: 'Pending', method: 'Net Banking' },
    { id: 'txn-010', user: 'Karan Khanna', email: 'karan@email.com', plan: 'VIP Lifetime', amount: 9999, date: '2026-03-13', status: 'Success', method: 'Credit Card' },
    { id: 'txn-011', user: 'Simran Kaur', email: 'simran@email.com', plan: 'Premium Yearly', amount: 4999, date: '2026-03-12', status: 'Failed', method: 'Debit Card' },
    { id: 'txn-012', user: 'Rohit Desai', email: 'rohit@email.com', plan: 'Premium Monthly', amount: 799, date: '2026-03-11', status: 'Success', method: 'UPI' },
    { id: 'txn-013', user: 'Pooja Agarwal', email: 'pooja@email.com', plan: 'Premium Quarterly', amount: 1999, date: '2026-03-10', status: 'Success', method: 'Credit Card' },
    { id: 'txn-014', user: 'Amit Verma', email: 'amit@email.com', plan: 'Premium Monthly', amount: 799, date: '2026-03-09', status: 'Success', method: 'UPI' },
    { id: 'txn-015', user: 'Tanvi Malhotra', email: 'tanvi@email.com', plan: 'VIP Lifetime', amount: 9999, date: '2026-03-08', status: 'Success', method: 'Credit Card' },
];

const PAGE_SIZE = 8;

const StatusBadge = ({ status }) => {
    const styles = {
        Success: { bg: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
        Pending: { bg: 'bg-amber-100 text-amber-700', icon: Clock },
        Failed: { bg: 'bg-red-100 text-red-700', icon: XCircle },
    };
    const { bg, icon: Icon } = styles[status] || styles.Pending;
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase ${bg}`}>
            <Icon className="w-3 h-3" />
            {status}
        </span>
    );
};

const TransactionsPage = () => {
    const [planFilter, setPlanFilter] = useState('All Plans');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        return DUMMY_TRANSACTIONS.filter((txn) => {
            if (planFilter !== 'All Plans' && txn.plan !== planFilter) return false;
            if (statusFilter !== 'All Statuses' && txn.status !== statusFilter) return false;
            if (dateFrom && txn.date < dateFrom) return false;
            if (dateTo && txn.date > dateTo) return false;
            return true;
        });
    }, [planFilter, statusFilter, dateFrom, dateTo]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePagee = Math.min(page, totalPages);
    const paginated = filtered.slice((safePagee - 1) * PAGE_SIZE, safePagee * PAGE_SIZE);

    const totalRevenue = filtered.filter((t) => t.status === 'Success').reduce((sum, t) => sum + t.amount, 0);
    const successCount = filtered.filter((t) => t.status === 'Success').length;
    const pendingCount = filtered.filter((t) => t.status === 'Pending').length;
    const failedCount = filtered.filter((t) => t.status === 'Failed').length;

    const resetFilters = () => {
        setPlanFilter('All Plans');
        setStatusFilter('All Statuses');
        setDateFrom('');
        setDateTo('');
        setPage(1);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">Transaction History</h1>
                <p className="text-sm text-zinc-500 mt-1">
                    Read-only log of all subscription payments and their statuses.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-emerald-50 ring-1 ring-emerald-100/50 flex items-center justify-center mr-3.5">
                        <IndianRupee className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Revenue</p>
                        <h3 className="text-xl font-medium text-zinc-900 leading-none">₹{totalRevenue.toLocaleString('en-IN')}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-blue-50 ring-1 ring-blue-100/50 flex items-center justify-center mr-3.5">
                        <Receipt className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Successful</p>
                        <h3 className="text-xl font-medium text-zinc-900 leading-none">{successCount}</h3>
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
                    <div className="p-2.5 rounded-lg bg-red-50 ring-1 ring-red-100/50 flex items-center justify-center mr-3.5">
                        <TrendingUp className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Failed</p>
                        <h3 className="text-xl font-medium text-zinc-900 leading-none">{failedCount}</h3>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-4">
                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex items-center gap-2 shrink-0 text-zinc-500">
                        <Filter className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Filters</span>
                    </div>

                    <div className="flex flex-col gap-1 min-w-[160px]">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Plan Type</label>
                        <select
                            value={planFilter}
                            onChange={(e) => { setPlanFilter(e.target.value); setPage(1); }}
                            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                        >
                            {PLAN_TYPES.map((p) => <option key={p}>{p}</option>)}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1 min-w-[140px]">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                        >
                            {STATUSES.map((s) => <option key={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">From Date</label>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
                            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">To Date</label>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
                            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>

                    <div className="flex gap-2 ml-auto">
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 rounded-lg border border-zinc-300 bg-white text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            className="px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm font-semibold flex items-center gap-2 hover:bg-black transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
                {paginated.length === 0 ? (
                    <div className="p-10 text-center text-sm font-medium text-zinc-500">
                        No transactions match the selected filters.
                    </div>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Txn ID</TableHeader>
                                <TableHeader>User</TableHeader>
                                <TableHeader>Plan</TableHeader>
                                <TableHeader>Amount</TableHeader>
                                <TableHeader>Method</TableHeader>
                                <TableHeader>Date</TableHeader>
                                <TableHeader>Status</TableHeader>
                            </TableRow>
                        </TableHead>
                        <tbody>
                            {paginated.map((txn) => (
                                <TableRow key={txn.id}>
                                    <TableCell>
                                        <span className="font-mono text-xs text-zinc-500 font-medium">{txn.id}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm font-semibold text-zinc-900 leading-tight">{txn.user}</div>
                                        <div className="text-xs text-zinc-500 mt-0.5">{txn.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm font-medium text-zinc-700">{txn.plan}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm font-semibold text-zinc-900">₹{txn.amount.toLocaleString('en-IN')}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-xs font-medium text-zinc-600">{txn.method}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-xs font-medium text-zinc-600">
                                            {new Date(txn.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={txn.status} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-5 py-3.5">
                    <span className="text-xs font-semibold text-zinc-500">
                        {filtered.length} transaction{filtered.length !== 1 ? 's' : ''} found
                    </span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={safePagee <= 1}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors shadow-sm"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Prev
                        </button>
                        <span className="text-xs font-semibold text-zinc-600">
                            Page {safePagee} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={safePagee >= totalPages}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors shadow-sm"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;
