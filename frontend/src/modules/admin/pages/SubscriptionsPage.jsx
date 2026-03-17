import React, { useEffect, useState } from 'react';
import { BadgePlus, CalendarDays, CheckCircle2, Crown, IndianRupee, Sparkles, Trash2 } from 'lucide-react';

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
        setPlans((current) => current.filter((plan) => plan.id !== planId));
    };

    const activePlans = plans.filter((plan) => plan.status === 'Active').length;
    const featuredPlans = plans.filter((plan) => plan.featured).length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#1d1533] tracking-tight">Manual Subscriptions</h1>
                    <p className="text-sm text-[#7f5a73] mt-1">
                        Create and manage subscription plans manually for the admin panel.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
                    <div className="rounded-[24px] bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] px-5 py-4 min-w-[150px]">
                        <p className="text-xs uppercase tracking-[0.24em] text-[#b17a94]">Total Plans</p>
                        <p className="text-2xl font-bold text-[#25183d] mt-2">{plans.length}</p>
                    </div>
                    <div className="rounded-[24px] bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] px-5 py-4 min-w-[150px]">
                        <p className="text-xs uppercase tracking-[0.24em] text-[#b17a94]">Active</p>
                        <p className="text-2xl font-bold text-[#25183d] mt-2">{activePlans}</p>
                    </div>
                    <div className="rounded-[24px] bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] px-5 py-4 min-w-[150px]">
                        <p className="text-xs uppercase tracking-[0.24em] text-[#b17a94]">Featured</p>
                        <p className="text-2xl font-bold text-[#25183d] mt-2">{featuredPlans}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
                <section className="rounded-[30px] bg-white/82 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-[linear-gradient(135deg,#ff4b91_0%,#a729ff_100%)] text-white flex items-center justify-center shadow-[0_14px_28px_rgba(167,41,255,0.28)]">
                            <BadgePlus className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[#27193f]">Create Subscription</h2>
                            <p className="text-sm text-[#8f6a80]">Add a new plan manually for testing or internal use.</p>
                        </div>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="block">
                                <span className="block text-sm font-medium text-[#6f4760] mb-2">Plan Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Gold Plus"
                                    className="w-full rounded-2xl border border-[#f2bfd4] bg-[#fffafd] px-4 py-3 text-[#4d2740] outline-none focus:border-[#ff4d94] focus:ring-2 focus:ring-[#ff4d94]/20"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-sm font-medium text-[#6f4760] mb-2">Price</span>
                                <div className="relative">
                                    <IndianRupee className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#c5769b]" />
                                    <input
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="799"
                                        className="w-full rounded-2xl border border-[#f2bfd4] bg-[#fffafd] pl-10 pr-4 py-3 text-[#4d2740] outline-none focus:border-[#ff4d94] focus:ring-2 focus:ring-[#ff4d94]/20"
                                    />
                                </div>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            <label className="block">
                                <span className="block text-sm font-medium text-[#6f4760] mb-2">Billing Cycle</span>
                                <select
                                    name="billingCycle"
                                    value={form.billingCycle}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-[#f2bfd4] bg-[#fffafd] px-4 py-3 text-[#4d2740] outline-none focus:border-[#ff4d94] focus:ring-2 focus:ring-[#ff4d94]/20"
                                >
                                    <option>Monthly</option>
                                    <option>Quarterly</option>
                                    <option>Half Yearly</option>
                                    <option>Yearly</option>
                                    <option>Lifetime</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className="block text-sm font-medium text-[#6f4760] mb-2">Duration</span>
                                <input
                                    type="number"
                                    name="durationDays"
                                    value={form.durationDays}
                                    onChange={handleChange}
                                    placeholder="30"
                                    className="w-full rounded-2xl border border-[#f2bfd4] bg-[#fffafd] px-4 py-3 text-[#4d2740] outline-none focus:border-[#ff4d94] focus:ring-2 focus:ring-[#ff4d94]/20"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-sm font-medium text-[#6f4760] mb-2">Audience</span>
                                <select
                                    name="audience"
                                    value={form.audience}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-[#f2bfd4] bg-[#fffafd] px-4 py-3 text-[#4d2740] outline-none focus:border-[#ff4d94] focus:ring-2 focus:ring-[#ff4d94]/20"
                                >
                                    <option>All Users</option>
                                    <option>New Users</option>
                                    <option>Premium Upsell</option>
                                    <option>Inactive Users</option>
                                    <option>VIP Users</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className="block text-sm font-medium text-[#6f4760] mb-2">Status</span>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-[#f2bfd4] bg-[#fffafd] px-4 py-3 text-[#4d2740] outline-none focus:border-[#ff4d94] focus:ring-2 focus:ring-[#ff4d94]/20"
                                >
                                    <option>Draft</option>
                                    <option>Active</option>
                                    <option>Paused</option>
                                </select>
                            </label>
                        </div>

                        <label className="block">
                            <span className="block text-sm font-medium text-[#6f4760] mb-2">Plan Features</span>
                            <textarea
                                name="features"
                                value={form.features}
                                onChange={handleChange}
                                rows="5"
                                placeholder={'Unlimited likes\nPriority support\nProfile boost every week'}
                                className="w-full rounded-[24px] border border-[#f2bfd4] bg-[#fffafd] px-4 py-3 text-[#4d2740] outline-none focus:border-[#ff4d94] focus:ring-2 focus:ring-[#ff4d94]/20 resize-none"
                            />
                        </label>

                        <label className="flex items-center gap-3 rounded-2xl bg-[#fff4f9] border border-[#f6d6e5] px-4 py-3">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={form.featured}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#ff3f88]"
                            />
                            <span className="text-sm font-medium text-[#6f4760]">Mark this subscription as featured</span>
                        </label>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="text-sm text-[#c33573] min-h-6">{message}</div>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[linear-gradient(135deg,#ff3f88_0%,#9b27ff_100%)] text-white font-semibold shadow-[0_14px_30px_rgba(182,47,255,0.28)] hover:brightness-105"
                            >
                                <Sparkles className="w-4 h-4" />
                                Create Subscription
                            </button>
                        </div>
                    </form>
                </section>

                <section className="space-y-6">
                    <div className="rounded-[30px] bg-white/82 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-[linear-gradient(135deg,#ffd9ea_0%,#f0d8ff_100%)] text-[#b41b67] flex items-center justify-center">
                                <Crown className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#27193f]">Live Preview</h2>
                                <p className="text-sm text-[#8f6a80]">Quick snapshot of the plan you are building.</p>
                            </div>
                        </div>

                        <div className="rounded-[28px] bg-[linear-gradient(145deg,#ff4b91_0%,#9b27ff_100%)] text-white p-6 shadow-[0_18px_45px_rgba(182,47,255,0.28)]">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-white/70 text-sm uppercase tracking-[0.24em]">Preview</p>
                                    <h3 className="text-2xl font-bold mt-2">{form.name || 'Your New Plan'}</h3>
                                </div>
                                <span className="inline-flex items-center rounded-full bg-white/18 px-3 py-1 text-xs font-semibold">
                                    {form.status}
                                </span>
                            </div>
                            <div className="flex items-end gap-2 mt-8">
                                <span className="text-4xl font-extrabold">Rs. {form.price || '0'}</span>
                                <span className="text-white/75 mb-1">/{form.billingCycle.toLowerCase()}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
                                <div className="rounded-2xl bg-white/12 px-4 py-3">
                                    <div className="text-white/70">Duration</div>
                                    <div className="font-semibold mt-1">{form.durationDays || '0'} days</div>
                                </div>
                                <div className="rounded-2xl bg-white/12 px-4 py-3">
                                    <div className="text-white/70">Audience</div>
                                    <div className="font-semibold mt-1">{form.audience}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[30px] bg-white/82 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(255,77,148,0.12)] p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-[linear-gradient(135deg,#fff0f8_0%,#f7e2ff_100%)] text-[#9b27ff] flex items-center justify-center">
                                <CalendarDays className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#27193f]">Created Plans</h2>
                                <p className="text-sm text-[#8f6a80]">Plans you manually created on this device.</p>
                            </div>
                        </div>

                        <div className="space-y-4 max-h-[560px] overflow-y-auto pr-1">
                            {plans.map((plan) => (
                                <article
                                    key={plan.id}
                                    className="rounded-[24px] border border-[#f4d9e5] bg-[#fffafd] p-5 shadow-[0_8px_24px_rgba(255,77,148,0.08)]"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="text-lg font-bold text-[#27193f]">{plan.name}</h3>
                                                {plan.featured && (
                                                    <span className="inline-flex items-center rounded-full bg-[#ffe5f1] text-[#d81b60] px-2.5 py-1 text-xs font-semibold">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-[#8f6a80] mt-1">
                                                Rs. {plan.price} / {plan.billingCycle.toLowerCase()} • {plan.durationDays} days
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(plan.id)}
                                            className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-[#fff1f6] text-[#d81b60] hover:bg-[#ffe4ef]"
                                            aria-label={`Delete ${plan.name}`}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className="inline-flex items-center rounded-full bg-[#f2e2ff] text-[#8d2bff] px-2.5 py-1 text-xs font-semibold">
                                            {plan.status}
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-[#fff1f6] text-[#b53674] px-2.5 py-1 text-xs font-semibold">
                                            {plan.audience}
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-[#e8fff0] text-[#149147] px-2.5 py-1 text-xs font-semibold">
                                            Saved {plan.createdAt}
                                        </span>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        {plan.features.length ? (
                                            plan.features.map((feature) => (
                                                <div key={feature} className="flex items-center gap-2 text-sm text-[#5a3950]">
                                                    <CheckCircle2 className="w-4 h-4 text-[#ff3f88] flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-sm text-[#8f6a80]">No features added.</div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SubscriptionsPage;
