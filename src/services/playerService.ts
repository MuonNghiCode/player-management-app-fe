import { API_ENDPOINTS } from "../constants";
import type { CommentResponse, CreateCommentRequest, CreatePlayerRequest, UpdatePlayerRequest, PlayerQueryParams, PlayersResponse, PlayerResponse, ResponseModel } from "../types";
import BaseApiService from "./base";

class PlayerService extends BaseApiService {
    async getAll(params?: PlayerQueryParams): Promise<PlayersResponse> {
        return this.get<PlayersResponse['data']>(API_ENDPOINTS.PLAYERS.BASE, params);
    }
    
    async getById(id: string): Promise<PlayerResponse> {
        return this.get<PlayerResponse['data']>(API_ENDPOINTS.PLAYERS.BY_ID(id));
    }

    async create(data: CreatePlayerRequest): Promise<PlayerResponse> {
        return this.post<PlayerResponse['data']>(API_ENDPOINTS.PLAYERS.BASE, data);
    }

    async update(id: string, data: UpdatePlayerRequest): Promise<PlayerResponse> {
        return this.put<PlayerResponse['data']>(API_ENDPOINTS.PLAYERS.BY_ID(id), data);
    }

    async deleteById(id: string): Promise<ResponseModel<null>> {
        return this.delete<null>(API_ENDPOINTS.PLAYERS.BY_ID(id));
    }
    
    async getComments(playerId: string): Promise<CommentResponse> {
        return this.get<CommentResponse['data']>(API_ENDPOINTS.PLAYERS.COMMENTS(playerId));
    }

    async addComment(playerId: string, data: CreateCommentRequest): Promise<CommentResponse> {
        return this.post<CommentResponse['data']>(API_ENDPOINTS.PLAYERS.COMMENTS(playerId), data);
    }

    async updateComment(playerId: string, commentId: string, data: CreateCommentRequest): Promise<CommentResponse>{
        return this.put<CommentResponse['data']>(API_ENDPOINTS.PLAYERS.COMMENT_BY_ID(playerId, commentId), data);
    }

    async deleteComment(playerId: string, commentId: string): Promise<ResponseModel<null>> {
        return this.delete<null>(API_ENDPOINTS.PLAYERS.COMMENT_BY_ID(playerId, commentId));
    }
}

export const playerService = new PlayerService();