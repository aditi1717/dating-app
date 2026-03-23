import React, { useEffect, useState } from 'react';
import { BadgePlus, CalendarDays, CheckCircle2, Crown, IndianRupee, Sparkles, Trash2, Layers, Tag, Percent } from 'lucide-react';

const STORAGE_KEY = 'amora_admin_subscriptions';

const defaultPlans = [
    {
        id: 'plan-premium-monthly',
        name: 'Premium Monthly',
        price: '799',
        billingCycle: 'Monthly',
        durationDays: '30',
        audience: 'All Users',
        status: 'Active',
        featured: true,
        features: [
            'Unlimited likes',
            '5 super boosts every week',
            'Priority profile visibility',
        ],
        createdAt: 'Seed Plan',
    },
];

const initialForm = {
    name: '',
    price: '',
    billingCycle: 'Monthly',
    durationDays: '30',
    audience: 'All Users',
    status: 'Draft',
    featured: false,
    features: '',
};

const loadPlans = () => {
    const savedPlans = localStorage.getItem(STORAGE_KEY);
    if (!savedPlans) {
        return defaultPlans;
    }

    try {
        const parsed = JSON.parse(savedPlans);
        return Array.isArray(parsed) && parsed.length ? parsed : defaultPlans;
    } catch {
        return defaultPlans;
    }
};

