import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText, Globe } from 'lucide-react';
import { websitePageSections } from '../constants/websitePages';

const WebsitePagesPage = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight text-zinc-900">Website Pages</h1>
                    <p className="mt-1 text-sm text-zinc-500">
                        Manage the static pages shown across the app. Frontend only for now.
                    </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-medium text-violet-700">
                    <Globe className="h-4 w-4" />
                    Content is saved locally in this browser
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center gap-3 border-b border-zinc-100 pb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50">
                            <FileText className="h-5 w-5 text-zinc-700" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-zinc-900">Page Directory</h2>
                            <p className="text-xs text-zinc-500">Open any page to add or edit its content.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {websitePageSections.map((section) => (
                            <div key={section.title}>
                                <h3 className="mb-3 text-sm font-semibold text-zinc-500">{section.title}</h3>
                                <div className="space-y-3">
                                    {section.items.map((page) => (
                                        <Link
                                            key={page.slug}
                                            to={`/admin/website-pages/${page.slug}`}
                                            className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 transition-all hover:border-zinc-300 hover:bg-white hover:shadow-sm"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-zinc-900">{page.title}</p>
                                                <p className="mt-1 text-xs text-zinc-500">{page.description}</p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-zinc-500" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <aside className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <h2 className="text-base font-semibold text-zinc-900">How This Works</h2>
                    <div className="mt-4 space-y-4 text-sm text-zinc-600">
                        <p>Use the page list to open a content editor for each website page.</p>
                        <p>Add a heading, short description, and full content in the text area.</p>
                        <p>Everything is frontend only and saved in localStorage. No backend changes are made.</p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default WebsitePagesPage;

