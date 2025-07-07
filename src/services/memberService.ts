import BaseApiService from './base';
import type { 
  MembersResponse,
  MemberQueryParams,
  UpdateProfileRequest,
  ChangePasswordRequest,
  ResponseModel,
  Member,
  Comment
} from '../types';
import { API_ENDPOINTS } from '../constants';

class MemberService extends BaseApiService {
  async getAll(params?: MemberQueryParams): Promise<MembersResponse> {
    return this.get<MembersResponse['data']>(API_ENDPOINTS.ACCOUNTS.BASE, params);
  }

  async getById(id: string): Promise<ResponseModel<Member>> {
    return this.get<Member>(API_ENDPOINTS.ACCOUNTS.BY_ID(id));
  }

  async updateProfile(id: string, data: UpdateProfileRequest): Promise<ResponseModel<Member>> {
    return this.put<Member>(API_ENDPOINTS.ACCOUNTS.BY_ID(id), data);
  }

  async changePassword(id: string, data: ChangePasswordRequest): Promise<ResponseModel<null>> {
    return this.put<null>(API_ENDPOINTS.ACCOUNTS.PASSWORD(id), data);
  }

  // Get user's own comments
  async getMyComments(): Promise<ResponseModel<{ comments: Comment[] }>> {
    return this.get<{ comments: Comment[] }>(API_ENDPOINTS.ACCOUNTS.MY_COMMENTS);
  }

  // Comment methods
  async getCommentsByPlayer(playerId: string): Promise<ResponseModel<{ comments: Comment[] }>> {
    return this.get<{ comments: Comment[] }>(API_ENDPOINTS.PLAYERS.COMMENTS(playerId));
  }

  async addComment(playerId: string, data: { content: string; rating: number }): Promise<ResponseModel<Comment>> {
    return this.post<Comment>(API_ENDPOINTS.PLAYERS.COMMENTS(playerId), data);
  }

  async updateComment(playerId: string, commentId: string, data: { content: string; rating: number }): Promise<ResponseModel<Comment>> {
    return this.put<Comment>(API_ENDPOINTS.PLAYERS.COMMENT_BY_ID(playerId, commentId), data);
  }

  async deleteComment(playerId: string, commentId: string): Promise<ResponseModel<null>> {
    return this.delete<null>(API_ENDPOINTS.PLAYERS.COMMENT_BY_ID(playerId, commentId));
  }
}

export const memberService = new MemberService();