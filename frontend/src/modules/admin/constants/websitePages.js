export const websitePageSections = [
    {
        title: 'Legal',
        items: [
            {
                slug: 'privacy-policy',
                title: 'Privacy Policy',
                description: 'Explain how user data is collected, stored, and used.',
            },
            {
                slug: 'terms-of-service',
                title: 'Terms of Services',
                description: 'Set rules, responsibilities, and platform usage terms.',
            },
            {
                slug: 'privacy-preferences',
                title: 'Privacy Preferences',
                description: 'Describe how users can manage privacy and visibility controls.',
            },
        ],
    },
    {
        title: 'Community',
        items: [
            {
                slug: 'safe-dating-tips',
                title: 'Safe Dating Tips',
                description: 'Share helpful guidance for safer conversations and meetups.',
            },
            {
                slug: 'member-principles',
                title: 'Member Principles',
                description: 'Define community expectations and respectful conduct.',
            },
        ],
    },
];

export const websitePages = websitePageSections.flatMap((section) =>
    section.items.map((item) => ({
        ...item,
        section: section.title,
    }))
);

export const websitePagesBySlug = Object.fromEntries(
    websitePages.map((page) => [page.slug, page])
);

