const FALLBACK_API_URL = 'http://localhost:5000/api';

const normalizeBaseUrl = (value) => value.replace(/\/+$/, '');

export const API_BASE_URL = normalizeBaseUrl(
    import.meta.env.VITE_API_URL?.trim() || FALLBACK_API_URL
);

export const buildApiUrl = (path = '') => {
    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    const normalizedPath = String(path).replace(/^\/+/, '');
    return normalizedPath ? `${API_BASE_URL}/${normalizedPath}` : API_BASE_URL;
};

export const apiFetch = async (path, options = {}) => {
    const { headers, body, ...restOptions } = options;
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

    return fetch(buildApiUrl(path), {
        ...restOptions,
        body,
        headers: {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            ...headers,
        },
    });
};
