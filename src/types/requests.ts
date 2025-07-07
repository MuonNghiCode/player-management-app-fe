// Auth requests
export interface LoginRequest {
    membername: string;
    password: string;
}

export interface RegisterRequest {
    membername: string;
    password: string;
    name: string;
    YOB: number;
}

// Player requests
export interface CreatePlayerRequest {
    playerName: string;
    image: string;
    cost: number;
    isCaptain: boolean;
    information: string;
    team: string;
}

export interface UpdatePlayerRequest extends Partial<CreatePlayerRequest> {}

// Team requests
export interface CreateTeamRequest {
    teamName: string;
}

export interface UpdateTeamRequest extends Partial<CreateTeamRequest> {}

// Comment requests
export interface CreateCommentRequest {
    rating: number;
    content: string;   
}

export interface UpdateCommentRequest extends Partial<CreateCommentRequest> {}

// Profile requests
export interface UpdateProfileRequest {
    name?: string;
    YOB?: number;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

// Query parameters
export interface PlayerQueryParams {
    search?: string;
    team?: string;
    captain?: boolean;
    sort?: "name" | "cost" | "newest" | "oldest";
    page?: number;
    limit?: number;
}

export interface MemberQueryParams {
    search?: string;
    role?: "admin" | "member";
    sort?: "name" | "username" | "age_asc" | "age_desc" | "newest" | "oldest";
    page?: number;
    limit?: number;
}