const SubscriptionsPage = () => {
    const [form, setForm] = useState(initialForm);
    const [plans, setPlans] = useState(defaultPlans);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setPlans(loadPlans());
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    }, [plans]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((current) => ({
            ...current,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setMessage('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.name.trim() || !form.price.trim()) {
            setMessage('Plan name and price are required.');
            return;
        }

        const newPlan = {
            id: `plan-${Date.now()}`,
            name: form.name.trim(),
            price: form.price.trim(),
            billingCycle: form.billingCycle,
            durationDays: form.durationDays,
            audience: form.audience,
            status: form.status,
            featured: form.featured,
            features: form.features
                .split('\n')
                .map((item) => item.trim())
                .filter(Boolean),
            createdAt: new Date().toLocaleString(),
        };

        setPlans((current) => [newPlan, ...current]);
        setForm(initialForm);
        setMessage('Subscription created successfully.');
    };

    const handleDelete = (planId) => {
        switch (planId) {
            case 'plan-premium-monthly':
                setMessage('Cannot delete the default seed plan.');
                return;
            default:
                setPlans((current) => current.filter((plan) => plan.id !== planId));
        }
    };

    const activePlans = plans.filter((plan) => plan.status === 'Active').length;
    const featuredPlans = plans.filter((plan) => plan.featured).length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">Manual Subscriptions</h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        Create, preview and manage subscription plans manually.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-blue-50 ring-1 ring-blue-100/50 flex items-center justify-center mr-3.5">
                        <Layers className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Total Plans</p>
                        <h3 className="text-xl font-medium text-zinc-900 tracking-tight leading-none">{plans.length}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-emerald-50 ring-1 ring-emerald-100/50 flex items-center justify-center mr-3.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Active</p>
                        <h3 className="text-xl font-medium text-zinc-900 tracking-tight leading-none">{activePlans}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center hover:shadow-md transition-shadow">
                    <div className="p-2.5 rounded-lg bg-amber-50 ring-1 ring-amber-100/50 flex items-center justify-center mr-3.5">
                        <Tag className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Featured</p>
                        <h3 className="text-xl font-medium text-zinc-900 tracking-tight leading-none">{featuredPlans}</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.12fr_0.88fr] gap-6">
                <section className="rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
                    <div className="flex items-center gap-3 border-b border-zinc-100 pb-5 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-500 flex items-center justify-center border border-zinc-200 shadow-sm">
                            <BadgePlus className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-zinc-900">Create Subscription</h2>
                            <p className="text-xs font-medium text-zinc-500 mt-0.5">Define new plan attributes</p>
                        </div>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="block">
                                <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Plan Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Gold Plus"
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-zinc-400"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Price</span>
                                <div className="relative">
                                    <IndianRupee className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="799"
                                        className="w-full rounded-xl border border-zinc-300 bg-white pl-10 pr-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-zinc-400"
                                    />
                                </div>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            <label className="block">
                                <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Billing Cycle</span>
                                <select
                                    name="billingCycle"
                                    value={form.billingCycle}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                                >
                                    <option>Monthly</option>
                                    <option>Quarterly</option>
                                    <option>Half Yearly</option>
                                    <option>Yearly</option>
                                    <option>Lifetime</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Duration (Days)</span>
                                <input
                                    type="number"
                                    name="durationDays"
                                    value={form.durationDays}
                                    onChange={handleChange}
                                    placeholder="30"
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-zinc-400"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Audience</span>
                                <select
                                    name="audience"
                                    value={form.audience}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                                >
                                    <option>All Users</option>
                                    <option>New Users</option>
                                    <option>Premium Upsell</option>
                                    <option>Inactive Users</option>
                                    <option>VIP Users</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Status</span>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                                >
                                    <option>Draft</option>
                                    <option>Active</option>
                                    <option>Paused</option>
                                </select>
                            </label>
                        </div>

                        <label className="block">
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Plan Features (One per line)</span>
                            <textarea
                                name="features"
                                value={form.features}
                                onChange={handleChange}
                                rows="4"
                                placeholder={'Unlimited likes\nPriority support\nProfile boost every week'}
                                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-zinc-400 resize-none"
                            />
                        </label>

                        <label className="flex items-center gap-3 rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={form.featured}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black accent-black"
                            />
                            <span className="text-sm font-semibold text-zinc-700">Mark this subscription as Featured</span>
                        </label>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                            <div className="text-sm font-semibold text-emerald-600 min-h-[20px]">{message.includes('successfully') ? message : <span className="text-red-600">{message}</span>}</div>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-bold shadow-sm hover:bg-black transition-colors"
                            >
                                <Sparkles className="w-4 h-4" />
                                Create Plan
                            </button>
                        </div>
                    </form>
                </section>

                <div className="space-y-6">
                    {/* Live Preview Section */}
                    <section className="rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
                        <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-500 flex items-center justify-center border border-zinc-200 shadow-sm">
                                <Crown className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-zinc-900">Live Preview</h2>
                                <p className="text-xs font-medium text-zinc-500 mt-0.5">Real-time styling demonstration</p>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-zinc-900 text-white p-6 shadow-xl relative overflow-hidden">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Sparkles className="w-24 h-24" />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Preview</p>
                                        <h3 className="text-xl font-bold mt-1 text-white">{form.name || 'Your New Plan'}</h3>
                                    </div>
                                    <span className="inline-flex items-center rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase border border-white/10">
                                        {form.status}
                                    </span>
                                </div>
                                <div className="flex items-end gap-1.5 mt-6 mb-2">
                                    <span className="text-3xl font-extrabold tracking-tight">₹{form.price || '0'}</span>
                                    <span className="text-zinc-400 text-sm font-medium mb-1">/{form.billingCycle.toLowerCase()}</span>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3 mt-6">
                                    <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                                        <div className="text-zinc-400 text-[11px] font-semibold uppercase tracking-wider">Duration</div>
                                        <div className="font-bold text-sm mt-1">{form.durationDays || '0'} days</div>
                                    </div>
                                    <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                                        <div className="text-zinc-400 text-[11px] font-semibold uppercase tracking-wider">Target</div>
                                        <div className="font-bold text-sm mt-1 truncate">{form.audience}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Created Plans Section */}
                    <section className="rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
                        <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-500 flex items-center justify-center border border-zinc-200 shadow-sm">
                                <CalendarDays className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-zinc-900">Created Plans</h2>
                                <p className="text-xs font-medium text-zinc-500 mt-0.5">Manage existing local entries</p>
                            </div>
                        </div>

                        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                            {plans.map((plan) => (
                                <article
                                    key={plan.id}
                                    className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow relative group"
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(plan.id)}
                                        className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:border-red-200"
                                        title={`Delete ${plan.name}`}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>

                                    <div className="pr-10">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <h3 className="text-base font-bold text-zinc-900">{plan.name}</h3>
                                            {plan.featured && (
                                                <span className="inline-flex items-center rounded-md bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs font-semibold text-zinc-500">
                                            ₹{plan.price} / {plan.billingCycle.toLowerCase()} • {plan.durationDays} days
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${plan.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-100 text-zinc-600'}`}>
                                            {plan.status}
                                        </span>
                                        <span className="inline-flex items-center rounded-md bg-blue-50 border border-blue-100 text-blue-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                                            {plan.audience}
                                        </span>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-zinc-100 space-y-2">
                                        {plan.features.length ? (
                                            plan.features.map((feature) => (
                                                <div key={feature} className="flex items-start gap-2 text-xs font-medium text-zinc-600">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-xs text-zinc-400 font-medium italic">No features added.</div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionsPage;
