import Cookies from "js-cookie";

export class AuthService {
    isAuthenticated(): boolean {
        const accessToken = Cookies.get("accessToken");
        return !!accessToken;
    }

    getAccessToken(): string | null {
        return Cookies.get("accessToken");
    }
}

export const authService = new AuthService();
