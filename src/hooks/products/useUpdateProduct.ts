import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rootApiService, toastService } from "~/services/@common";
import { endpoints } from "~/services/endpoints";
import { CreateProductBody } from "./useCreateProduct";


export const useUpdateProduct = (id: string) => {
    const queryClient = useQueryClient();
    const url = endpoints.product_update(id);

    const { mutate: onUpdateProduct, isPending, isError, isSuccess } = useMutation({
        mutationFn: (data: CreateProductBody) => {
            return rootApiService.patch(url, data);
        },
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({
                queryKey: [endpoints.pagination],
            });
            toastService.success(res.message);
        },
        onError: (error: any) => {
            toastService.error(error?.message);
        },
    });

    return { onUpdateProduct, isLoading: isPending, isError, isSuccess };
};
