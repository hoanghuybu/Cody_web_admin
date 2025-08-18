import { useMutation } from "@tanstack/react-query";
import { LoginDto } from "~/dto/auth/login.dto";
import { rootApiService } from "~/services";
import { endpoints } from "~/services/endpoints";
import { useAuthStore } from "~/store/authStore";


const useLogin = () => {
    const { login } = useAuthStore();
    const { isPending, isError, data, error, mutate } = useMutation({
        mutationFn: (variables: LoginDto) => {
            return rootApiService.post(endpoints.login, variables)
        },
        onSuccess: (res: any) => {
            login({
                user: res?.user,
                accessToken: res?.accessToken || "",
                refreshToken: res?.refreshToken || "",
            })
        }
    })
    return {
        isLoading: isPending,
        isError,
        data,
        error,
        onLogin: mutate,
    }
}

export default useLogin