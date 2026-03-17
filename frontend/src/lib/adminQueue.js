export const ADMIN_QUEUE_SETTINGS_KEY = 'amora_admin_queue_settings';

export const defaultAdminQueueSettings = {
    allowNewSignups: true,
    holdLikesQueue: false,
};

export const loadAdminQueueSettings = () => {
    const savedSettings = localStorage.getItem(ADMIN_QUEUE_SETTINGS_KEY);

    if (!savedSettings) {
        return defaultAdminQueueSettings;
    }

    try {
        return {
            ...defaultAdminQueueSettings,
            ...JSON.parse(savedSettings),
        };
    } catch {
        return defaultAdminQueueSettings;
    }
};

export const saveAdminQueueSettings = (settings) => {
    localStorage.setItem(
        ADMIN_QUEUE_SETTINGS_KEY,
        JSON.stringify({
            ...defaultAdminQueueSettings,
            ...settings,
        })
    );
};
