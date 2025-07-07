export * from './api';
export { default as DEBOUNCE_DELAYS } from './debounce';

// App constants
export const APP_CONFIG = {
    NAME: 'Football Manager',
    VERSION: '1.0.0',
    DESCRIPTION: 'Football Player Management System',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    THEME: 'theme',
    LANGUAGE: 'language',
} as const;

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 12,
    MAX_LIMIT: 100,
} as const;

// Validation
export const VALIDATION = {
    MIN_PASSWORD_LENGTH: 6,
    MAX_PASSWORD_LENGTH: 50,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MIN_RATING: 1,
    MAX_RATING: 3,
} as const;

// Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    PLAYERS: '/players',
    PLAYER_DETAIL: (id: string) => `/players/${id}`,
    TEAMS: '/teams',
    TEAM_DETAIL: (id: string) => `/teams/${id}`,
    ADMIN: {
        DASHBOARD: '/admin',
        PLAYERS: '/admin/players',
        TEAMS: '/admin/teams',
        MEMBERS: '/admin/accounts',
    },
} as const;