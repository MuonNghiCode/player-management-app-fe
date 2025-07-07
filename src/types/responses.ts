

import type { Player, Team, Member, Comment } from './entities';

// Base response
export interface ResponseModel<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface ErrorResponseModel {
    success: false;
    message: string;
    error?: string;
}

export interface SuccessResponseModel<T> {
    success: true;
    message: string;
    data: T;
}

export interface ListResponseData<T> {
    items: T[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    stats?: any;
}

// Auth response
export interface LoginResponseData {
    token: string;
    user: {
        _id: string;
        membername: string;
        name: string;
        YOB: number;
        isAdmin: boolean;
    }
}

export interface ProfileResponseData {
    user: {
        _id: string;
        membername: string;
        name: string;
        YOB: number;
        isAdmin: boolean;
    }
}

export interface RegisterResponseData {
    newMember: {
        _id: string;
        membername: string;
        name: string;
        YOB: number;
        isAdmin: boolean;
    }
}

// Player response
export interface PlayersResponseData {
    players: Player[];
    stats?: {
        totalPlayers:number;
        totalCaptains: number;
        totalCost: number;
        avgCost: number;
    }
    pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    };
}

export interface PlayerResponseData {
    player: Player;
}

// Team response
export interface TeamResponseData {
    teams: Team[];
}

export interface TeamResponseData {
    team: Team;
}

// Member response
export interface MembersResponseData {
    members: Member[];
    stats?: {
        totalMembers: number;
        adminCount: number;
        memberCount: number;
        recentMembers: number;
    }
}

// Comment response
export interface CommentResponseData {
    comment: Comment
}

export type LoginResponse = ResponseModel<LoginResponseData>;
export type ProfileResponse = ResponseModel<ProfileResponseData>;
export type RegisterResponse = ResponseModel<RegisterResponseData>;
export type PlayersResponse = ResponseModel<PlayersResponseData>;
export type PlayerResponse = ResponseModel<PlayerResponseData>;
export type TeamsResponse = ResponseModel<TeamResponseData>;
export type TeamResponse = ResponseModel<TeamResponseData>;
export type MembersResponse = ResponseModel<MembersResponseData>;
export type CommentResponse = ResponseModel<CommentResponseData>;
export type BaseResponse = ResponseModel<null>;