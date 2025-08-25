import { useMutation } from "@tanstack/react-query";
import { LoginDto } from "~/dto/auth/login.dto";
import { rootApiService } from "~/services";
import { endpoints } from "~/services/endpoints";
import { useAuthStore } from "~/store/authStore";

export interface AuthResponse {
    status: boolean
    message: string
    data: Data
}

export interface Data {
    accessToken: string
    refreshToken: string
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
                accessToken: res?.data?.accessToken,
                refreshToken: res?.data?.refreshToken || "",
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