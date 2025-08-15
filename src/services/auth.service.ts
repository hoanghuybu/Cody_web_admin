import { ApiException } from "~/@core/dto";
import { LoginDto, UserSessionDto } from "~/dto/auth/login.dto";
import { rootApiService } from "./@common";

const Endpoint = {
    login: "/api/auth/login".trim(),
} as const;

export class AuthService {
    async login(body: LoginDto): Promise<UserSessionDto> {
        try {
            const userSession = await rootApiService.post<UserSessionDto>(
                Endpoint.login,
                body
            );

            return userSession;
        } catch (error) {
            if (error instanceof ApiException) {
                throw error;
            }

            throw new ApiException("Đăng nhập thất bại", 400);
        }
    }

    isAuthenticated(): boolean {
        const accessToken = localStorage.getItem("accessToken");
        return !!accessToken;
    }

    getAccessToken(): string | null {
        return localStorage.getItem("accessToken");
    }
}

export const authService = new AuthService();
