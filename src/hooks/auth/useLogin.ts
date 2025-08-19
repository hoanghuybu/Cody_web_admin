import { useMutation } from "@tanstack/react-query";
import { LoginDto } from "~/dto/auth/login.dto";
import { rootApiService } from "~/services";
import { endpoints } from "~/services/endpoints";
import { useAuthStore } from "~/store/authStore";

export interface AuthResponse {
    success: boolean
    message: string
    data: Data
}

export interface Data {
    token: string
    user: User
}
export interface User {
    id: number
    email: string
}


const useLogin = () => {
    const { login } = useAuthStore();
    const { isPending, isError, data, error, mutateAsync } = useMutation({
        mutationFn: (variables: LoginDto) => {
            return rootApiService.post<AuthResponse>(endpoints.login, variables)
        },
        onSuccess: (res: AuthResponse) => {
            login({
                user: res?.data?.user,
                accessToken: res?.data?.token || "",
                refreshToken: res?.data?.token || "",
            })

        }
    })
    return {
        isLoading: isPending,
        isError,
        data,
        error,
        onLogin: mutateAsync,
    }
}

export default useLogin