export interface Player {
    _id: string;
    playerName: string;
    image: string;
    cost: number;
    isCaptain: boolean;
    information: string;
    team: Team;
    comments: Comment[];
    avgRating?: number;
    commentCount?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface Team {
    _id: string;
    teamName: string;
    playerCount?: number;
    captainCount?: number;
    totalCost?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface Comment {
    _id: string;
    rating: number;
    content: string;
    author:Member;
    createdAt: string;
    updatedAt?: string;
}
export interface Member {
    _id: string;
    membername: string;
    name: string;
    YOB: number;
    isAdmin: boolean;
    age?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthUser {
    _id: string;
    membername: string;
    name: string;
    YOB: number;
    isAdmin: boolean;
}