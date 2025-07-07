// Base URL
export const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        SIGNIN: '/auth/signin',
        SIGNUP: '/auth/signup',
        PROFILE: '/auth/profile',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
    },

    // Player endpoints
    PLAYERS: {
        BASE: '/players',
        BY_ID: (id: string) => `/players/${id}`,
        COMMENTS: (playerId: string) => `/players/${playerId}/comments`,
        COMMENT_BY_ID: (playerId: string, commentId: string) => 
            `/players/${playerId}/comments/${commentId}`,
    },

    // Team endpoints
    TEAMS: {
        BASE: '/teams',
        BY_ID: (id: string) => `/teams/${id}`,
    },

    // Member/Account endpoints
    ACCOUNTS: {
        BASE: '/accounts',
        BY_ID: (id: string) => `/accounts/${id}`,
        PASSWORD: (id: string) => `/accounts/${id}/password`,
        MY_COMMENTS: '/auth/my-comments',
    },
} as const;

// HTTP Methods
export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
} as const;

// Response Status
export const API_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    LOADING: 'loading',
} as const;

// Common Headers
export const API_HEADERS = {
    CONTENT_TYPE: 'Content-Type',
    AUTHORIZATION: 'Authorization',
    ACCEPT: 'Accept',
} as const;

// Error Messages
export const API_ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error occurred',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Internal server error',
    VALIDATION_ERROR: 'Validation error',
} as const;

