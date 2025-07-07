import { API_ENDPOINTS } from "../constants";
import type { CreateTeamRequest, ResponseModel, TeamsResponse, UpdateTeamRequest } from "../types";
import BaseApiService from "./base";

class TeamService extends BaseApiService {
    async getAll(params?: { search?: string }): Promise<TeamsResponse> {
        const url = params?.search 
            ? `${API_ENDPOINTS.TEAMS.BASE}?search=${encodeURIComponent(params.search)}`
            : API_ENDPOINTS.TEAMS.BASE;
        return this.get<TeamsResponse['data']>(url);
    }

    async getById(id: string): Promise<TeamsResponse> {
        return this.get<TeamsResponse['data']>(API_ENDPOINTS.TEAMS.BY_ID(id));
    }

    async create(data: CreateTeamRequest): Promise<TeamsResponse> {
        return this.post<TeamsResponse['data']>(API_ENDPOINTS.TEAMS.BASE, data);
    }

    async update(id: string, data: UpdateTeamRequest): Promise<TeamsResponse> {
        return this.put<TeamsResponse['data']>(API_ENDPOINTS.TEAMS.BY_ID(id), data);
    }

    async deleteById(id: string): Promise<ResponseModel<null>> {
        return this.delete<null>(API_ENDPOINTS.TEAMS.BY_ID(id));
    }
}

export const teamService = new TeamService();