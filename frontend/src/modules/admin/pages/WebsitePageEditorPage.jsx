import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Edit3, Check } from 'lucide-react';
import { websitePages, websitePagesBySlug } from '../constants/websitePages';

const STORAGE_KEY = 'amora_website_pages_content';

const loadStoredContent = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    } catch {
        return {};
    }
};

const WebsitePageEditorPage = () => {
    const { slug } = useParams();
    const page = websitePagesBySlug[slug];

    const fallbackContent = useMemo(
        () =>
            websitePages.reduce((acc, item) => {
                acc[item.slug] = {
                    title: item.title,
                    summary: item.description,
                    content: '',
                };
                return acc;
            }, {}),
        []
    );

    const [pagesContent, setPagesContent] = useState(fallbackContent);
    const [saved, setSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const stored = loadStoredContent();
        setPagesContent((prev) => {
            const next = { ...prev };
            websitePages.forEach((item) => {
                next[item.slug] = {
                    ...prev[item.slug],
                    ...(stored[item.slug] || {}),
                };
            });
            return next;
        });
        // Reset editing state on page change
        setIsEditing(false);
    }, [fallbackContent, slug]);

    if (!page) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const currentPage = pagesContent[slug] || fallbackContent[slug];

    const updateField = (field, value) => {
        setPagesContent((prev) => ({
            ...prev,
            [slug]: {
                ...prev[slug],
                [field]: value,
            },
        }));
        setSaved(false);
    };

    const handleAction = () => {
        if (!isEditing) {
            setIsEditing(true);
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(pagesContent));
            setSaved(true);
            setIsEditing(false);
            window.setTimeout(() => setSaved(false), 2500);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col gap-4 border-b border-zinc-100 pb-5 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h1 className="text-2xl font-medium tracking-tight text-zinc-900">{page.title}</h1>
                        <p className="mt-1 text-sm text-zinc-500">
                            {isEditing ? 'Currently editing page content.' : 'View or edit the content for this page.'}
                        </p>
                    </div>

                    <button
                        onClick={handleAction}
                        className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white transition-all shadow-sm ${
                            saved 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : isEditing 
                                ? 'bg-violet-600 hover:bg-violet-700' 
                                : 'bg-zinc-900 hover:bg-black'
                        }`}
                    >
                        {saved ? (
                            <>
                                <Check className="h-4 w-4" />
                                Saved
                            </>
                        ) : isEditing ? (
                            <>
                                <Save className="h-4 w-4" />
                                Save Content
                            </>
                        ) : (
                            <>
                                <Edit3 className="h-4 w-4" />
                                Edit Content
                            </>
                        )}
                    </button>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                            Page Title
                        </label>
                        <input
                            type="text"
                            value={currentPage.title}
                            readOnly={!isEditing}
                            onChange={(e) => updateField('title', e.target.value)}
                            className={`w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition-all ${
                                isEditing 
                                ? 'focus:border-violet-500 focus:ring-1 focus:ring-violet-500' 
                                : 'bg-zinc-50 cursor-default border-transparent'
                            }`}
                            placeholder="Enter page title"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                            Short Description
                        </label>
                        <input
                            type="text"
                            value={currentPage.summary}
                            readOnly={!isEditing}
                            onChange={(e) => updateField('summary', e.target.value)}
                            className={`w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition-all ${
                                isEditing 
                                ? 'focus:border-violet-500 focus:ring-1 focus:ring-violet-500' 
                                : 'bg-zinc-50 cursor-default border-transparent'
                            }`}
                            placeholder="Enter short description"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                            Page Content
                        </label>
                        <textarea
                            rows={16}
                            value={currentPage.content}
                            readOnly={!isEditing}
                            onChange={(e) => updateField('content', e.target.value)}
                            className={`w-full rounded-[24px] border border-zinc-300 bg-white px-4 py-4 text-sm leading-6 text-zinc-900 outline-none transition-all ${
                                isEditing 
                                ? 'focus:border-violet-500 focus:ring-1 focus:ring-violet-500' 
                                : 'bg-zinc-50 cursor-default border-transparent'
                            }`}
                            placeholder={`Add content for ${page.title}`}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebsitePageEditorPage;
